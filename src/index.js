import { readFileSync } from 'node:fs';
import _ from 'lodash';

export default (filePath1, filePath2) => {
  const obj1 = JSON.parse(readFileSync(filePath1));
  const obj2 = JSON.parse(readFileSync(filePath2));

  const keys1 = _.orderBy(Object.keys(obj1), (key) => key, ['asc']);
  const keys2 = _.orderBy(Object.keys(obj2), (key) => key, ['asc']);
  var test = 23;
  const firstFileChanges = keys1.reduce((acc, key) => {
    if (!keys2.includes(key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj1[key] === obj2[key]) {
      acc[`  ${key}`] = obj1[key];
    } else {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    }
    return acc;
  }, {});

  const secondFileChanges = _.filter(keys2, (key) => !keys1.includes(key)).reduce((acc, key) => {
    acc[`+ ${key}`] = obj2[key];
    return acc;
  }, {});

  const allChanges = { ...firstFileChanges, ...secondFileChanges };

  return `{\n${Object.entries(allChanges).map(([key, value]) => `    ${key}: ${value}`).join('\n')}\n}`;
};
