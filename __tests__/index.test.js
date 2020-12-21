import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const resultStylish = readFileSync(getFixturePath('resultStylish.text'), 'utf-8');
const resultPlain = readFileSync(getFixturePath('resultPlain.text'), 'utf-8');
const resultJson = readFileSync(getFixturePath('resultJson.text'), 'utf-8');

test.each([
  'json',
  'yml',
  'ini',
])('.genDiff (%o)', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(getDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
  expect(getDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
  expect(getDiff(filepath1, filepath2, 'json')).toEqual(resultJson);
});
