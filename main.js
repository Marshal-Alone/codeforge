// ============================================
// CodeForge — TCS NQT Practice Platform
// Main Application Entry Point
// ============================================

import { problems, categories } from './src/data/problems.js';
import { executeCode } from './src/services/executor.js';
import { askAI } from './src/services/ai.js';

// ============================================
// State Management
// ============================================
const state = {
  currentPage: 'home',
  currentProblem: null,
  filter: 'all',
  searchQuery: '',
  editor: null,
  solutionEditor: null,
  aiProvider: 'groq',
  aiMessages: [],
  solvedProblems: JSON.parse(localStorage.getItem('cf_solved') || '[]'),
  lastTestResults: null,
  allTestsPassed: false,
};

function saveSolved() {
  localStorage.setItem('cf_solved', JSON.stringify(state.solvedProblems));
}

function loadSubmissions() {
  return JSON.parse(localStorage.getItem('cf_answered') || '{}');
}

function getProblemTitle(p) {
  if (!p) return '';
  const baseTitle = p.title.replace(/^Q\d+:\s*/i, '');
  return p.id ? `Q${p.id}: ${baseTitle}` : baseTitle;
}

// ============================================
// Navigation Helpers
// ============================================
function getAdjacentProblems() {
  const currentId = state.currentProblem?.id;
  if (!currentId) return { prev: null, next: null };

  const currentIndex = problems.findIndex(p => p.id === currentId);
  return {
    prev: currentIndex > 0 ? problems[currentIndex - 1] : null,
    next: currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null
  };
}

function nextProblem() {
  const { next } = getAdjacentProblems();
  if (next) {
    navigate(`/workspace/${next.id}`);
  }
}

function prevProblem() {
  const { prev } = getAdjacentProblems();
  if (prev) {
    navigate(`/workspace/${prev.id}`);
  }
}

function submitCode() {
  if (!state.allTestsPassed) {
    showToast('❌ All test cases must pass before submitting!');
    return;
  }

  const p = state.currentProblem;
  if (!p) return;

  let code;
  let language = 'theory';
  let testResults = state.lastTestResults;

  if (p.type === 'coding') {
    if (!state.editor) return;
    code = state.editor.getValue();
    language = document.getElementById('lang-select')?.value || 'java';
  } else {
    const answerEl = document.getElementById('theory-answer');
    if (!answerEl) {
      showToast('❌ Answer box missing.');
      return;
    }
    code = answerEl.value.trim();
    if (!code) {
      showToast('❌ Please write your answer before submitting.');
      return;
    }
    testResults = testResults || [];
    state.lastTestResults = testResults;
  }

  const answer = {
    problemId: p.id,
    problemTitle: p.title,
    code: code,
    language: language,
    submittedAt: new Date().toISOString(),
    testResults: testResults
  };

  // Store in localStorage under answeredProblems
  const answered = JSON.parse(localStorage.getItem('cf_answered') || '{}');
  answered[p.id] = answer;
  localStorage.setItem('cf_answered', JSON.stringify(answered));

  // Show confirmation
  showToast('✅ Answer submitted successfully!');
}

// ============================================
// Router
// ============================================
function getRoute() {
  const hash = window.location.hash || '#/';
  return hash.slice(1);
}

function navigate(path) {
  window.location.hash = path;
}

function formatAIResponse(rawText) {
  let html;
  const parser = (typeof window !== 'undefined' && window.marked) ? window.marked : (typeof marked !== 'undefined' ? marked : null);

  if (parser && typeof parser.parse === 'function') {
    html = parser.parse(rawText);
  } else {
    // Basic markdown fallback
    html = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>');

    html = `<p>${html}</p>`;
  }

  return html;
}

function router() {
  const route = getRoute();
  const content = document.getElementById('page-content');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + route ||
      (route.startsWith('/workspace') && link.dataset.page === 'problems') ||
      (route === '/' && link.dataset.page === 'home'));
  });

  if (route === '/' || route === '') {
    state.currentPage = 'home';
    renderHome(content);
  } else if (route === '/problems') {
    state.currentPage = 'problems';
    renderProblems(content);
  } else if (route === '/submissions') {
    state.currentPage = 'submissions';
    renderSubmissions(content);
  } else if (route.startsWith('/workspace/')) {
    state.currentPage = 'workspace';
    const problemId = parseInt(route.split('/')[2]);
    if (state.solutionEditor) {
        state.solutionEditor.dispose();
        state.solutionEditor = null;
    }
    state.currentProblem = problems.find(p => p.id === problemId);
    renderWorkspace(content);
  } else if (route === '/settings') {
    state.currentPage = 'settings';
    renderSettings(content);
  } else {
    state.currentPage = 'home';
    renderHome(content);
  }
}

// ============================================
// normalization & comparison Utilities
// ============================================

