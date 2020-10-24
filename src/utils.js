import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const keyBattery = (jsFail1, jsFail2) => {
  const arrKeyJsf1 = Object.keys(jsFail1);
  const arrKeyJsf2 = Object.keys(jsFail2);
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
  const fail1 = fileFormat(jsFail1);
  const fail2 = fileFormat(jsFail2);
  const allKey = keyBattery(fail1, fail2).sort();
  return allKey.reduce((acc, key) => {
    if (_.isObject(fail1[key]) && _.isObject(fail2[key])) {
      acc[`  ${key}`] = { ...differenceCalculator(fail1[key], fail2[key]) };
    } else if (_.has(fail1, key) && _.has(fail2, key) && fail1[key] !== fail2[key]) {
      acc[`- ${key}`] = fail1[key];
      acc[`+ ${key}`] = fail2[key];
    } else if (!_.has(fail1, key) && _.has(fail2, key)) {
      acc[`+ ${key}`] = fail2[key];
    } else if (_.has(fail1, key) && !_.has(fail2, key)) {
      acc[`- ${key}`] = fail1[key];
    } else if (_.has(fail1, key) && _.has(fail2, key) && fail1[key] === fail2[key]) {
      acc[`  ${key}`] = fail1[key];
    }
    return acc;
  }, {});
};
