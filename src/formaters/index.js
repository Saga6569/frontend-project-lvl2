import { formater, pareserIni } from '../utils.js';
import planCalculator from './plain.js';
import formatStylish from './stylish.js';
import parser from '../parsers/parser.js';

const getDiffCalculator = (value1, value2, format) => {
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

export default getDiffCalculator;
