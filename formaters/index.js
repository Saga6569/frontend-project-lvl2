import _ from 'lodash';
import { formater } from '../src/utils.js';
import planCalculator from './plain.js';
import differenceCalculator from './json.js';
import perserJs from '../parsers/parser.js';

const diffCalculator = {
  plain: planCalculator,
  json: differenceCalculator,
};

const getDiffCalculator = (fail1, fail2, from) => {
  const failFormat1 = formater(fail1);
  const failFormat2 = formater(fail2);
  if (!_.has(diffCalculator, from)) {
    return perserJs(differenceCalculator(failFormat1, failFormat2));
  }
  return diffCalculator[from](failFormat1, failFormat2);
};

export default getDiffCalculator;
