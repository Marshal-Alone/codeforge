// ============================================
// Code Execution Service — Wandbox API
// ============================================

const WANDBOX_API = 'https://wandbox.org/api/compile.json';

const LANGUAGE_MAP = {
  'java': { compiler: 'openjdk-jdk-22+36' },
  'python': { compiler: 'cpython-head' },
  'javascript': { compiler: 'nodejs-20.17.0' },
  'c++': { compiler: 'gcc-head' },
};

export async function executeCode(code, language, testcases = []) {
  const langConfig = LANGUAGE_MAP[language];
  if (!langConfig) {
    return [{ error: `Unsupported language: ${language}` }];
  }

  // Pre-process master code
  if (language === 'java') {
    code = code.replace(/public\s+class\s+Main\b/, 'class Main');
    code = code.replace(/public\s+class\s+Solution\b/, 'class Solution');
  }

  if (!testcases || testcases.length === 0) {
    return [await runSingleWithTimeout(code, langConfig.compiler)];
  }

  // Run testcases sequentially to avoid API overload
  const results = [];
  for (let index = 0; index < testcases.length; index++) {
    const tc = testcases[index];
    let testCode = code;
    
    // Inject testcase inputs into code via RegEx
    const variables = tc.input.split(/,(?![^{]*\})/).map(s => s.trim());
    
    for (const v of variables) {
      const eqIdx = v.indexOf('=');
      if (eqIdx === -1) continue;
      
      const varName = v.slice(0, eqIdx).trim();
      const varval = v.slice(eqIdx + 1).trim();
      const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      let regexStr;
      if (language === 'python') {
         regexStr = `(\\b${escapedVarName}\\s*)=[^\\n]*`;
      } else {
         regexStr = `(\\b${escapedVarName}\\s*(?:\\[\\])?\\s*)=[^;]*;`;
      }
      
      const regex = new RegExp(regexStr, 'g');
      if (language === 'python') {
         testCode = testCode.replace(regex, `$1= ${varval}`);
      } else {
         testCode = testCode.replace(regex, `$1= ${varval};`);
      }
    }

    // Run with timeout and retry on failure
    let result = await runWithRetry(testCode, langConfig.compiler, 2);
    results.push({
      index,
      input: tc.input,
      expected: tc.expected,
      output: (result.output || '').trim(),
      error: result.error
    });
  }

  return results;
}

async function runWithRetry(code, compiler, maxRetries = 2) {
  let lastError = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await runSingleWithTimeout(code, compiler);
      if (!result.error) {
        return result; // Success, no error
      }
      lastError = result.error;
    } catch (error) {
      lastError = error.message;
    }
  }
  
  return { output: '', error: lastError };
}

async function runSingle(code, compiler) {
  const payload = { compiler, code, save: false };
  try {
    const response = await fetch(WANDBOX_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return { error: `Execution failed: API returned ${response.status}\nThe server is currently unavailable.` };

    const data = await response.json();
    if (data.compiler_error && data.compiler_error.trim().length > 0) {
      return { error: `Compilation Error:\n${data.compiler_error}` };
    }
    if (data.status !== "0" && data.program_error) {
       return { error: `Runtime Error:\n${data.program_error}`, output: data.program_message || '' };
    }
    return {
      output: data.program_message || 'Completed (No output)',
      error: data.program_error ? `\nStderr:\n${data.program_error}` : null
    };
  } catch (error) {
    return { error: `Network error: ${error.message}` };
  }
}

async function runSingleWithTimeout(code, compiler, timeoutMs = 30000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Execution timeout: exceeded ${timeoutMs}ms limit`)), timeoutMs)
  );

  try {
    return await Promise.race([runSingle(code, compiler), timeoutPromise]);
  } catch (error) {
    return { error: error.message };
  }
}
