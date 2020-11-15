import { formater } from '../utils.js';
import planCalculator from './plain.js';
import formatStylish from './stylish.js';
import parser from '../parsers/parser.js';

const getDiffCalculator = (file1, file2, format) => {
  const failFormat1 = formater(file1);
  const failFormat2 = formater(file2);
  const tree = parser(failFormat1, failFormat2);
  console.log(tree);
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
