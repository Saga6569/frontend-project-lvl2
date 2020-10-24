import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import { differenceCalculator, fileFormat } from '../src/utils.js';
import planCalculator from '../formaters/index.js';
import perserJs from '../parsers/parser.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const data1 = fileFormat(getFixturePath('fail1.json'));
const data2 = fileFormat(getFixturePath('fail2.json'));
const resultTex = perserJs(differenceCalculator(data1, data2));
const resultJson = differenceCalculator(data1, data2);
const resultPlain = planCalculator(data1, data2);
const resultJsonIni = jsyaml.safeLoad(readFileSync(getFixturePath('fail12Result.ini'), 'utf8'));

test('test json', () => {
  const dataJs1 = fileFormat(getFixturePath('fail1.json'));
  const dataJs2 = fileFormat(getFixturePath('fail2.json'));
  expect(perserJs(differenceCalculator(dataJs1, dataJs2))).toEqual(resultTex);
  expect(differenceCalculator(dataJs1, dataJs2)).toEqual(resultJson);
  expect(planCalculator(dataJs1, dataJs2)).toEqual(resultPlain);
});

test('test yml ', () => {
  const dataYml1 = fileFormat(getFixturePath('fail1.yml'));
  const dataYml2 = fileFormat(getFixturePath('fail2.yml'));
  expect(perserJs(differenceCalculator(dataYml1, dataYml2))).toEqual(resultTex);
  expect(differenceCalculator(dataYml1, dataYml2)).toEqual(resultJson);
  expect(planCalculator(dataYml1, dataYml2)).toEqual(resultPlain);
});

test('test ini ', () => {
  const dataIni1 = fileFormat(getFixturePath('fail1.ini'));
  const dataIni2 = fileFormat(getFixturePath('fail2.ini'));
  expect(perserJs(differenceCalculator(dataIni1, dataIni2))).toEqual(resultTex);
  expect(planCalculator(dataIni1, dataIni2)).toEqual(resultPlain);
  expect(differenceCalculator(dataIni1, dataIni2)).toEqual(resultJsonIni);
});
