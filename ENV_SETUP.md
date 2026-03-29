# Environment Setup Guide

## API Keys Setup

This project uses **Groq** and **Gemini** for AI-powered coding assistance. Follow these steps to configure your API keys.

### 1. Get Your API Keys

#### Groq API Key:

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up/login
3. Create an API key
4. Copy the key

#### Gemini API Key:

1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Select a project (or create new)
4. Copy the key

### 2. Configure .env File

Create/update the `.env` file in the root directory with your API keys:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ **Important**: Never commit `.env` to git. It's already in `.gitignore`.

### 3. Using in Development

The API keys will be automatically loaded when:

- You run `npm run dev`
- Or when calling `askAI()` in the code

```javascript
import { askAI } from "./services/ai.js";

// Keys are automatically loaded from .env
const response = await askAI(
  "How do I solve this problem?",
  "groq", // or "gemini"
  null, // groqKey (null = use from .env)
  null, // geminiKey (null = use from .env)
  currentProblem,
);
```

### 4. For Production Deployment

If deploying to production:

- Set environment variables in your hosting platform (Vercel, Netlify, etc.)
- Use the same `VITE_GROQ_API_KEY` and `VITE_GEMINI_API_KEY` names
- Never hardcode keys in the source code

### 5. Verify Setup

To test if keys are loaded correctly:

```javascript
console.log("Groq Key:", import.meta.env.VITE_GROQ_API_KEY);
console.log("Gemini Key:", import.meta.env.VITE_GEMINI_API_KEY);
```

---

## Support

- Groq Docs: https://console.groq.com/docs
- Gemini Docs: https://ai.google.dev/
