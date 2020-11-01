import _ from 'lodash';
import { keyBattery } from '../utils.js';
import {
  isObjet, isСhanged, isAdd, isDeletion,
} from '../parsers/parser.js';

const planCalculator = (jsFail1, jsFail2) => {
  const iter = (fail1, fail2, acc) => {
    const allKey = keyBattery(fail1, fail2).sort();
    return allKey.reduce((result, key) => {
      acc.push(key);
      const valeu = _.isObject(fail1[key]) ? '[complex value]' : fail1[key];
      const newValue = _.isObject(fail2[key]) ? '[complex value]' : fail2[key];
      if (isObjet(fail1, fail2, key)) {
        result.push(iter(fail1[key], fail2[key], acc));
      } else if (isСhanged(fail1, fail2, key)) {
        result.push(`Property ${acc.join('.')} was updated. From ${valeu} to ${newValue}`);
      } else if (isAdd(fail1, fail2, key)) {
        result.push(`Property ${acc.join('.')} was added with value: ${newValue}`);
      } else if (isDeletion(fail1, fail2, key)) {
        result.push(`Property ${acc.join('.')} was removed`);
      }
      acc.pop();
      return result.flat();
    }, []);
  };
  return iter(jsFail1, jsFail2, []).flat();
};

export default planCalculator;
