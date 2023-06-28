import path from 'path';
import createDiff from '../src/index.js';
import result from '../__fixtures__/result.js';

describe('createDiff', () => {
  it('should work with json files', () => {
    const firstFilePath = path.resolve(process.cwd(), '__fixtures__/file1.json');
    const secondFilePath = path.resolve(process.cwd(), '__fixtures__/file2.json');

    const diff = createDiff(firstFilePath, secondFilePath);

    expect(diff).toEqual(result);
  });

  it('should work with yml files', () => {
    const firstFilePath = path.resolve(process.cwd(), '__fixtures__/file1.yaml');
    const secondFilePath = path.resolve(process.cwd(), '__fixtures__/file2.yml');

    const diff = createDiff(firstFilePath, secondFilePath);

    expect(diff).toEqual(result);
  });

  it('throw a error for wrong file type', () => {
    const firstFilePath = path.resolve(process.cwd(), '__fixtures__/result.js');
    const secondFilePath = path.resolve(process.cwd(), '__fixtures__/result.js');

    expect(() => createDiff(firstFilePath, secondFilePath)).toThrow('');
  });
});
