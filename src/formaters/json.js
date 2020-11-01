import { keyBattery } from '../utils.js';
import {
  isObjet, isСhanged, isAdd, isDeletion,
} from '../parsers/parser.js';

const differenceCalculator = (jsFail1, jsFail2) => {
  const arrKeyfile = keyBattery(jsFail1, jsFail2).sort();
  return arrKeyfile.reduce((acc, key) => {
    if (isObjet(jsFail1, jsFail2, key)) {
      acc[`  ${key}`] = { ...differenceCalculator(jsFail1[key], jsFail2[key]) };
    } else if (isСhanged(jsFail1, jsFail2, key)) {
      acc[`- ${key}`] = jsFail1[key];
      acc[`+ ${key}`] = jsFail2[key];
    } else if (isAdd(jsFail1, jsFail2, key)) {
      acc[`+ ${key}`] = jsFail2[key];
    } else if (isDeletion(jsFail1, jsFail2, key)) {
      acc[`- ${key}`] = jsFail1[key];
    } else {
      acc[`  ${key}`] = jsFail1[key];
    }
    return acc;
  }, {});
};

export default differenceCalculator;
