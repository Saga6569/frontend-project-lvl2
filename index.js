import formater from './src/formaters/index.js';
import { pareserIni } from './src/utils.js';
import planCalculator from './src/formaters/plain.js';
import formatStylish from './src/formaters/stylish.js';
import parser from './src/parsers/parser.js';

const getDiff = (value1, value2, format) => {
  const value1Format = formater(value1);
  const value2Format = formater(value2);
  const tree = parser(value1Format, value2Format);
  const nowTree = value1.includes('.ini') || value2.includes('.ini') ? pareserIni(tree) : tree;
  if (format === 'plain') {
    return planCalculator(nowTree);
  } if (format === 'json') {
    return JSON.stringify(nowTree);
  } if (format === 'stylish') {
    return formatStylish(nowTree);
  }
  const str = 'no format';
  return str;
};

export default getDiff;
