// Theory / Aptitude Questions (Quantitative, Verbal, Numerical, Reasoning)
export const theoryProblems = [
  // ===== QUANTITATIVE APTITUDE =====
  {
    id: 52, title: 'Production Calculation', category: 'quantitative', difficulty: 'medium', type: 'theory', tags: ['Math', 'Work'],
    description: 'A machine produces x units per hour. Due to a fault, it produces only 5/8 of the normal output. How many units will it produce in one hour?',
    examples: [{ input: 'Normal production = x units/hr', output: '5x/8 units' }],
    hints: ['Multiply x by the fault fraction 5/8.'],
    answer: '**Answer: 5x/8 units**\n\nThe machine normally produces x units. With the fault, it produces 5/8 of normal.\n\nProduction = x × 5/8 = **5x/8 units per hour**'
  },
  {
    id: 53, title: 'Selling Price Problem', category: 'quantitative', difficulty: 'medium', type: 'theory', tags: ['Math', 'Profit'],
    description: 'A shopkeeper buys an article for $320 and sells it at a profit of 18.75%. What is the selling price?',
    examples: [{ input: 'Cost Price = $320, Profit = 18.75%', output: '$380' }],
    hints: ['SP = CP + (Profit% × CP)', 'SP = CP × (1 + Profit%/100)'],
    answer: '**Answer: $380**\n\nSP = CP × (1 + Profit/100)\nSP = 320 × (1 + 18.75/100)\nSP = 320 × 1.1875 = **$380**'
  },
  {
    id: 54, title: 'Cube Side Length', category: 'quantitative', difficulty: 'easy', type: 'theory', tags: ['Math', 'Geometry'],
    description: 'The volume of a cube is 512 cm³. What is the length of each side?',
    examples: [{ input: 'Volume = 512 cm³', output: 'Side = 8 cm' }],
    hints: ['Volume of cube = side³. So side = ∛volume.'],
    answer: '**Answer: 8 cm**\n\nVolume = side³\n512 = side³\nside = ∛512 = **8 cm**'
  },
  {
    id: 55, title: 'Average Speed', category: 'quantitative', difficulty: 'medium', type: 'theory', tags: ['Math', 'Speed'],
    description: 'A car travels 120 km at 40 km/h and returns at 30 km/h. What is the average speed for the whole journey?',
    examples: [{ input: 'Distance = 120 km each way, Speed1 = 40, Speed2 = 30', output: '34.29 km/h' }],
    hints: ['Average speed = Total distance / Total time', 'Don\'t just average the speeds!'],
    answer: '**Answer: 34.29 km/h**\n\nTotal distance = 120 + 120 = 240 km\nTime1 = 120/40 = 3 hrs\nTime2 = 120/30 = 4 hrs\nTotal time = 7 hrs\nAvg speed = 240/7 = **34.29 km/h**'
  },
  {
    id: 56, title: 'Profit Percentage', category: 'quantitative', difficulty: 'easy', type: 'theory', tags: ['Math', 'Profit'],
    description: 'A man buys an article for $400 and sells it for $500. What is his profit percentage?',
    examples: [{ input: 'CP = $400, SP = $500', output: '25%' }],
    hints: ['Profit% = ((SP - CP) / CP) × 100'],
    answer: '**Answer: 25%**\n\nProfit = 500 - 400 = $100\nProfit% = (100/400) × 100 = **25%**'
  },

  // ===== VERBAL ABILITY =====
  {
    id: 57, title: 'Synonym — Ephemeral', category: 'verbal', difficulty: 'easy', type: 'theory', tags: ['Vocabulary', 'Synonym'],
    description: 'What is the synonym of "Ephemeral"?\n\nA) Permanent\nB) Fleeting\nC) Eternal\nD) Lasting',
    answer: '**Answer: B) Fleeting**\n\n"Ephemeral" means lasting for a very short time. Synonym: **Fleeting**\n\nOpposites: Permanent, Eternal, Lasting'
  },
  {
    id: 58, title: 'Correct Spelling', category: 'verbal', difficulty: 'easy', type: 'theory', tags: ['Spelling', 'Grammar'],
    description: 'Which is the correct spelling?\n\nA) Exagerate\nB) Exaggerate\nC) Exagarate\nD) Exagerrate',
    answer: '**Answer: B) Exaggerate**\n\nThe correct spelling is **Exaggerate** (double g, single r)\nMeaning: to represent something as larger or greater than it actually is.'
  },
  {
    id: 59, title: 'Correct Sentence', category: 'verbal', difficulty: 'medium', type: 'theory', tags: ['Grammar', 'Sentence'],
    description: 'Which sentence is grammatically correct?\n\nA) He don\'t know nothing.\nB) She has went to the store.\nC) The team has completed its task.\nD) They was playing football.',
    // FIX: answer field was completely missing.
    answer: '**Answer: C) The team has completed its task.**\n\n- A) Wrong: double negative + incorrect conjugation ("don\'t" → "doesn\'t", remove "nothing")\n- B) Wrong: "has went" is incorrect → should be "has gone"\n- C) ✅ Correct: subject-verb agreement and tense are both proper\n- D) Wrong: "They was" is incorrect → should be "They were"'
  },
  {
    id: 60, title: 'Fill in the Blank — Too/To/Two', category: 'verbal', difficulty: 'easy', type: 'theory', tags: ['Grammar', 'Vocabulary'],
    description: 'Fill in the blank: "The movie was ___ long for the children."\n\nA) to\nB) too\nC) two\nD) tow',
    answer: '**Answer: B) too**\n\n"Too" means excessively or more than enough.\n- **to** = preposition/infinitive\n- **too** = excessively/also\n- **two** = the number 2'
  },
  {
    id: 61, title: 'Articles — A/An/The', category: 'verbal', difficulty: 'easy', type: 'theory', tags: ['Grammar', 'Articles'],
    description: 'Fill in the blank: "She ate ___ apple."\n\nA) a\nB) an\nC) the\nD) no article',
    answer: '**Answer: B) an**\n\nUse "**an**" before words starting with a vowel sound.\n- an apple, an umbrella, an hour\n- a university (sounds like "yoo"), a European'
  },

  // ===== NUMERICAL ABILITY =====
  {
    id: 62, title: 'Expression Evaluation', category: 'numerical', difficulty: 'easy', type: 'theory', tags: ['Math', 'BODMAS'],
    description: 'Evaluate: 2 + 3 × 4 = ?\n\nA) 20\nB) 14\nC) 12\nD) 24',
    hints: ['Follow BODMAS: Multiplication before Addition.'],
    answer: '**Answer: B) 14**\n\nUsing BODMAS:\n2 + (3 × 4) = 2 + 12 = **14**\n\nMultiplication is done before addition.'
  },
  {
    id: 63, title: 'Solve for x', category: 'numerical', difficulty: 'easy', type: 'theory', tags: ['Algebra', 'Equation'],
    description: 'Solve: 3x + 7 = 28. Find x.\n\nA) 5\nB) 6\nC) 7\nD) 8',
    hints: ['Isolate x: subtract 7, then divide by 3.'],
    answer: '**Answer: C) 7**\n\n3x + 7 = 28\n3x = 28 - 7 = 21\nx = 21/3 = **7**'
  },
  {
    id: 64, title: 'Discount Calculation', category: 'numerical', difficulty: 'easy', type: 'theory', tags: ['Math', 'Percentage'],
    description: 'A shirt costs $40. It is on sale at 15% off. What is the discount?\n\nA) $4\nB) $6\nC) $34\nD) $5',
    answer: '**Answer: B) $6**\n\nDiscount = 15% of $40\n= 0.15 × 40 = **$6**\n\nSale price = $40 - $6 = $34'
  },
  {
    id: 65, title: 'Find Odd Numbers', category: 'numerical', difficulty: 'easy', type: 'theory', tags: ['Number', 'Odd/Even'],
    description: 'Which of these are odd numbers: 28, 31, 33, 44, 56?\n\nA) 28, 44\nB) 31, 33\nC) 56, 44\nD) 31, 56',
    answer: '**Answer: B) 31, 33**\n\nOdd numbers are not divisible by 2.\n- 28 ÷ 2 = 14 (even)\n- **31** (odd)\n- **33** (odd)\n- 44 ÷ 2 = 22 (even)\n- 56 ÷ 2 = 28 (even)'
  },
  {
    id: 66, title: 'Time & Work', category: 'numerical', difficulty: 'medium', type: 'theory', tags: ['Math', 'Time'],
    description: 'A can do a job in 12 hours, B can do it in 6 hours. How long will they take working together?\n\nA) 3 hrs\nB) 4 hrs\nC) 5 hrs\nD) 6 hrs',
    hints: ['Combined rate = 1/A + 1/B. Time = 1/combined rate.'],
    answer: '**Answer: B) 4 hrs**\n\nA\'s rate = 1/12, B\'s rate = 1/6\nCombined = 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4\nTime = 4 hours'
  },

  // ===== REASONING =====
  {
    id: 67, title: 'Number Series — Find Next', category: 'reasoning', difficulty: 'medium', type: 'theory', tags: ['Series', 'Pattern'],
    description: 'Find the next number: 2, 4, 8, 16, ?\n\nA) 24\nB) 28\nC) 32\nD) 36',
    hints: ['Look at the ratio between consecutive numbers.'],
    answer: '**Answer: C) 32**\n\nPattern: Each number is doubled (×2)\n2 → 4 → 8 → 16 → **32**'
  },
  {
    id: 68, title: 'Letter Coding — ORANGE', category: 'reasoning', difficulty: 'medium', type: 'theory', tags: ['Coding', 'Pattern'],
    // FIX: All four options and the stated answer were wrong.
    // O=15, R=18, A=1, N=14, G=7, E=5 → concatenated = "151811475".
    // Replaced all options and the answer accordingly.
    description: 'If each letter is coded by its position number (A=1, B=2...), what is the code for ORANGE?\n\nA) 151811475\nB) 151811476\nC) 161811475\nD) 151811465',
    hints: ['O=15, R=18, A=1, N=14, G=7, E=5'],
    answer: '**Answer: A) 151811475**\n\nO=15, R=18, A=1, N=14, G=7, E=5\nConcatenated: 15 | 18 | 1 | 14 | 7 | 5 = **151811475**'
  },
  {
    id: 69, title: 'Odd One Out', category: 'reasoning', difficulty: 'easy', type: 'theory', tags: ['Pattern', 'Classification'],
    description: 'Find the odd one out: Square, Rectangle, Circle, Triangle, Pentagon\n\nA) Square\nB) Circle\nC) Triangle\nD) Pentagon',
    hints: ['Think about what property makes one shape fundamentally different.'],
    answer: '**Answer: B) Circle**\n\nAll others are **polygons** (shapes with straight sides).\nCircle has **no straight sides or vertices** — it\'s the odd one out.'
  },
  {
    id: 70, title: 'Letter Coding — FISH', category: 'reasoning', difficulty: 'easy', type: 'theory', tags: ['Coding', 'Alphabet'],
    // FIX: All four options and the stated answer were wrong.
    // F=6, I=9, S=19, H=8 → concatenated = "69198".
    // All original options were 7-digit numbers which is impossible for FISH.
    // Replaced all options and the answer accordingly.
    description: 'If each letter is coded by its position (A=1, B=2...), what is the code for FISH?\n\nA) 69198\nB) 69208\nC) 59198\nD) 69199',
    hints: ['F=6, I=9, S=19, H=8'],
    answer: '**Answer: A) 69198**\n\nF=6, I=9, S=19, H=8\nConcatenated: 6 | 9 | 19 | 8 = **69198**'
  },
  {
    id: 71, title: 'Alphabetical Order', category: 'reasoning', difficulty: 'easy', type: 'theory', tags: ['Ordering', 'Pattern'],
    description: 'Arrange in alphabetical order: Mouse, Keyboard, Apple, Monitor\n\nA) Apple, Keyboard, Monitor, Mouse\nB) Apple, Monitor, Keyboard, Mouse\nC) Keyboard, Apple, Monitor, Mouse\nD) Mouse, Apple, Keyboard, Monitor',
    answer: '**Answer: A) Apple, Keyboard, Monitor, Mouse**\n\nAlphabetical order:\n1. **A**pple\n2. **K**eyboard\n3. **Mo**nitor\n4. **Mo**use (Mouse comes after Monitor because \'u\' > \'n\')'
  },
];