import parseToObject from './parser/parser.js';
import { createObjectsDiff } from './diff.js';
import { plain, json } from './formaters/index.js';

const types = {
  json: 'json',
  plain: 'plain',
}

export default (filePath1, filePath2, type = types.json) => {
  const firstFile = parseToObject(filePath1);
  const secondFile = parseToObject(filePath2);

  const formatter = type === types.json ? json : plain;
  return formatter(createObjectsDiff(firstFile, secondFile));
};