function normalizeTestCases(testcases) {
  if (!Array.isArray(testcases)) return [];
  return testcases.map(tc => ({
    input: (tc.input || '').toString().trim(),
    expected: (tc.output || tc.expected || '').toString().trim()
  }));
}

function normalizeResults(results) {
  return results.map(r => ({
    ...r,
    output: (r.output || '').trim(),
    expected: (r.expected || '').trim(),
    passed: r.error ? false : compareOutput(r.output, r.expected)
  }));
}

function compareOutput(output, expected) {
  if (output === undefined || expected === undefined) return false;
  
  const norm = str => str.toLowerCase().replace(/\s+/g, ' ').trim();
  const a = norm(output);
  const e = norm(expected);
  
  // Exact match
  if (a === e) return true;
  
  // Suffix match: output ends with expected value
  // e.g., "second largest: 34" ends with "34"
  if (a.endsWith(e)) return true;
  
  // Suffix match with word boundary: last token matches expected
  // e.g., "result: 34" -> splits to ["result:", "34"], last = "34"
  const aSegments = a.split(/[\s:,;\-]+/).filter(s => s.length > 0);
  if (aSegments.length > 1) {
    const lastToken = aSegments[aSegments.length - 1];
    if (lastToken === e) return true;
  }

  return false;
}

window.addEventListener('hashchange', router);

// ============================================
// Render Home Page
// ============================================
function renderHome(container) {
  const totalProblems = problems.length;
  const solved = state.solvedProblems.length;
  const streak = parseInt(localStorage.getItem('cf_streak') || '0');

  container.innerHTML = `
    <div class="home-page fade-in">
      <div class="hero">
        <div class="hero-badge">
          <i class="fas fa-rocket"></i> TCS NQT 2026 Practice Platform
        </div>
        <h1>Master Coding with<br><span class="gradient-text">CodeForge</span></h1>
        <p>Practice TCS NQT coding questions, understand problems step by step, write & execute code, and get AI-powered help — all in one place.</p>
        <div class="hero-actions">
          <button class="btn-primary" onclick="location.hash='#/problems'">
            <i class="fas fa-code"></i> Start Practicing
          </button>
          <button class="btn-secondary" id="hero-ai-btn">
            <i class="fas fa-robot"></i> Ask AI
          </button>
        </div>
      </div>

      <div class="stats-bar">
        <div class="stat-card">
          <div class="stat-value">${totalProblems}</div>
          <div class="stat-label">Total Problems</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${solved}</div>
          <div class="stat-label">Solved</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Math.round((solved / totalProblems) * 100) || 0}%</div>
          <div class="stat-label">Completion</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${streak}</div>
          <div class="stat-label">Day Streak 🔥</div>
        </div>
      </div>

      <h2 class="section-title"><i class="fas fa-layer-group"></i> Categories</h2>
      <div class="category-grid">
        ${categories.map(cat => `
          <div class="category-card" data-category="${cat.id}">
            <div class="category-icon">${cat.icon}</div>
            <div class="category-name">${cat.name}</div>
            <div class="category-count">${problems.filter(p => p.category === cat.id).length} problems</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Category card click
  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      state.filter = card.dataset.category;
      navigate('/problems');
    });
  });

  // AI button
  document.getElementById('hero-ai-btn')?.addEventListener('click', toggleAI);
}

// ============================================
// Render Problems Page
// ============================================
function renderProblems(container) {
  container.innerHTML = `
    <div class="problems-page fade-in">
      <div class="problems-header">
        <h1 class="section-title"><i class="fas fa-code"></i> Practice Problems</h1>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" id="search-input" placeholder="Search problems..." value="${state.searchQuery}" />
        </div>
      </div>
      <div class="filter-bar" id="filter-bar">
        <button class="filter-btn ${state.filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
        ${categories.map(cat => `
          <button class="filter-btn ${state.filter === cat.id ? 'active' : ''}" data-filter="${cat.id}">${cat.icon} ${cat.name}</button>
        `).join('')}
      </div>
      <div class="problem-list" id="problem-list"></div>
    </div>
  `;

  renderProblemList();

  // Filter buttons
  document.getElementById('filter-bar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (btn) {
      state.filter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblemList();
    }
  });

  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProblemList();
  });
}

