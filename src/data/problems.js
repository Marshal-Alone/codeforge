import { codingProblems } from './coding-problems.js';
import { theoryProblems } from './theory-problems.js';

export const categories = [
  { id: 'arrays', name: 'Arrays', icon: '📊' },
  { id: 'strings', name: 'Strings', icon: '🔤' },
  { id: 'number-series', name: 'Number Series', icon: '🔢' },
  { id: 'sorting', name: 'Sorting Algorithms', icon: '📈' },
  { id: 'conversions', name: 'Conversions', icon: '🔄' },
  { id: 'recursion', name: 'Recursion', icon: '🔁' },
  { id: 'dsa', name: 'DSA (Advanced)', icon: '🌳' },
  { id: 'oop', name: 'OOP Concepts', icon: '🏗️' },
  { id: 'advanced', name: 'Advanced Coding', icon: '🚀' },
  { id: 'quantitative', name: 'Quantitative Aptitude', icon: '📐' },
  { id: 'verbal', name: 'Verbal Ability', icon: '🗣️' },
  { id: 'numerical', name: 'Numerical Ability', icon: '🧮' },
  { id: 'reasoning', name: 'Reasoning', icon: '🧩' },
];

export const problems = [...codingProblems, ...theoryProblems];
