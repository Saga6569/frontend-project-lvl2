import { formater } from '../utils.js';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import formatStylish from './stylish.js';

// eslint-disable-next-line consistent-return
const getDiffCalculator = (file1, file2, format) => {
  const failFormat1 = formater(file1);
  const failFormat2 = formater(file2);
  if (format === 'plain') {
    const result = planCalculator(failFormat1, failFormat2);
    return result;
  } if (format === 'json') {
    const result = differenceCalculator(failFormat1, failFormat2);
    return result;
  } if (format === 'stylish') {
    const result = differenceCalculator(failFormat1, failFormat2);
    return formatStylish(result);
  }
};

export default getDiffCalculator;
