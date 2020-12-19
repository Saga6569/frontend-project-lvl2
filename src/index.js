import { readFileSync } from 'fs';
import parser from './parsers/parser.js';
import genDiff from './genDiff.js';
import nodeOutputFormat from './formaters/outputFormatter.js';

const getDataFormat = (str) => str.slice(str.lastIndexOf('.') + 1);
const readingData = (str) => readFileSync(str, 'utf-8');

const getDiff = (stringPathToData1, stringPathToData2, format) => {
  const data1 = parser(getDataFormat(stringPathToData1), readingData(stringPathToData1));
  const data2 = parser(getDataFormat(stringPathToData2), readingData(stringPathToData2));
  const differenceTree = genDiff(data1, data2);
  return nodeOutputFormat(differenceTree, format);
};

export default getDiff;
