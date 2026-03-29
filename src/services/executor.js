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
    return [await runSingle(code, langConfig.compiler)];
  }

  // Run multiple testcases concurrently
  const promises = testcases.map(async (tc, index) => {
    let testCode = code;
    
    // Inject testcase inputs into code via RegEx
    // tc.input usually looks like: "arr = {10, 20}, n = 5" or "str = \"hello\""
    const variables = tc.input.split(/,(?![^{]*\})/).map(s => s.trim());
    
    for (const v of variables) {
      // Split "name = value"
      const eqIdx = v.indexOf('=');
      if (eqIdx === -1) continue;
      
      const varName = v.slice(0, eqIdx).trim();
      const varval = v.slice(eqIdx + 1).trim();
      
      // Escape special regex characters in variable name
      const escapedVarName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Replace variable assignment in code (Java/C++ arrays, strings, basic primitives)
      // e.g., int[] arr = {1, 2, 3}; -> int[] arr = {10, 20};
      // e.g., String str = "hi"; -> String str = "hello";
      
      let regexStr;
      if (language === 'python') {
         // Match: varName = anything_until_newline
         regexStr = `(\\b${escapedVarName}\\s*)=[^\\n]*`;
      } else {
         // Java/JS/C++ handle semicolon ends. Match: varName (with optional type/brackets) = anything_until_semicolon ;
         regexStr = `(\\b${escapedVarName}\\s*(?:\\[\\])?\\s*)=[^;]*;`;
      }
      
      const regex = new RegExp(regexStr, 'g');
      if (language === 'python') {
         testCode = testCode.replace(regex, `$1= ${varval}`);
      } else {
         testCode = testCode.replace(regex, `$1= ${varval};`);
      }
    }

    const { output, error } = await runSingle(testCode, langConfig.compiler);
    return {
      index,
      input: tc.input,
      expected: tc.expected,
      output: (output || '').trim(),
      error
    };
  });

  return await Promise.all(promises);
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
