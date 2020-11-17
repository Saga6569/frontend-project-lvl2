import { formater } from '../utils.js';
import planCalculator from './plain.js';
import formatStylish from './stylish.js';
import parser from '../parsers/parser.js';

const getDiffCalculator = (value1, value2, format) => {
  const failFormat1 = formater(value1);
  const failFormat2 = formater(value2);
  const tree = parser(failFormat1, failFormat2);
  if (format === 'plain') {
    const result = planCalculator(tree);
    return result;
  } if (format === 'json') {
    const result = JSON.stringify(tree);
    return result;
  } if (format === 'stylish') {
    const result = formatStylish(tree);
    return result;
  }
  return tree;
};

export default getDiffCalculator;