function renderProblemList() {
  const list = document.getElementById('problem-list');
  if (!list) return;

  let filtered = problems;
  if (state.filter !== 'all') {
    filtered = filtered.filter(p => p.category === state.filter);
  }
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    );
  }

  list.innerHTML = filtered.map((p, i) => {
    const isSolved = state.solvedProblems.includes(p.id);
    return `
      <div class="problem-card" data-id="${p.id}">
        <span class="problem-id">#${String(i + 1).padStart(2, '0')}</span>
        <div class="problem-info">
          <h3>${getProblemTitle(p)}</h3>
          <div class="problem-tags">
            ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <span class="difficulty-badge ${p.difficulty}">${p.difficulty}</span>
        <span class="problem-status ${isSolved ? 'solved' : ''}">
          ${isSolved ? '<i class="fas fa-check"></i>' : ''}
        </span>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.problem-card').forEach(card => {
    card.addEventListener('click', () => {
      navigate('/workspace/' + card.dataset.id);
    });
  });
}

// ============================================
// Render Workspace
// ============================================
function renderWorkspace(container) {
  const p = state.currentProblem;
  if (!p) {
    container.innerHTML = '<div class="problems-page"><p>Problem not found.</p></div>';
    return;
  }

  const submissions = loadSubmissions();
  const existingSubmission = submissions[p.id];

  container.innerHTML = `
    <div class="workspace-page fade-in">
      <div class="workspace-problem" id="workspace-problem-panel">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-md); border-bottom: 1px solid var(--border); gap: var(--space-md);">
          <div style="display: flex; gap: var(--space-sm);">
            <button class="back-btn" onclick="location.hash='#/problems'">
              <i class="fas fa-arrow-left"></i> Back
            </button>
            <button class="back-btn" id="prev-btn" ${!getAdjacentProblems().prev ? 'disabled' : ''} style="opacity: ${!getAdjacentProblems().prev ? '0.5' : '1'}; cursor: ${!getAdjacentProblems().prev ? 'not-allowed' : 'pointer'};">
              <i class="fas fa-chevron-left"></i> Prev
            </button>
            <button class="back-btn" id="next-btn" ${!getAdjacentProblems().next ? 'disabled' : ''} style="opacity: ${!getAdjacentProblems().next ? '0.5' : '1'}; cursor: ${!getAdjacentProblems().next ? 'not-allowed' : 'pointer'};">
              <i class="fas fa-chevron-right"></i> Next
            </button>
          </div>
          <button class="btn-primary" id="submit-btn" style="opacity: 0.5; cursor: not-allowed;" disabled>
            <i class="fas fa-upload"></i> Submit (Waiting for tests...)
          </button>
        </div>
        <div class="workspace-problem-content">
          <div class="problem-header">
            <h2>${getProblemTitle(p)}</h2>
            <span class="difficulty-badge ${p.difficulty}">${p.difficulty}</span>
          </div>
          <div id="submitted-answer-info" style="margin-top: 10px; font-size: 0.9rem;
            border-radius: 8px; border: 1px dashed var(--accent-secondary); padding: 8px; display: none;
            background: rgba(16, 185, 129, 0.09); color: var(--success);">
          </div>
          
          <div style="padding: 0 var(--space-lg);">
            <div class="problem-section">
              <h3>📋 Description</h3>
              <div class="problem-description">${p.description}</div>
            </div>

        ${p.examples ? `
          <div class="problem-section">
            <h3>📝 Examples</h3>
            <div id="examples-container">
              ${p.examples.slice(0, 2).map(ex => `
                <div class="example-block">
                  <div class="label">Input:</div>
                  <div>${ex.input}</div>
                  <div class="label" style="margin-top:8px">Output:</div>
                  <div>${ex.output}</div>
                  ${ex.explanation ? `<div class="label" style="margin-top:8px">Explanation:</div><div>${ex.explanation}</div>` : ''}
                </div>
              `).join('')}
              ${p.examples.length > 2 ? `
                <details style="margin-top: 12px; cursor: pointer;">
                  <summary style="font-weight: 500; padding: 8px; background: rgba(124, 58, 237, 0.1); border-radius: 4px; user-select: none;">
                    🔽 Show ${p.examples.length - 2} more example(s)
                  </summary>
                  ${p.examples.slice(2).map(ex => `
                    <div class="example-block" style="margin-top: 12px;">
                      <div class="label">Input:</div>
                      <div>${ex.input}</div>
                      <div class="label" style="margin-top:8px">Output:</div>
                      <div>${ex.output}</div>
                      ${ex.explanation ? `<div class="label" style="margin-top:8px">Explanation:</div><div>${ex.explanation}</div>` : ''}
                    </div>
                  `).join('')}
                </details>
              ` : ''}
            </div>
          </div>
        ` : ''}

        ${p.constraints ? `
          <div class="problem-section">
            <h3>⚙️ Constraints</h3>
            <div class="problem-description">${p.constraints}</div>
          </div>
        ` : ''}

        ${p.hints ? `
          <div class="problem-section">
            <h3>💡 Hints</h3>
            ${p.hints.map((h, i) => `
              <div class="hint-box" data-hint="${i}">
                <i class="fas fa-lightbulb"></i> Click to reveal Hint ${i + 1}
                <div class="hint-content">${h}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="problem-section">
          ${p.type === 'coding' ? `
            <h3>🧪 Test Cases & Edge Cases</h3>
            <ul style="padding-left: 20px; color: var(--text-secondary); font-size: 0.9rem; margin-top: 8px; margin-bottom: 16px;">
              <li style="margin-bottom: 4px;">Test against standard inputs (Examples).</li>
              <li style="margin-bottom: 4px;">Check edge cases (empty elements, null, zero/negatives, single elements).</li>
              <li>Add prints like <code>System.out.println()</code> in your <code>main</code> method to validate outputs before deciding it's correct.</li>
            </ul>
          ` : ''}
          </div>
          ${p.type === 'theory' ? `
          <div class="problem-section" style="border: 1px solid var(--border); border-radius: 10px; padding: 12px; margin-top: 14px;">
            <h3>📝 Your Answer</h3>
            <textarea id="theory-answer" style="width:100%; min-height:120px; margin-top: 8px; padding: 8px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg);">${existingSubmission?.code || ''}</textarea>
            <p style="margin-top:8px; color: var(--text-secondary); font-size: 0.85rem;">Your submitted answer is saved to the Submissions page.</p>
          </div>
          ` : ''}
          <div class="solution-box" id="solution-box">
            <h4><i class="fas fa-eye"></i> Show ${p.type === 'theory' ? 'Answer' : 'Solution Code'} (Click to toggle)</h4>
            <div class="solution-code" id="solution-container">
              <div id="solution-editor"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="workspace-divider" id="workspace-divider"></div>

      ${p.type === 'coding' ? `
      <div class="workspace-editor">
        <div class="editor-toolbar">
          <select id="lang-select">
            <option value="java" selected>Java</option>
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript</option>
            <option value="c++">C++</option>
          </select>
          <div class="editor-actions">
            <button class="btn-reset" id="reset-btn">
              <i class="fas fa-rotate-right"></i> Reset
            </button>
            <button class="btn-run" id="run-btn">
              <i class="fas fa-play"></i> Run Code
            </button>
          </div>
        </div>
        <div id="editor-container"></div>
        <div class="editor-resizer" id="editor-resizer"></div>
      
      <div class="testcase-panel" id="testcase-panel">
        <div class="panel-header">
          <div class="panel-tabs">
            <button class="panel-tab active" data-target="tc-view"><i class="fas fa-check-square"></i> Test Case</button>
            <button class="panel-tab" data-target="result-view"><i class="fas fa-terminal"></i> Result</button>
          </div>
          <button class="btn-reset" id="clear-output" style="padding: 4px 10px; font-size: 0.75rem;">
            <i class="fas fa-trash"></i> Clear
          </button>
        </div>
        
        <div class="panel-content active" id="tc-view">
          <div class="tc-subtabs">
            ${(p.examples || []).map((ex, i) => `
              <button class="tc-tab ${i === 0 ? 'active' : ''}" data-index="${i}">TC ${String(i+1).padStart(2, '0')}</button>
            `).join('')}
          </div>
          <div class="tc-bodies">
            ${(p.examples || []).map((ex, i) => `
              <div class="tc-body ${i === 0 ? 'active' : ''}" id="tc-body-${i}">
                <div class="tc-label">Input</div>
                <div class="tc-value">${escapeHtml(ex.input)}</div>
                <div class="tc-label">Expected Output</div>
                <div class="tc-value">${escapeHtml(ex.output)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel-content" id="result-view">
          <div class="output-content" id="output-content">Click "Run Code" to execute...</div>
        </div>
      </div>
      </div>
      ` : ''}
    </div>
  `;

  // Hint toggles
  container.querySelectorAll('.hint-box').forEach(box => {
    box.addEventListener('click', () => box.classList.toggle('revealed'));
  });

  // Solution toggle (works for both coding and theory)
  const solBox = document.getElementById('solution-box');
  if (solBox) {
    solBox.style.cursor = 'pointer';
    solBox.addEventListener('click', function (e) {
      // Don't toggle if clicking on editor content
      if (e.target.closest('#solution-editor')) return;
      
      this.classList.toggle('revealed');
      if (this.classList.contains('revealed') && !state.solutionEditor && p.solution && p.type === 'coding') {
        // Ensure Monaco is loaded
        require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
          setTimeout(() => {
            if (!state.solutionEditor && document.getElementById('solution-editor')) {
              state.solutionEditor = window.monaco.editor.create(document.getElementById('solution-editor'), {
                value: p.solution,
                language: 'java',
                theme: 'codeforge-dark',
                readOnly: true,
                minimap: { enabled: false },
                automaticLayout: true,
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                padding: { top: 10 }
              });
            }
          }, 50);
        });
      }
    });
  }

  // Resizable panels
  const resizer = document.getElementById('editor-resizer');
  const tcPanel = document.getElementById('testcase-panel');
  let isResizing = false;

  if (resizer && tcPanel) {
    resizer.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = 'ns-resize';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;
      const container = document.querySelector('.workspace-editor');
      const containerRect = container.getBoundingClientRect();
      const newHeight = containerRect.bottom - e.clientY;
      
      if (newHeight >= 100 && newHeight <= containerRect.height - 100) {
        tcPanel.style.height = `${newHeight}px`;
        tcPanel.style.flex = 'none';
        window.dispatchEvent(new Event('resize'));
      }
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
      }
    });
  }

  // Resizable left/right panels
  const divider = document.getElementById('workspace-divider');
  const problemPanel = document.getElementById('workspace-problem-panel');
  const workspacePage = document.querySelector('.workspace-page');
  let isDividerDragging = false;

  if (divider && problemPanel && workspacePage) {
    divider.addEventListener('mousedown', (e) => {
      isDividerDragging = true;
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDividerDragging) return;
      const pageRect = workspacePage.getBoundingClientRect();
      const newWidth = e.clientX - pageRect.left;
      const totalWidth = pageRect.width;
      const minWidth = 300;
      const maxWidth = totalWidth - 300;
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        const splitRatio = (newWidth / totalWidth) * 100;
        workspacePage.style.setProperty('--split-ratio', `${splitRatio}%`);
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDividerDragging) {
        isDividerDragging = false;
        document.body.style.cursor = 'default';
      }
    });
  }

  if (p.type === 'coding') {
    const submissions = loadSubmissions();
    const existingSubmission = submissions[p.id];
    const startCode = existingSubmission?.code || p.starterCode || p.solution || '// Write your Java code here\n';

    // Init Monaco Editor
    initMonaco(startCode);

    if (existingSubmission) {
      const submitInfo = document.getElementById('submitted-answer-info');
      if (submitInfo) {
        submitInfo.style.display = 'block';
        submitInfo.innerHTML = `✅ Submitted answer loaded. Last submitted: ${new Date(existingSubmission.submittedAt).toLocaleString()} (` +
          `<span style="font-weight: 600;">${existingSubmission.language}</span>)`;
      }

      state.allTestsPassed = true;
      state.lastTestResults = existingSubmission.testResults || null;
      const submitBtn = document.getElementById('submit-btn');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Submit Answer';
      }
    }

    // Navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (prevBtn && !getAdjacentProblems().prev) prevBtn.disabled = true;
    if (nextBtn && !getAdjacentProblems().next) nextBtn.disabled = true;

    prevBtn?.addEventListener('click', prevProblem);
    nextBtn?.addEventListener('click', nextProblem);
    submitBtn?.addEventListener('click', submitCode);

    // Run button
    document.getElementById('run-btn').addEventListener('click', runCode);

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (state.editor) {
        state.editor.setValue(p.starterCode || p.solution || '// Write your Java code here\n');
      }
    });

    // Clear output
    document.getElementById('clear-output').addEventListener('click', () => {
      const out = document.getElementById('output-content');
      out.textContent = 'Click "Run Code" to see output here...';
      out.className = 'output-content';
    });

    // Language change
    document.getElementById('lang-select').addEventListener('change', (e) => {
      if (state.editor) {
        const model = state.editor.getModel();
        if (model) {
          window.monaco.editor.setModelLanguage(model, e.target.value === 'c++' ? 'cpp' : e.target.value);
        }
      }
    });

    // Testcase vs Result tabs
    container.querySelectorAll('.panel-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        container.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        container.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
      });
    });

    // Sub-tabs for individual test cases
    container.querySelectorAll('.tc-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        container.querySelectorAll('.tc-tab').forEach(t => t.classList.remove('active'));
        container.querySelectorAll('.tc-body').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tc-body-' + tab.dataset.index).classList.add('active');
      });
    });
  } else {
    // For theory questions, adjust grid to single column and dispose editor
    container.querySelector('.workspace-page').style.display = 'block';
    container.querySelector('.workspace-problem').style.borderRight = 'none';

    if (state.editor) {
      state.editor.dispose();
      state.editor = null;
    }

    // Allow submit for theory questions without runtime tests
    state.allTestsPassed = true;
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
      submitBtn.innerHTML = '<i class="fas fa-upload"></i> Submit Answer';
    }

    // Show previous submitted answer (if any)
    const existingSubmission = loadSubmissions()[p.id];
    if (existingSubmission) {
      const textarea = document.getElementById('theory-answer');
      if (textarea) {
        textarea.value = existingSubmission.code;
      }
      const submitInfo = document.getElementById('submitted-answer-info');
      if (submitInfo) {
        submitInfo.style.display = 'block';
        submitInfo.innerHTML = `✅ Submitted answer loaded. Last submitted: ${new Date(existingSubmission.submittedAt).toLocaleString()} (` +
          `<span style="font-weight: 600;">${existingSubmission.language}</span>)`;
      }
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// Monaco Editor
// ============================================
function initMonaco(initialCode) {
  if (state.editor) {
    state.editor.dispose();
    state.editor = null;
  }

  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

  require(['vs/editor/editor.main'], function () {
    // Define custom dark theme
    monaco.editor.defineTheme('codeforge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
      ],
      colors: {
        'editor.background': '#0d0d24',
        'editor.foreground': '#d4d4d4',
        'editorCursor.foreground': '#7c3aed',
        'editor.lineHighlightBackground': '#1a1a3e50',
        'editorLineNumber.foreground': '#555580',
        'editor.selectionBackground': '#7c3aed40',
        'editor.inactiveSelectionBackground': '#7c3aed20',
      }
    });

    state.editor = monaco.editor.create(document.getElementById('editor-container'), {
      value: initialCode,
      language: 'java',
      theme: 'codeforge-dark',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 14,
      lineHeight: 22,
      padding: { top: 16 },
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      wordWrap: 'on',
      bracketPairColorization: { enabled: true },
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      renderLineHighlight: 'all',
    });

    // Ctrl+Enter to run
    state.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
  });
}

