import path from 'path';
import createDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

test('createDiff', () => {
  const firstFilePath = path.resolve(process.cwd(), '__fixtures__/file1.json');
  const secondFilePath = path.resolve(process.cwd(), '__fixtures__/file2.json');

  const diff = createDiff(firstFilePath, secondFilePath);

  expect(diff).toEqual(result);
});
