/* eslint-disable consistent-return */
import _ from 'lodash';
import jsyaml from 'js-yaml';
import ini from 'ini';
import flatFormatDifferences from './formaters/plain.js';
import nestedDiffFormat from './formaters/stylish.js';
import parser from './parsers/parser.js';
import genDiff from './formaters/index.js';
import { isNumber } from './utils.js';

const dataDiffTreeIni = (node) => {
  const keys = Object.keys(node);
  return keys.reduce((acc, key) => {
    const value = _.isObject(node[key]) ? dataDiffTreeIni(node) : isNumber(node[key]);
    acc[key] = value;
    return acc;
  }, {});
};

const Ini = (data) => dataDiffTreeIni(ini.parse(data));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: Ini,
};

const dataFormat = (data) => data.slice(data.lastIndexOf('.') + 1);

const formatStil = (data) => {
  const format = dataFormat(data);
  const result = parsers[format];
  return result;
};

const formats = {
  stylish: nestedDiffFormat,
  plain: flatFormatDifferences,
  json: JSON.stringify,
};

const getDiff = (data1, data2, format) => {
  const formatData1 = formatStil(data1);
  const formatData2 = formatStil(data2);
  const object = parser(formatData1, data1, formatData2, data2);
  const differenceTree = genDiff(object);
  if (_.has(formats, format)) {
    return formats[format](differenceTree);
  }
};

export default getDiff;