// ============================================
// Code Execution
// ============================================
async function runCode() {
  const p = state.currentProblem;
  const runBtn = document.getElementById('run-btn');
  const output = document.getElementById('output-content');
  if (!state.editor || !output || !p) return;

  // Auto-switch to result tab
  const resultTab = document.querySelector('.panel-tab[data-target="result-view"]');
  if (resultTab) resultTab.click();

  const code = state.editor.getValue();
  const lang = document.getElementById('lang-select').value;
  
  // 1. Prep Test Cases (Visible + Hidden)
  const visible = normalizeTestCases(p.examples || []);
  const hidden = normalizeTestCases(p.hiddenTests || []);
  const allTests = [...visible, ...hidden];

  runBtn.disabled = true;
  runBtn.innerHTML = '<span class="spinner"></span> Running...';
  output.innerHTML = '<div style="padding: 1rem;"><i class="fas fa-circle-notch fa-spin"></i> Executing against all test cases...</div>';
  output.className = 'output-content';

  try {
    const rawResults = await executeCode(code, lang, allTests);
    const results = normalizeResults(rawResults);

    let passedCount = results.filter(r => r.passed).length;
    let totalCount = results.length;
    let score = Math.round((passedCount / totalCount) * 100);
    const allPassed = (passedCount === totalCount);

    output.innerHTML = '';
    
    if (totalCount > 0) {
      // 1. Result Status Header with Score
      const header = document.createElement('div');
      header.className = 'result-header-main';
      header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="status-badge ${allPassed ? 'accepted' : 'rejected'}">
            <i class="fas ${allPassed ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
            ${allPassed ? 'Accepted' : 'Wrong Answer'}
          </div>
          <div class="score-badge" style="background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px; border: 1px solid var(--border);">
            Score: <span style="color: ${allPassed ? 'var(--success)' : 'var(--warning)'}">${score}/100</span>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary)">
          ${passedCount} / ${totalCount} Passed
        </div>
      `;
      output.appendChild(header);

      // 2. Case Selection Tabs (Flexbox)
      const tabsBar = document.createElement('div');
      tabsBar.className = 'case-tabs-scroll';
      output.appendChild(tabsBar);

      // 3. Details Panes
      results.forEach((r, idx) => {
        const isHidden = idx >= visible.length;
        const tabBtn = document.createElement('button');
        tabBtn.className = `case-tab-btn ${r.passed ? 'passed' : 'failed'}`;
        tabBtn.innerHTML = `<i class="fas ${r.passed ? 'fa-check' : 'fa-times'}"></i> ${isHidden ? 'Hidden' : 'Case'} ${idx + 1}`;
        tabBtn.onclick = () => {
          output.querySelectorAll('.case-tab-btn').forEach(b => b.classList.remove('active'));
          output.querySelectorAll('.case-content-pane').forEach(p => p.classList.remove('active'));
          tabBtn.classList.add('active');
          document.getElementById(`case-pane-${idx}`).classList.add('active');
        };
        tabsBar.appendChild(tabBtn);

        const pane = document.createElement('div');
        pane.id = `case-pane-${idx}`;
        pane.className = 'case-content-pane';
        pane.innerHTML = `
            ${r.error ? `
              <div class="test-label" style="color:var(--error)">Execution Error:</div>
              <div class="test-val" style="color: var(--error); border-color: rgba(239, 68, 68, 0.3); font-size: 0.8rem;">${escapeHtml(r.error)}</div>
            ` : ''}
            <div class="test-label">Input:</div>
            <div class="test-val">${escapeHtml(r.input || '')}</div>
            <div class="test-label">Your Output:</div>
            <div class="test-val" style="color: ${r.passed ? 'var(--success)' : 'var(--error)'}">${escapeHtml(r.output || '')}</div>
            <div class="test-label">Expected Output:</div>
            <div class="test-val">
              ${r.passed ? escapeHtml(r.expected) : `<span style="color:var(--error); font-weight: 600;">${escapeHtml(r.expected)}</span>`}
            </div>
        `;
        output.appendChild(pane);
      });

      // 4. Auto-select logic
      const firstFailedIdx = results.findIndex(r => !r.passed);
      const selectIdx = firstFailedIdx !== -1 ? firstFailedIdx : 0;
      tabsBar.children[selectIdx]?.click();

    } else {
      // Basic execution result if no testcases
      const r = results[0];
      output.innerHTML = `
        <div class="status-badge ${r.passed ? 'accepted' : 'rejected'}" style="margin-bottom: 12px;">
          <i class="fas ${r.passed ? 'fa-check-circle' : 'fa-times-circle'}"></i> Execution Finished
        </div>
        <div class="test-label">Output:</div>
        <div class="test-val">${escapeHtml(r.output || '')}</div>
        ${r.error ? `<div class="test-label" style="color:var(--error)">Error:</div><div class="test-val" style="color: var(--error);">${escapeHtml(r.error)}</div>` : ''}
      `;
    }

    if (allPassed && !state.solvedProblems.includes(p.id)) {
      state.solvedProblems.push(p.id);
      saveSolved();
    }

    // Update submit button state
    state.lastTestResults = results;
    state.allTestsPassed = allPassed;
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      if (allPassed) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Submit Answer';
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `<i class="fas fa-lock"></i> Submit (${passedCount}/${totalCount} tests passed)`;
      }
    }
  } catch (err) {
    output.innerHTML = `<div style="color: var(--error); padding: 12px; border-radius: 8px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);">Error: ${escapeHtml(err.message)}</div>`;
    
    // Disable submit on error
    state.allTestsPassed = false;
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.5';
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.innerHTML = '<i class="fas fa-lock"></i> Submit (Error occurred)';
    }
  }
  
  runBtn.disabled = false;
  runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
}

// ============================================
// Settings Page
// ============================================
function renderSettings(container) {
  const groqKey = localStorage.getItem('cf_groq_key') || '';
  const geminiKey = localStorage.getItem('cf_gemini_key') || '';

  container.innerHTML = `
    <div class="settings-page fade-in">
      <h1><i class="fas fa-gear"></i> Settings</h1>
      
      <div class="settings-section">
        <h3><i class="fas fa-bolt"></i> Groq API Key</h3>
        <div class="form-group">
          <label>API Key</label>
          <input type="password" id="groq-key" value="${groqKey}" placeholder="gsk_..." />
          <div class="helper-text">Get your free API key at <a href="https://console.groq.com" target="_blank">console.groq.com</a></div>
        </div>
      </div>

      <div class="settings-section">
        <h3><i class="fas fa-gem"></i> Google Gemini API Key</h3>
        <div class="form-group">
          <label>API Key</label>
          <input type="password" id="gemini-key" value="${geminiKey}" placeholder="AIza..." />
          <div class="helper-text">Get your free API key at <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com</a></div>
        </div>
      </div>

      <div class="settings-section">
        <h3><i class="fas fa-database"></i> Progress</h3>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">
          You've solved <strong>${state.solvedProblems.length}</strong> out of <strong>${problems.length}</strong> problems.
        </p>
        <button class="btn-secondary" id="reset-progress">
          <i class="fas fa-trash"></i> Reset All Progress
        </button>
      </div>

      <button class="btn-save" id="save-settings">
        <i class="fas fa-check"></i> Save Settings
      </button>
    </div>
  `;

  document.getElementById('save-settings').addEventListener('click', () => {
    localStorage.setItem('cf_groq_key', document.getElementById('groq-key').value);
    localStorage.setItem('cf_gemini_key', document.getElementById('gemini-key').value);
    showToast('Settings saved successfully!');
  });

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      state.solvedProblems = [];
      localStorage.removeItem('cf_solved');
      localStorage.removeItem('cf_streak');
      showToast('Progress reset.');
      renderSettings(container);
    }
  });
}

function renderSubmissions(container) {
  const answered = loadSubmissions();
  const keys = Object.keys(answered);
  container.innerHTML = `
    <div class="submissions-page fade-in">
      <h1><i class="fas fa-file-alt"></i> Submissions</h1>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">Total submissions: ${keys.length}</p>
      <div class="submission-list">
        ${keys.length === 0 ? '<div class="empty-state">No submissions yet. Submit a problem to see it here.</div>' : ''}
        ${keys.map((problemId) => {
          const item = answered[problemId];
          const problem = problems.find(p => p.id === Number(problemId));
          return `
            <div class="submission-card" onclick="window.location.hash='#/workspace/${problemId}'" style="cursor: pointer;">
              <div class="submission-header">
                <strong>${problem ? getProblemTitle(problem) : `Q${problemId}`}</strong>
                <span class="tag submitted">Submitted</span>
              </div>
              <div class="submission-meta">Language: ${item.language} · Submitted: ${new Date(item.submittedAt).toLocaleString()}</div>
              <pre class="submission-code">${escapeHtml(item.code)}</pre>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================
// AI Chat Sidebar
// ============================================
function toggleAI() {
  const sidebar = document.getElementById('ai-sidebar');
  const content = document.getElementById('page-content');
  sidebar.classList.toggle('open');
  content.classList.toggle('sidebar-open', sidebar.classList.contains('open'));
}

function initAIChat() {
  document.getElementById('ai-toggle-btn').addEventListener('click', toggleAI);
  document.getElementById('ai-close-btn').addEventListener('click', toggleAI);

  // Provider toggle
  document.querySelectorAll('.ai-provider').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ai-provider').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.aiProvider = btn.dataset.provider;
    });
  });

  // Quick actions
  document.querySelectorAll('.quick-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const p = state.currentProblem;
      let prompt = '';

      if (action === 'explain' && p) {
        prompt = `Explain this coding problem clearly:\n\nTitle: ${p.title}\nDescription: ${p.description}\n\nBreak it down step by step so I can understand what's being asked.`;
      } else if (action === 'hint' && p) {
        prompt = `Give me a helpful hint for solving this problem without revealing the full solution:\n\nTitle: ${p.title}\nDescription: ${p.description}`;
      } else if (action === 'debug') {
        const code = state.editor ? state.editor.getValue() : '';
        prompt = `Debug this Java code and explain what's wrong:\n\n\`\`\`java\n${code}\n\`\`\``;
      } else if (action === 'approach' && p) {
        prompt = `Suggest a step-by-step approach to solve this problem:\n\nTitle: ${p.title}\nDescription: ${p.description}\n\nProvide the algorithm/approach without writing the full code.`;
      } else {
        prompt = `Help me with a coding question.`;
      }

      sendAIMessage(prompt);
    });
  });

  // Send message
  document.getElementById('ai-send-btn').addEventListener('click', () => {
    const input = document.getElementById('ai-input');
    const msg = input.value.trim();
    if (msg) {
      sendAIMessage(msg);
      input.value = '';
    }
  });

  // Enter to send
  document.getElementById('ai-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('ai-send-btn').click();
    }
  });
}

