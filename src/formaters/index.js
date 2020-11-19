import { formater, pareserIni } from '../utils.js';
import planCalculator from './plain.js';
import formatStylish from './stylish.js';
import parser from '../parsers/parser.js';

const getDiffCalculator = (value1, value2, format) => {
  const failFormat1 = formater(value1);
  const failFormat2 = formater(value2);
  const tree = parser(failFormat1, failFormat2);
  const novTree = value1.includes('.ini') || value1.includes('.ini') ? pareserIni(tree) : tree;
  if (format === 'plain') {
    const result = planCalculator(novTree);
    return result;
  } if (format === 'json') {
    const result = JSON.stringify(novTree);
    return result;
  } if (format === 'stylish') {
    const result = formatStylish(novTree);
    return result;
  }
  const str = 'no format';
  return str;
};

export default getDiffCalculator;
