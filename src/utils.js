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

export const format = {
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
