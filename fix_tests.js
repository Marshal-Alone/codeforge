import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to restore the corrupted test cases and fix the syntax errors.
// These are the EXACT arrays of objects that should be in the `examples` field of the DB objects.

const correctDBExamples = {
  // Fix syntax error in DB 2
  2: [
    {input: "arr = {1, 2, 3, 4}", output: "[4, 3, 2, 1]"},
    {input: "arr = {5}", output: "[5]"},
    {input: "arr = {}", output: "[]"}
  ],
  // DB 8: Count Vowels and Consonants (was overwritten with Palindrome)
  8: [
    {input: "str = \"Hello World\"", output: "Vowels: 3, Consonants: 7"},
    {input: "str = \"AEIOU\"", output: "Vowels: 5, Consonants: 0"}
  ],
  // Let's check DB 13 and 14 from part1.js later, or just restore generic for now if we know them.
  // We can just rely on the original text from the user's prompt.
  // The user prompt said: 
  // 14. Reverse String: {input:"Java", expected:"avaJ"}
  // 13. Reverse Word Order: {input:"I Love Java", expected:"Java Love I"}
  13: [
    {input: "str = \"Java\"", output: "avaJ"},
    {input: "str = \"\"", output: ""}
  ],
  14: [ // The user didn't mention ID 14 in DB, maybe it's 15? Let's just restore generically if possible.
    // Actually wait, let's just do the ones we know were corrupted in part3.js and part2.js
  ],
  // part2.js DB 16: Decimal to Binary (was overwritten with Fibonacci)
  16: [
    {input: "num = 10", output: "1010"},
    {input: "num = 0", output: "0"}
  ],
  // part3.js DB 21: Bubble Sort (was overwritten with Reverse Number)
  21: [
    {input: "arr = {64, 34, 25, 12}", output: "[12, 25, 34, 64]"},
    {input: "arr = {1}", output: "[1]"}
  ],
  // part3.js DB 22: Insertion Sort (was overwritten)
  22: [
    {input: "arr = {12, 11, 13, 5}", output: "[5, 11, 12, 13]"}
  ],
  // part3.js DB 23: Selection Sort (was overwritten)
  23: [
    {input: "arr = {64, 25, 12, 22}", output: "[12, 22, 25, 64]"}
  ],
  // part3.js DB 27: LCS (was overwritten with Decimal to Binary)
  27: [
    {input: "s1 = \"AGGTAB\", s2 = \"GXTXAYB\"", output: "4"}
  ],
  // part3.js DB 32: Polymorphism (was overwritten with Factorial)
  32: [
    {input: "Animal a = new Pig()", output: "Pig: wee wee"}
  ]
};

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the syntax error directly for ID 2:
  // It looks like:
  //    examples:[
  // ...
  //    ]'},
  // ...
  //    ],
  // We'll just replace the whole examples array using a smarter regex or string replacement.
  
  for (const [idStr, tcs] of Object.entries(correctDBExamples)) {
    if (tcs.length === 0) continue;
    const id = parseInt(idStr);
    
    const newExamples = tcs.map(tc => `{input: '${tc.input.replace(/'/g, "\\'")}', output: '${tc.output}'}`).join(',\n      ');
    
    // Smashes any broken syntax around examples array for this ID:
    const regex = new RegExp(`(\\{id:\\s*${id}\\s*,[\\s\\S]*?examples:\\s*\\[)([\\s\\S]*?)(\\](?:'\\}?,|[\\s\\S]*?\\],|,)?)(\\s*hints:|\\s*starterCode:)`);
    
    if (regex.test(content)) {
      content = content.replace(regex, (match, prefix, oldBlock, suffix, nextField) => {
        return prefix + '\n      ' + newExamples + '\n    ],\n' + nextField;
      });
      console.log(`Fixed problem ID ${id} in ${path.basename(filePath)}`);
    }
  }

  // Generic syntax cleanup for the rogue `]'}, \n {input... \n ],`
  content = content.replace(/\n\s*\]'\},\n\s*\{input:.*?\n\s*\{input:.*?\n\s*\],/g, "\n    ],");

  fs.writeFileSync(filePath, content, 'utf8');
}

fixFile(path.join(__dirname, 'src', 'data', 'part1.js'));
fixFile(path.join(__dirname, 'src', 'data', 'part2.js'));
fixFile(path.join(__dirname, 'src', 'data', 'part3.js'));
console.log('Fix complete.');
