import { mkdir } from '@hexlet/immutable-fs-trees';
import { formater } from '../utils.js';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import formatStylish from './stylish.js';
import parser from '../parsers/parser.js';

const getDiffCalculator = (file1, file2, format) => {
  const failFormat1 = formater(file1);
  const failFormat2 = formater(file2);
  const tree = mkdir('/', parser(failFormat1, failFormat2));
  if (format === 'plain') {
    const result = planCalculator(tree);
    return result;
  } if (format === 'json') {
    const result = differenceCalculator(tree);
    return result;
  } if (format === 'stylish') {
    const result = differenceCalculator(tree);
    return formatStylish(result);
  }
  return tree;
};

export default getDiffCalculator;
