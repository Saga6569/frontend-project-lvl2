import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const keyBattery = (Fail1, Fail2) => {
  const arrKeyFail1 = Object.keys(Fail1);
  const arrKeyFail2 = Object.keys(Fail2);
  const arrKeyFails = [...arrKeyFail1, ...arrKeyFail2];
  const arrKey = arrKeyFails.reduce((acc, key) => {
    if (!acc.includes(key)) {
      acc.push(key);
    }
    return acc;
  }, []);
  return arrKey;
};

const formats = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: ini.parse,
};

export const formater = (fail) => {
  const index = fail.lastIndexOf('.');
  const format = fail.slice(index + 1);
  if (_.has(formats, format)) {
    return formats[format](readFileSync(fail, 'utf-8'));
  }
  return console.log('no format');
};
