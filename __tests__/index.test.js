import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const dataJs1 = getFixturePath('file1.json');
const dataJs2 = getFixturePath('file2.json');
const dataYml1 = getFixturePath('file1.yml');
const dataYml2 = getFixturePath('file2.yml');
const dataIni1 = getFixturePath('file1.ini');
const dataIni2 = getFixturePath('file2.ini');

const resultDefault = getDiff(dataJs1, dataJs2, 'stylish');
const resultJson = getDiff(dataJs1, dataJs2, 'json');
const resultPlainJson = getDiff(dataJs1, dataJs2, 'plain');

test.each([
  [dataJs1, dataJs2],
  [dataYml1, dataYml2],
  [dataIni1, dataIni2],
])('.genDiff(%o, %o )', (a, b) => {
  expect(getDiff(a, b, 'stylish')).toEqual(resultDefault);
  expect(getDiff(a, b, 'json')).toEqual(resultJson);
  expect(getDiff(a, b, 'plain')).toEqual(resultPlainJson);
});
