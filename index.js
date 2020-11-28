import _ from 'lodash';
import flatFormatDifferences from './src/formaters/plain.js';
import nestedDiffFormat from './src/formaters/stylish.js';
import parser from './src/parsers/parser.js';
import diff from './src/formaters/index.js';

const formats = {
  stylish: nestedDiffFormat,
  plain: flatFormatDifferences,
  json: JSON.stringify,
};

const getDiff = (data1, data2, format) => {
  const object = parser(data1, data2);
  const differenceTree = diff(object);
  if (_.has(formats, format)) {
    return formats[format](differenceTree);
  }
  return console.log('нет  такого  формата');
};

export default getDiff;
