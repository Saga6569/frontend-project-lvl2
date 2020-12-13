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
  [dataJs1, dataJs2, 'stylish', resultDefault],
  [dataJs1, dataJs2, 'json', resultJson],
  [dataJs1, dataJs2, 'plain', resultPlainJson],
  [dataYml1, dataYml2, 'stylish', resultDefault],
  [dataYml1, dataYml2, 'json', resultJson],
  [dataYml1, dataYml2, 'plain', resultPlainJson],
  [dataIni1, dataIni2, 'stylish', resultDefault],
  [dataIni1, dataIni2, 'json', resultJson],
  [dataIni1, dataIni2, 'plain', resultPlainJson],
])('.genDiff(%o, %o, %s)', (a, b, c, result) => {
  expect(getDiff(a, b, c)).toEqual(result);
});
