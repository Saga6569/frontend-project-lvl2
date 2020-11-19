/* eslint-disable no-param-reassign */
import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

export const keyBattery = (file1, file2) => {
  const arrKeyFile1 = Object.keys(file1);
  const arrKeyFile2 = Object.keys(file2);
  const arrKeyFiles = [...arrKeyFile1, ...arrKeyFile2];
  const arrKey = arrKeyFiles.reduce((acc, key) => {
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

export const formater = (file) => {
  const index = file.lastIndexOf('.');
  const format = file.slice(index + 1);
  if (_.has(formats, format)) {
    return formats[format](readFileSync(file, 'utf-8'));
  }
  return console.log('no format');
};

export const keys = (data) => (data.length === 2 ? data[0] : Object.keys(Object.values(data)[0]));

export const arrData = (data) => Object.values(Object.values(data)[0]).flat();

export const isNumber = (value) => {
  if (value % 1 === 0 && Number(value) !== 0) {
    return true;
  }
  return false;
};

export const parserIni = (tree) => {
  const result = tree.reduce((acc, child) => {
    if (Array.isArray(child)) {
      console.log(child);
      acc.push(parserIni(child));
    }
    return acc;
  }, []);
  return result;
};

const isNumeric = (value) => {
  if (value % 1 === 0 && Number(value) !== 0 && value !== true) {
    return Number(value);
  }
  return value;
};

export const pareserIni = (tree) => {
  const arr = tree.reduce((result, child) => {
    const { type, children } = child;
    if (type === 'nested') {
      result.push(pareserIni(children));
    } if (type === 'updated') {
      child.value = isNumeric(child.value);
      child.newValue = isNumeric(child.newValue);
      result.push(child);
    } else {
      child.value = isNumeric(child.value);
      result.push(child);
    }
    return result.flat();
  }, []);
  return arr;
};
