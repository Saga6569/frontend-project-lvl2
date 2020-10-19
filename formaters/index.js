#!/usr/bin/env node

import pkg2 from 'lodash';
const { isObject } = pkg2;
import { fileFormat, keyBattery } from '../src/utils.js'; 

const planCalculator = (jsFail1, jsFail2) => {
    const iter = (jsFail1, jsFail2, acc) => {
    const fail1 = fileFormat(jsFail1);
    const fail2 = fileFormat(jsFail2);
    const result = [];
    const allKey = keyBattery(fail1, fail2).sort();
    for (const key of allKey) {
      const put = [...acc];
      put.push(key);
      const valeu = isObject(fail1[key]) ? '[complex value]': fail1[key];
      const newValue = isObject(fail2[key]) ? '[complex value]': fail2[key];
      if (isObject(fail1[key]) && isObject(fail2[key]) ) {
        acc.push(key);
        result.push(iter(fail1[key], fail2[key], acc));
        acc.pop();
      } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] !== fail2[key]) {
        result.push(`Property ${put.join('.')} was updated. From ${valeu} to ${newValue}`);
      } else if (!fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
        result.push(`Property ${put.join('.')} was added with value: ${newValue}`);
      } else if (fail1.hasOwnProperty(key) && !fail2.hasOwnProperty(key)) {
        result.push(`Property ${put.join('.')} was removed`);
      } 
    }
    return result.flat();
  };
  return iter(jsFail1, jsFail2, []).flat();
};

export default planCalculator;
