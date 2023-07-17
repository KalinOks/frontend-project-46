import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

export default (filePath) => {
  if (filePath.toLowerCase().endsWith('.json')) {
    return JSON.parse(readFileSync(filePath));
  }

  if (filePath.toLowerCase().endsWith('.yml') || filePath.toLowerCase().endsWith('.yaml')) {
    return yaml.load(readFileSync(filePath));
  }

  throw new Error('wrong file type');
};
