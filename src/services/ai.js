// ============================================
// AI Service — Groq + Gemini Integration
// ============================================

const GROQ_API = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are CodeForge AI, a coding tutor for TCS NQT preparation.

## CRITICAL RULES — FOLLOW STRICTLY:
1. **NEVER give the complete solution code** unless the user explicitly says "give me the full solution" or "show me the answer".
2. Instead, **guide the student** step by step:
   - Explain the concept/approach in plain words
   - Give pseudocode or partial logic, NOT full working code
   - Suggest which data structure or algorithm to use
   - Point out edge cases to consider
3. Keep responses **SHORT and focused** — max 150 words for hints, max 250 words for explanations.
4. Use bullet points and numbered steps for clarity.
5. When asked to debug, point out the specific bug and explain WHY it's wrong — don't rewrite the entire code.
6. For "Explain Problem" requests: clarify WHAT the problem asks, give a real-world analogy if possible, and list the key steps — no code.
7. For "Give Hint" requests: give ONE small directional hint, not the whole approach.
8. For "Solution Approach" requests: give the algorithm steps in plain English or pseudocode only.

## Formatting:
- Use **bold** for key terms
- Use numbered lists for steps
- Use \`inline code\` for variable names or small snippets only
- Keep code snippets to max 3-4 lines if absolutely needed`;

export async function askAI(prompt, provider, groqKey, geminiKey, currentProblem) {
  const context = currentProblem
    ? `\n\n[Context — Problem: "${currentProblem.title}", Category: ${currentProblem.category}, Difficulty: ${currentProblem.difficulty}]`
    : '';

  const fullPrompt = prompt + context;

  if (provider === 'groq') {
    return await callGroq(fullPrompt, groqKey);
  } else {
    return await callGemini(fullPrompt, geminiKey);
  }
}

async function callGroq(prompt, apiKey) {
  if (!apiKey) {
    throw new Error('Groq API key not set. Please add it in Settings.');
  }

  const response = await fetch(GROQ_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response received.';
}

async function callGemini(prompt, apiKey) {
  if (!apiKey) {
    throw new Error('Gemini API key not set. Please add it in Settings.');
  }

  const response = await fetch(`${GEMINI_API}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || 'No response received.';
}
