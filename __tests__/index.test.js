import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const dataJs1 = getFixturePath('file1.');
const dataJs2 = getFixturePath('file2.');

const resultDefault = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
const resultJson = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
const resultPlainJson = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');

const format = { A: 'json', B: 'yml', C: 'ini' };

test.each([
  [dataJs1, dataJs2],
])('.genDiff формат JSON (%o, %o )', (a, b) => {
  expect(getDiff(a + format.A, b + format.A, 'stylish')).toEqual(resultDefault);
  expect(getDiff(a + format.A, b + format.A, 'json')).toEqual(resultJson);
  expect(getDiff(a + format.A, b + format.A, 'plain')).toEqual(resultPlainJson);
});

test.each([
  [dataJs1, dataJs2],
])('.genDiff формат YML (%o, %o )', (a, b) => {
  expect(getDiff(a + format.B, b + format.B, 'stylish')).toEqual(resultDefault);
  expect(getDiff(a + format.B, b + format.B, 'json')).toEqual(resultJson);
  expect(getDiff(a + format.B, b + format.B, 'plain')).toEqual(resultPlainJson);
});

test.each([
  [dataJs1, dataJs2],
])('.genDiff формат INI (%o, %o )', (a, b) => {
  expect(getDiff(a + format.C, b + format.C, 'stylish')).toEqual(resultDefault);
  expect(getDiff(a + format.C, b + format.C, 'json')).toEqual(resultJson);
  expect(getDiff(a + format.C, b + format.C, 'plain')).toEqual(resultPlainJson);
});
