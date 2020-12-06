import _ from 'lodash';
import flatFormatDifferences from './formaters/plain.js';
import nestedDiffFormat from './formaters/stylish.js';
import parser from './parsers/parser.js';
import genDiff from './formaters/index.js';

const formats = {
  stylish: nestedDiffFormat,
  plain: flatFormatDifferences,
  json: JSON.stringify,
};

const getDiff = (data1, data2, format) => {
  const object = parser(data1, data2);
  const differenceTree = genDiff(object);
  if (_.has(formats, format)) {
    return formats[format](differenceTree);
  }
  return console.log('нет  такого  формата');
};

export default getDiff;
