import _ from 'lodash';
import planCalculator from './src/formaters/plain.js';
import formatStylish from './src/formaters/stylish.js';
import parser from './src/parsers/parser.js';
import diff from './src/formaters/index.js';

const formats = {
  stylish: formatStylish,
  plain: planCalculator,
  json: JSON.stringify,
};

const getDiff = (data1, data2, format) => {
  const object = parser(data1, data2);
  const tree = diff(object);
  if (_.has(formats, format)) {
    return formats[format](tree);
  }
  return console.log('нет  такого  формата');
};

export default getDiff;
