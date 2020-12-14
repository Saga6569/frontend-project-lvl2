import { readFileSync } from 'fs';
import parser from './parsers/parser.js';
import genDiff from './genDiff.js';
import nodeOutputFormat from './outputFormatter.js';

const getDataFormat = (str) => str.slice(str.lastIndexOf('.') + 1);
const readingData = (str) => readFileSync(str, 'utf-8');

const getDiff = (str1, str2, format) => {
  const formatStr1 = getDataFormat(str1);
  const formatStr2 = getDataFormat(str2);
  const data1 = parser((str1, formatStr1))(readingData(str1));
  const data2 = parser((str1, formatStr2))(readingData(str2));
  const object = { data1, data2 };
  const differenceTree = genDiff(object);
  const result = nodeOutputFormat(format)(differenceTree);
  return result;
};

export default getDiff;
