#!/usr/bin/env node

import { readFileSync } from 'fs';
import pkg from 'js-yaml';

const { safeLoad } = pkg;

export const keyBattery = (jsFail1, jsFail2) => {
  const allKey = [];
  const arrKeyJsf1 = Object.keys(jsFail1).sort();
  const arrKeyJsf2 = Object.keys(jsFail2).sort();
  const arrKey = [...arrKeyJsf1, ...arrKeyJsf2];
  for (const key of arrKey) {
    if (!allKey.includes(key)) {
      allKey.push(key);
    }
  }
  return allKey;
};

export const differenceCalculator = (jsFail1, jsFail2) => {
  const result = {};
  const allKey = keyBattery(jsFail1, jsFail2);
  for (const key of allKey) {
      if (jsFail1[key] === jsFail2[key]) {
          result[`  ${key}`] = jsFail1[key];
      } else if (jsFail1.hasOwnProperty(key) && jsFail2.hasOwnProperty(key)) {
          result[`+ ${key}`] = jsFail1[key];
          result[`- ${key}`] = jsFail2[key];
      } else if (jsFail1.hasOwnProperty(key) && !jsFail2.hasOwnProperty(key)) {
          result[`- ${key}`] = jsFail1[key];
      } else if (!jsFail1.hasOwnProperty(key) && jsFail2.hasOwnProperty(key)) {
          result[`+ ${key}`] = jsFail2[key];
      }
  }
  return result;
};

export const ymlInJson = (fail) => {
  const doc = safeLoad(readFileSync(fail, 'utf8'));
  return doc;
};

