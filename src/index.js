/* eslint-disable consistent-return */
import _ from 'lodash';
import jsyaml from 'js-yaml';
import ini from 'ini';
import flatFormatDifferences from './formaters/plain.js';
import nestedDiffFormat from './formaters/stylish.js';
import parser from './parsers/parser.js';
import genDiff from './formaters/index.js';
import { isNumber } from './utils.js';

const iniIsNumber = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    const value = _.isObject(object[key]) ? iniIsNumber(object[[key]]) : isNumber(object[key]);
    acc[key] = value;
    return acc;
  }, {});
};

const iniNode = (node) => iniIsNumber(ini.parse(node));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: iniNode,
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

const getDiff = (node1, node2, format) => {
  const formatNode1 = formatStil(node1);
  const formatNode2 = formatStil(node2);
  const object = parser(formatNode1, node1, formatNode2, node2);
  const differenceTree = genDiff(object);
  return formats[format](differenceTree);
};

export default getDiff;
