#!/usr/bin/env node
const { program } = require('commander');
const genDiff = require('./gendiff');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'Output format')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

if (require.main === module) {
    program.parse(process.argv);
}

module.exports = program; // Экспорт для возможных тестов или дополнительных импортов.
