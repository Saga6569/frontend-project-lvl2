import { formater } from '../utils.js';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import formatStylish from './stylish.js';

const getDiffCalculator = (fail1, fail2, format) => {
  const failFormat1 = formater(fail1);
  const failFormat2 = formater(fail2);
  if (format === 'plain') {
    return planCalculator(failFormat1, failFormat2);
  } if (format === 'json') {
    return differenceCalculator(failFormat1, failFormat2);
  } if (format === 'stylish') {
    return formatStylish(differenceCalculator(failFormat1, failFormat2));
  }
};

export default getDiffCalculator;
