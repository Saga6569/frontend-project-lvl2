import _ from 'lodash';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import perserJs from '../parsers/parser.js';

const diffCalculator = {
  plain: planCalculator,
  json: differenceCalculator,
};

const getDiffCalculator = (fail1, fail2, from) => {
  if (!_.has(diffCalculator, from)) {
    return perserJs(differenceCalculator(fail1, fail2));
  }
  return diffCalculator[from](fail1, fail2);
};

export default getDiffCalculator;
