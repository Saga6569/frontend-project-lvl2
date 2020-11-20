/* eslint-disable no-param-reassign */
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const keyBattery = (Vakue1, value2) => {
  const arrKeyValue1 = Object.keys(Vakue1);
  const arrKeyValue2 = Object.keys(value2);
  const arrKeyValues = [...arrKeyValue1, ...arrKeyValue2];
  const arrKey = arrKeyValues.reduce((acc, key) => {
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

export const formater = (data) => {
  const index = data.lastIndexOf('.');
  const format = data.slice(index + 1);
  if (_.has(formats, format)) {
    return formats[format](readFileSync(data, 'utf-8'));
  }
  return console.log('no format');
};

const isNumber = (value) => {
  if (value % 1 === 0 && Number(value) !== 0 && value !== true) {
    return Number(value);
  }
  return value;
};

export const pareserIni = (tree) => tree.reduce((result, child) => {
  const { type, children } = child;
  if (type === 'nested') {
    result.push(pareserIni(children));
  } else if (type === 'updated') {
    child.value = isNumber(child.value);
    child.newValue = isNumber(child.newValue);
    result.push(child);
  } else {
    child.value = isNumber(child.value);
    result.push(child);
  }
  return result.flat();
}, []);
