import parseToObject from './parser/parser.js';
import { createObjectsDiff } from './diff.js';
import { plain, stylish } from './formaters/index.js';

const types = {
  stylish: 'stylish',
  plain: 'plain',
}

export default (filePath1, filePath2, type = types.stylish) => {
  const firstFile = parseToObject(filePath1);
  const secondFile = parseToObject(filePath2);

  const formatter = type === types.stylish ? stylish : plain;
  return formatter(createObjectsDiff(firstFile, secondFile));
};
