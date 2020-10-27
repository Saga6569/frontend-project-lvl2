import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import { fileFormat } from '../src/utils.js';
// eslint-disable-next-line no-unused-vars
import { diffCalculator, getDiffCalculator } from '../formaters/index.js';
import perserJs from '../parsers/parser.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const data1 = fileFormat(getFixturePath('fail1.json'));
const data2 = fileFormat(getFixturePath('fail2.json'));
const resultTex = perserJs(getDiffCalculator(data1, data2));
const resultJson = getDiffCalculator(data1, data2, 'json');
const resultPlain = getDiffCalculator(data1, data2, 'plain');
const resultJsonIni = jsyaml.safeLoad(readFileSync(getFixturePath('fail12Result.ini'), 'utf8'));

test('test json', () => {
  const dataJs1 = fileFormat(getFixturePath('fail1.json'));
  const dataJs2 = fileFormat(getFixturePath('fail2.json'));
  expect(perserJs(getDiffCalculator(dataJs1, dataJs2))).toEqual(resultTex);
  expect(getDiffCalculator(dataJs1, dataJs2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataJs1, dataJs2, 'plain')).toEqual(resultPlain);
});

test('test yml ', () => {
  const dataYml1 = fileFormat(getFixturePath('fail1.yml'));
  const dataYml2 = fileFormat(getFixturePath('fail2.yml'));
  expect(perserJs(getDiffCalculator(dataYml1, dataYml2))).toEqual(resultTex);
  expect(getDiffCalculator(dataYml1, dataYml2, 'json')).toEqual(resultJson);
  expect(getDiffCalculator(dataYml1, dataYml2, 'plain')).toEqual(resultPlain);
});

test('test ini ', () => {
  const dataIni1 = fileFormat(getFixturePath('fail1.ini'));
  const dataIni2 = fileFormat(getFixturePath('fail2.ini'));
  expect(perserJs(getDiffCalculator(dataIni1, dataIni2))).toEqual(resultTex);
  expect(getDiffCalculator(dataIni1, dataIni2, 'plain')).toEqual(resultPlain);
  expect(getDiffCalculator(dataIni1, dataIni2, 'json')).toEqual(resultJsonIni);
});
