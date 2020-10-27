import _ from 'lodash';
import { keyBattery } from '../src/utils.js';

const differenceCalculator = (jsFail1, jsFail2) => {
  const allKey = keyBattery(jsFail1, jsFail2).sort();
  return allKey.reduce((acc, key) => {
    if (_.isObject(jsFail1[key]) && _.isObject(jsFail2[key])) {
      acc[`  ${key}`] = { ...differenceCalculator(jsFail1[key], jsFail2[key]) };
    } else if (_.has(jsFail1, key) && _.has(jsFail2, key) && jsFail1[key] !== jsFail2[key]) {
      acc[`- ${key}`] = jsFail1[key];
      acc[`+ ${key}`] = jsFail2[key];
    } else if (!_.has(jsFail1, key) && _.has(jsFail2, key)) {
      acc[`+ ${key}`] = jsFail2[key];
    } else if (_.has(jsFail1, key) && !_.has(jsFail2, key)) {
      acc[`- ${key}`] = jsFail1[key];
    } else if (_.has(jsFail1, key) && _.has(jsFail2, key) && jsFail1[key] === jsFail2[key]) {
      acc[`  ${key}`] = jsFail1[key];
    }
    return acc;
  }, {});
};

export default differenceCalculator;
