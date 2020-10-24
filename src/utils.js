import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const keyBattery = (jsFail1, jsjsFail2) => {
  const arrKeyJsf1 = Object.keys(jsFail1);
  const arrKeyJsf2 = Object.keys(jsjsFail2);
  const arrKey = [...arrKeyJsf1, ...arrKeyJsf2];
  const keyBatterys = arrKey.reduce((acc, key) => {
    if (!acc.includes(key)) {
      acc.push(key);
    }
    return acc;
  }, []);
  return keyBatterys;
};

const format = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: ini.parse,
};

export const fileFormat = (fail) => {
  if (_.isObject(fail)) {
    return fail;
  }
  const formaters = format;
  const index = fail.lastIndexOf('.');
  const str = fail.slice(index + 1);
  if (_.has(formaters, str)) {
    const ff = formaters[str];
    return ff(readFileSync(fail, 'utf-8'));
  }
  return console.log('no format');
};

export const differenceCalculator = (jsFail1, jsFail2) => {
  const allKey = keyBattery(jsFail1, jsFail2).sort();
  return allKey.reduce((acc, key) => {
    if (_.isObject(jsFail1[key]) && _.isObject(jsFail2[key])) {
      acc[`  ${key}`] = { ...differenceCalculator(jsFail1[key], jsFail2[key]) };
    } else if (_.has(jsFail1, key) && _.has(jsFail2, key) && jsFail1[key] !== jsFail2[key]) {
      acc[`- ${key}`] = jsFail1[key];
      acc[`+ ${key}`] = jsFail2[key];
    } else if (!_.has(jsFail1, key) && _.has(jsFail2, key)) {
      acc[`+ ${key}`] = jsFail2[key];
    } else if (_.has(jsFail1, key) && !_.has(jsFail2, key)) {
      acc[`- ${key}`] = jsFail1[key];
    } else if (_.has(jsFail1, key) && _.has(jsFail2, key) && jsFail1[key] === jsFail2[key]) {
      acc[`  ${key}`] = jsFail1[key];
    }
    return acc;
  }, {});
};
