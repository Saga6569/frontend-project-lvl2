import _ from 'lodash';
import { keyBattery } from '../src/utils.js';

const planCalculator = (jsFail1, jsFail2) => {
  const iter = (fail1, fail2, acc) => {
    const allKey = keyBattery(fail1, fail2).sort();
    return allKey.reduce((result, key) => {
      const put = [...acc];
      put.push(key);
      const valeu = _.isObject(fail1[key]) ? '[complex value]' : fail1[key];
      const newValue = _.isObject(fail2[key]) ? '[complex value]' : fail2[key];
      if (_.isObject(fail1[key]) && _.isObject(fail2[key])) {
        acc.push(key);
        result.push(iter(fail1[key], fail2[key], acc));
        acc.pop();
      } else if (_.has(fail1, key) && _.has(fail2, key) && fail1[key] !== fail2[key]) {
        result.push(`Property ${put.join('.')} was updated. From ${valeu} to ${newValue}`);
      } else if (!_.has(fail1, key) && _.has(fail2, key)) {
        result.push(`Property ${put.join('.')} was added with value: ${newValue}`);
      } else if (_.has(fail1, key) && !_.has(fail2, key)) {
        result.push(`Property ${put.join('.')} was removed`);
      }
      return result.flat();
    }, []);
  };
  return iter(jsFail1, jsFail2, []).flat();
};

export default planCalculator;
