import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import { formater } from '../src/utils.js';
import getDiffCalculator from '../formaters/index.js';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const data1 = formater(getFixturePath('fail1.json'));
const data2 = formater(getFixturePath('fail2.json'));
const resultTex = getDiffCalculator(data1, data2);
const resultJson = getDiffCalculator(data1, data2, 'json');
const resultPlain = getDiffCalculator(data1, data2, 'plain');
const resultJsonIni = jsyaml.safeLoad(readFileSync(getFixturePath('fail12Result.ini'), 'utf8'));

test('test json', () => {
  const dataJs1 = formater(getFixturePath('fail1.json'));
  const dataJs2 = formater(getFixturePath('fail2.json'));
  expect(getDiffCalculator(dataJs1, dataJs2)).toEqual(resultTex);
  expect(getDiffCalculator(dataJs1, dataJs2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataJs1, dataJs2, 'plain')).toEqual(resultPlain);
});

test('test yml ', () => {
  const dataYml1 = formater(getFixturePath('fail1.yml'));
  const dataYml2 = formater(getFixturePath('fail2.yml'));
  expect(getDiffCalculator(dataYml1, dataYml2)).toEqual(resultTex);
  expect(getDiffCalculator(dataYml1, dataYml2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataYml1, dataYml2, 'plain')).toEqual(resultPlain);
});

test('test ini ', () => {
  const dataIni1 = formater(getFixturePath('fail1.ini'));
  const dataIni2 = formater(getFixturePath('fail2.ini'));
  expect(getDiffCalculator(dataIni1, dataIni2)).toEqual(resultTex);
  expect(getDiffCalculator(dataIni1, dataIni2, 'plain')).toEqual(resultPlain);
  expect(getDiffCalculator(dataIni1, dataIni2, 'json')).toEqual(resultJsonIni);
});
