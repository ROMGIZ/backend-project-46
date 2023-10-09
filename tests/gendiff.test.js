// const genDiff = require('../gendiff');

// const fs = require('fs');
// const path = require('path');

// // Вспомогательная функция для чтения файлов
// const readFile = (filename) => {
//   const filepath = path.join(__dirname, '__fixtures__', filename);
//   return fs.readFileSync(filepath, 'utf-8');
// };

// test('compare two flat JSON files', () => {
//   const beforeJSON = readFile('before.json');
//   const afterJSON = readFile('after.json');

//   const expectedDiff = '{\n' + 
//                        '- key1: "value1"\n' + 
//                        '+ key1: "new_value1"\n' + 
//                        '+ key3: "value3"\n' + 
//                        '- key2: "value2"\n' +
//                        '}';

//   expect(genDiff(beforeJSON, afterJSON)).toBe(expectedDiff);
// });

const genDiff = require('../gendiff/gendiff');
const path = require('path');
const {test, expect} = require('jest')

test('compare two flat JSON files', () => {
  const beforePath = path.join(__dirname, '__fixtures__', 'before.json');
  const afterPath = path.join(__dirname, '__fixtures__', 'after.json');

  const expectedDiff = '{\n' + 
                     '- age: 25\n' + 
                     '+ age: 26\n' + 
                     '- isStudent: true\n' + 
                     '+ isStudent: false\n' +
                     '- name: "John"\n' +
                     '+ name: "John Doe"\n' +
                     '}';


  expect(genDiff(beforePath, afterPath)).toBe(expectedDiff);
});


