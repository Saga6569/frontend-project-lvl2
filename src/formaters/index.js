import { formater } from '../utils.js';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import formatStylish from './stylish.js';

const diffCalculator = {
  plain: planCalculator,
  json: differenceCalculator,
  stylish: formatStylish,
};

const getDiffCalculator = (fail1, fail2, from) => {
  const failFormat1 = formater(fail1);
  const failFormat2 = formater(fail2);
  return diffCalculator[from](failFormat1, failFormat2);
};

export default getDiffCalculator;
