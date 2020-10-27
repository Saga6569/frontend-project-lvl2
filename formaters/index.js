import _ from 'lodash';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';

export const diffCalculator = {
  plain: planCalculator,
  json: differenceCalculator,
};

export const getDiffCalculator = (fail1, fail2, from = 'json') => {
  if (!_.has(diffCalculator, from)) {
    console.log('что то  пошло не так');
  }
  return diffCalculator[from](fail1, fail2);
};
