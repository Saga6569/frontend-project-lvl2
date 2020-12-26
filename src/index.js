import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers/parser.js';
import genDiff from './genDiff.js';
import format from './formaters/index.js';

const getContent = (fullPath) => readFileSync(fullPath, 'utf-8');

const getFullPath = (path) => resolve(process.cwd(), path);

const getDataFormat = (data) => extname(data).slice(1);

const getDiff = (path1, path2, formatName = 'stylish') => {
  const content1 = getContent(getFullPath(path1));
  const content2 = getContent(getFullPath(path2));
  const data1 = parse(content1, getDataFormat(path1));
  const data2 = parse(content2, getDataFormat(path2));
  const differenceTree = genDiff(data1, data2);
  return format(differenceTree, formatName);
};

export default getDiff;
