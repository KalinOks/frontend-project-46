import parseToObject from './parser/parser.js';
import parseToString from './parser/stylish.js';
import { createObjectsDiff } from './diff.js';

export default (filePath1, filePath2) => {
  const firstFile = parseToObject(filePath1);
  const secondFile = parseToObject(filePath2);

  return parseToString(createObjectsDiff(firstFile, secondFile));
};