async function sendAIMessage(prompt) {
  const messagesDiv = document.getElementById('ai-messages');

  // Open sidebar if closed
  const sidebar = document.getElementById('ai-sidebar');
  if (!sidebar.classList.contains('open')) {
    toggleAI();
  }

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-message user';
  userMsg.textContent = prompt;
  messagesDiv.appendChild(userMsg);

  // Add typing indicator
  const typingMsg = document.createElement('div');
  typingMsg.className = 'ai-message assistant typing';
  typingMsg.textContent = 'Thinking';
  messagesDiv.appendChild(typingMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const groqKey = localStorage.getItem('cf_groq_key');
    const geminiKey = localStorage.getItem('cf_gemini_key');

    const response = await askAI(prompt, state.aiProvider, groqKey, geminiKey, state.currentProblem);

    typingMsg.remove();

    const assistantMsg = document.createElement('div');
    assistantMsg.className = 'ai-message assistant';

    const formattedResponse = formatAIResponse(response);

    assistantMsg.innerHTML = `
      <div class="ai-response-header"><i class="fas fa-robot"></i> AI Answer</div>
      <div class="ai-response-body">${formattedResponse}</div>
    `;
    messagesDiv.appendChild(assistantMsg);
  } catch (err) {
    typingMsg.remove();
    const errorMsg = document.createElement('div');
    errorMsg.className = 'ai-message assistant';
    errorMsg.innerHTML = `<span style="color: var(--error);">⚠️ ${err.message}</span><br><br>Make sure you've set your API keys in <a href="#/settings">Settings</a>.`;
    messagesDiv.appendChild(errorMsg);
  }

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  router();
  initAIChat();

  // Update streak
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('cf_last_visit');
  if (lastVisit !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastVisit === yesterday) {
      localStorage.setItem('cf_streak', parseInt(localStorage.getItem('cf_streak') || '0') + 1);
    } else if (lastVisit !== today) {
      localStorage.setItem('cf_streak', '1');
    }
    localStorage.setItem('cf_last_visit', today);
  }
});
