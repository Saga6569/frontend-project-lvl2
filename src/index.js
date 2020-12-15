import { readFileSync } from 'fs';
import parser from './parsers/parser.js';
import genDiff from './genDiff.js';
import nodeOutputFormat from './outputFormatter.js';

const getDataFormat = (str) => str.slice(str.lastIndexOf('.') + 1);
const readingData = (str) => readFileSync(str, 'utf-8');

const getDiff = (str1, str2, format) => {
  const data1 = parser(getDataFormat(str1), readingData(str1));
  const data2 = parser(getDataFormat(str2), readingData(str2));
  const differenceTree = genDiff({ data1, data2 });
  return nodeOutputFormat(format, differenceTree);
};

export default getDiff;
