import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: ini.parse,
};

const dataFormat = (data) => data.slice(data.lastIndexOf('.') + 1);

const formatStil = (data) => {
  const format = dataFormat(data);
  return parsers[format](readFileSync(data, 'utf-8'));
};

const parser = (data1, data2) => {
  const object1 = formatStil(data1);
  const object2 = formatStil(data2);
  if (dataFormat(data1) === 'ini' || dataFormat(data2) === 'ini') {
    return { data1: object1, data2: object2, conditions: 'ini' };
  }
  return { data1: object1, data2: object2 };
};

export default parser;
