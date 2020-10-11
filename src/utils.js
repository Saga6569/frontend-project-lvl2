#!/usr/bin/env node

import { readFileSync } from 'fs';
import pkg from 'js-yaml';
import pkg1 from 'ini'
import  perserJs from '../parsers/parser.js'; 
const { safeLoad } = pkg;
const { parse } = pkg1;
import pkg2 from 'lodash';
const { isObject } = pkg2;

export const keyBattery = (jsFail1, jsFail2) => {
  const allKey = [];
  const arrKeyJsf1 = Object.keys(jsFail1)
  const arrKeyJsf2 = Object.keys(jsFail2)
  const arrKey = [...arrKeyJsf1, ...arrKeyJsf2];
  for (const key of arrKey) {
    if (!allKey.includes(key)) {
      allKey.push(key);
    }
  }
  return allKey;
};

export const differenceCalculator = (jsFail1, jsFail2) => {
  const fail1 = fileFormat(jsFail1);
  const fail2 = fileFormat(jsFail2);
  const result = {};
  const allKey = keyBattery(fail1, fail2).sort();
  for (const key of allKey) {
    if (isObject(fail1[key]) && isObject(fail2[key])) {
      result[`  ${key}`] = {...differenceCalculator(fail1[key], fail2[key])}
    } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] !== fail2[key]) {
      result[`- ${key}`] = fail1[key];
      result[`+ ${key}`] = fail2[key];
    } else if (!fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
      result[`+ ${key}`] = fail2[key];
    } else if (fail1.hasOwnProperty(key) && !fail2.hasOwnProperty(key)) {
      result[`- ${key}`] = fail1[key];
    } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] === fail2[key]) {
      result[`  ${key}`] = fail1[key];
    }
  }
  return result;
}

export const fileFormat = (fail) => {
  if (isObject(fail)) {
    return fail;
  } else if (fail.includes('.yml')) {
    return safeLoad(readFileSync(fail, 'utf8'))
  } else if (fail.includes('.json')) {
    return safeLoad(readFileSync(fail, 'utf8')) 
  } else if (fail.includes('.ini')) {
    return parse(readFileSync(fail, 'utf-8'))
  }
};

