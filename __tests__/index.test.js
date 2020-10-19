#!/usr/bin/env node
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import { differenceCalculator } from '../src/utils.js';
import planCalculator from '../formaters/index.js';
import perserJs from '../parsers/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

const data1 = getFixturePath('fail1.json')
const data2 = getFixturePath('fail2.json')
const resultTex = perserJs(differenceCalculator(data1, data2));
const resultJson = differenceCalculator(data1, data2)
const resultPlain = planCalculator(data1, data2)
const resultJsonIni = jsyaml.safeLoad(readFileSync(getFixturePath('fail12Result.ini'), 'utf8'))

test('test json', () => {
  const data1 = getFixturePath('fail1.json');
  const data2 = getFixturePath('fail2.json');
  expect(perserJs(differenceCalculator(data1, data2))).toEqual(resultTex);
  expect(differenceCalculator(data1, data2)).toEqual(resultJson);
  expect(planCalculator(data1, data2)).toEqual(resultPlain);
});

test('test yml ', () => {
  const data1 = getFixturePath('fail1.yml');
  const data2 = getFixturePath('fail2.yml');
  expect(perserJs(differenceCalculator(data1, data2))).toEqual(resultTex);
  expect(differenceCalculator(data1, data2)).toEqual(resultJson);
  expect(planCalculator(data1, data2)).toEqual(resultPlain);
});

test('test ini ', () => {
  const data1 = getFixturePath('fail1.ini');
  const data2 = getFixturePath('fail2.ini');
  expect(perserJs(differenceCalculator(data1, data2))).toEqual(resultTex);
  expect(planCalculator(data1, data2)).toEqual(resultPlain);
  expect(differenceCalculator(data1, data2)).toEqual(resultJsonIni);
});
