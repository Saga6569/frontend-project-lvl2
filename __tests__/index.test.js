import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiffCalculator from '../src/formaters/index.js';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const file1 = getFixturePath('fail1.json');
const file2 = getFixturePath('fail2.json');
const resultDefault = getDiffCalculator(file1, file2);
const resultJson = getDiffCalculator(file1, file2, 'json');
const resultPlainJson = getDiffCalculator(file1, file2, 'plain');

test('test json', () => {
  const dataJs1 = getFixturePath('fail1.json');
  const dataJs2 = getFixturePath('fail2.json');
  expect(getDiffCalculator(dataJs1, dataJs2)).toEqual(resultDefault);
  expect(getDiffCalculator(dataJs1, dataJs2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataJs1, dataJs2, 'plain')).toEqual(resultPlainJson);
});

test('test yml ', () => {
  const dataYml1 = getFixturePath('fail1.yml');
  const dataYml2 = getFixturePath('fail2.yml');
  expect(getDiffCalculator(dataYml1, dataYml2)).toEqual(resultDefault);
  expect(getDiffCalculator(dataYml1, dataYml2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataYml1, dataYml2, 'plain')).toEqual(resultPlainJson);
});

test('test ini ', () => {
  const dataIni1 = getFixturePath('fail1.ini');
  const dataIni2 = getFixturePath('fail2.ini');
  expect(getDiffCalculator(dataIni1, dataIni2)).toEqual(resultDefault);
  expect(getDiffCalculator(dataIni1, dataIni2, 'plain')).toEqual(resultPlainJson);
  expect(getDiffCalculator(dataIni1, dataIni2, 'json')).toEqual(resultJson);
});
