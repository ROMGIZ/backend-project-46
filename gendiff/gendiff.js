const fs = require('fs');
const path = require('path');
const _ = require('lodash'); // Предполагая, что вы используете lodash для работы с объектами.

const genDiff = (filepath1, filepath2) => {
    const file1Content = fs.readFileSync(path.resolve(filepath1), 'utf-8');
    const file2Content = fs.readFileSync(path.resolve(filepath2), 'utf-8');

    const obj1 = JSON.parse(file1Content);
    const obj2 = JSON.parse(file2Content);

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

    // На данном этапе просто возвращаем результат в простом формате.
    // В будущем, вы можете добавить разные форматы вывода, учитывая параметр `format`.
    return `{\n${diff.join('\n')}\n}`;
};

module.exports = genDiff;
