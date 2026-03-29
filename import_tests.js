import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testCasesData = {
  1: [
   {input:"arr = {12,35,1,10,34,1}", expected:"34"},
   {input:"arr = {5,4,3,2,1}", expected:"4"},
   {input:"arr = {1,2}", expected:"1"},
   {input:"arr = {10,10,9}", expected:"9"},
   {input:"arr = {-1,-2,-3}", expected:"-2"}
  ],
  2: [
   {input:"arr = {1,2,3,4}", expected:"[4, 3, 2, 1]"},
   {input:"arr = {5}", expected:"[5]"},
   {input:"arr = {}", expected:"[]"}
  ],
  3: [
   {input:"arr = {1,2,2,3,3}", expected:"2"}, 
   {input:"arr = {1,1,1}", expected:"1"},
   {input:"arr = {1,2,3}", expected:""}
  ],
  4: [
   {input:"arr = {10,20,21,30,31,40,41}", expected:"Even: 4, Odd: 3"},
   {input:"arr = {1,3,5}", expected:"Even: 0, Odd: 3"},
   {input:"arr = {2,4,6}", expected:"Even: 3, Odd: 0"}
  ],
  5: [
   {input:"arr1 = {1,3,4,5,7}, arr2 = {2,3,5,6}", expected:"3"},
   {input:"arr1 = {1,2}, arr2 = {3,4}", expected:""},
   {input:"arr1 = {1,1,2}, arr2 = {1}", expected:"1"}
  ],
  8: [
   {input:"str = \"madam\"", expected:"true"},
   {input:"str = \"hello\"", expected:"false"},
   {input:"str = \"Aba\"", expected:"true"}
  ],
  13: [
   {input:"str = \"I Love Java\"", expected:"Java Love I"},
   {input:"str = \"Hello\"", expected:"Hello"}
  ],
  14: [
   {input:"str = \"Java\"", expected:"avaJ"}
  ],
  16: [
   {input:"n = 5", expected:"0 1 1 2 3"},
   {input:"n = 1", expected:"0"},
   {input:"n = 0", expected:""}
  ],
  21: [
   {input:"num = 1234", expected:"4321"},
   {input:"num = 100", expected:"1"},
   {input:"num = -123", expected:"-321"}
  ],
  22: [
   {input:"num = 121", expected:"true"},
   {input:"num = 123", expected:"false"}
  ],
  23: [
   {input:"num = 7", expected:"true"},
   {input:"num = 1", expected:"false"}
  ],
  27: [
   {input:"num = 10", expected:"1010"},
   {input:"num = 0", expected:"0"}
  ],
  32: [
   {input:"n = 5", expected:"120"},
   {input:"n = 0", expected:"1"}
  ]
};

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [idStr, tcs] of Object.entries(testCasesData)) {
    const id = parseInt(idStr);
    
    // Convert to proper examples array
    const newExamples = tcs.map(tc => `{input: '${tc.input.replace(/'/g, "\\'")}', output: '${tc.expected}'}`).join(',\n     ');
    
    // Regex to find {id: X, ... examples:[...], ...}
    const problemRegex = new RegExp(`(\\{id:\\s*${id}\\s*,[\\s\\S]*?examples:\\s*\\[)([^\\]]*?)(\\][\\s\\S]*?\\})`);
    
    if (problemRegex.test(content)) {
      content = content.replace(problemRegex, (match, prefix, oldExamples, suffix) => {
        return prefix + '\n     ' + newExamples + '\n   ' + suffix;
      });
      console.log(`Updated problem ID ${id} in ${path.basename(filePath)}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile(path.join(__dirname, 'src', 'data', 'part1.js'));
updateFile(path.join(__dirname, 'src', 'data', 'part2.js'));
updateFile(path.join(__dirname, 'src', 'data', 'part3.js'));
console.log('Update complete.');
