#!/usr/bin/env node
import { readFileSync } from 'fs';
import pkg from 'js-yaml';
import  perserJs from '../parsers/parser.js'; 
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
  const fail1 = safeLoad(readFileSync(jsFail1, 'utf8'));
  const fail2 = safeLoad(readFileSync(jsFail2, 'utf8'));
  const result = {};
  const allKey = keyBattery(fail1, fail2);
  for (const key of allKey) {
    console.log()
      if (fail1[key] === fail2[key]) {
          result[`  ${key}`] = fail1[key];
      } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
          result[`+ ${key}`] = fail1[key];
          result[`- ${key}`] = fail2[key];
      } else if (fail1.hasOwnProperty(key) && !fail2.hasOwnProperty(key)) {
          result[`- ${key}`] = fail1[key];
      } else if (!fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
          result[`+ ${key}`] = fail2[key];
      }
  }
  console.log(result)
  return perserJs(result);
};

export const ymlInJson = (fail) => {
  const doc = safeLoad(readFileSync(fail, 'utf8'));
  return doc;
};

