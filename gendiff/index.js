#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const commander = require('commander');
const _ = require('lodash');

function parseJsonFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

function getAbsolutePath(filePath) {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

function genDiff(filePath1, filePath2) {
  const absolutePath1 = getAbsolutePath(filePath1);
  const absolutePath2 = getAbsolutePath(filePath2);

  const obj1 = parseJsonFile(absolutePath1);
  const obj2 = parseJsonFile(absolutePath2);

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.reduce((result, key) => {
    if (!_.isEqual(obj1[key], obj2[key])) {
      if (_.has(obj1, key)) {
        result.push(`- ${key}: ${JSON.stringify(obj1[key])}`);
      }
      if (_.has(obj2, key)) {
        result.push(`+ ${key}: ${JSON.stringify(obj2[key])}`);
      }
    }
    return result;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
}

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const result = genDiff(filePath1, filePath2);
    console.log(result);
  })
  .parse(process.argv);

if (!commander.args.length) {
  commander.outputHelp();
}
























// #!/usr/bin/env node

// // Импортирование необходимых модулей
// const fs = require('fs');
// const path = require('path');
// const commander = require('commander');
// const _ = require('lodash');

// // Функция для чтения и парсинга JSON-файла
// function parseJsonFile(filePath) {
//   // Чтение содержимого файла
//   const fileContent = fs.readFileSync(filePath, 'utf-8');
//   // Возврат объекта, полученного из JSON-файла
//   return JSON.parse(fileContent);
// }

// // Функция для получения абсолютного пути к файлу
// function getAbsolutePath(filePath) {
//   // Проверка, является ли путь абсолютным. Если нет, преобразование его в абсолютный
//   return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
// }

// // Конфигурация CLI-утилиты с помощью библиотеки commander
// commander
//   .version('1.0.0')
//   .description('Compares two configuration files and shows a difference.')
//   .arguments('<filepath1> <filepath2>')
//   .option('-f, --format <type>', 'output format', 'text')
//   // Действие, выполняемое при вызове утилиты
//   .action((filePath1, filePath2) => {
//     // Получение абсолютных путей к файлам
//     const absolutePath1 = getAbsolutePath(filePath1);
//     const absolutePath2 = getAbsolutePath(filePath2);

//     // Парсинг JSON-файлов
//     const obj1 = parseJsonFile(absolutePath1);
//     const obj2 = parseJsonFile(absolutePath2);

//     // Получение объединенного списка ключей из двух объектов
//     const keys = _.union(_.keys(obj1), _.keys(obj2));
//     // Сортировка ключей
//     const sortedKeys = _.sortBy(keys);

//     // Вычисление различий между двумя объектами
//     const diff = sortedKeys.reduce((result, key) => {
//       // Сравнение значений по каждому ключу
//       if (_.isEqual(obj1[key], obj2[key])) {
//         result[`  ${key}`] = obj1[key];
//       } else if (_.has(obj1, key) && _.has(obj2, key)) {
//         result[`- ${key}`] = obj1[key];
//         result[`+ ${key}`] = obj2[key];
//       } else if (_.has(obj1, key)) {
//         result[`- ${key}`] = obj1[key];
//       } else {
//         result[`+ ${key}`] = obj2[key];
//       }
//       return result;
//     }, {});

//     // Форматирование результатов сравнения для вывода
//     const formattedDiff = `{\n${_.map(diff, (value, key) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n}`;
//     console.log(formattedDiff);
//   });

// commander.parse(process.argv);

// if (!commander.args.length) {
//   commander.outputHelp();
// }



