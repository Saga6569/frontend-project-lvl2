import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const file1 = getFixturePath('fail1.json');
const file2 = getFixturePath('fail2.json');
const resultDefault = getDiff(file1, file2, 'stylish');
const resultJson = getDiff(file1, file2, 'json');
const resultPlainJson = getDiff(file1, file2, 'plain');

test('test json', () => {
  const dataJs1 = getFixturePath('fail1.json');
  const dataJs2 = getFixturePath('fail2.json');
  expect(getDiff(dataJs1, dataJs2, 'stylish')).toEqual(resultDefault);
  expect(getDiff(dataJs1, dataJs2, 'json')).toEqual(resultJson);
  expect(getDiff(dataJs1, dataJs2, 'plain')).toEqual(resultPlainJson);
});

test('test yml ', () => {
  const dataYml1 = getFixturePath('fail1.yml');
  const dataYml2 = getFixturePath('fail2.yml');
  expect(getDiff(dataYml1, dataYml2, 'stylish')).toEqual(resultDefault);
  expect(getDiff(dataYml1, dataYml2, 'json')).toEqual(resultJson);
  expect(getDiff(dataYml1, dataYml2, 'plain')).toEqual(resultPlainJson);
});

test('test ini ', () => {
  const dataIni1 = getFixturePath('fail1.ini');
  const dataIni2 = getFixturePath('fail2.ini');
  expect(getDiff(dataIni1, dataIni2, 'stylish')).toEqual(resultDefault);
  expect(getDiff(dataIni1, dataIni2, 'json')).toEqual(resultJson);
  expect(getDiff(dataIni1, dataIni2, 'plain')).toEqual(resultPlainJson);
});
