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
