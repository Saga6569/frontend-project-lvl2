#!/usr/bin/env node

import pkg2 from 'lodash';
const { isObject, mapKeys, findKey } = pkg2;
import { differenceCalculator, fileFormat, keyBattery } from '../src/utils.js'; 
import  perserJs from '../parsers/parser.js'; 
import path from 'path';

const ll = {
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": "too much"
        }
      }
    },
    "group1": {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  }

const tt = {
    "common": {
      "follow": false,
      "setting1": "Value 1",
      "setting3": {
        "key": "value"
      },
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      },
      "setting6": {
        "key": "value",
        "ops": "vops",
        "doge": {
          "wow": "so much"
        }
      }
    },
  
    "group1": {
      "foo": "bar",
      "baz": "bars",
      "nest": "str"
    },
  
    "group3": {
      "fee": 100500,
      "deep": {
        "id": {
          "number": 45
        }
      }
    }
  }

//const F = differenceCalculator(ll, tt)
//console.log(F['  common'])

const planCalculator = (jsFail1, jsFail2) => {
  
  const iter = (jsFail1, jsFail2, acc) => {
  const fail1 = fileFormat(jsFail1);
  const fail2 = fileFormat(jsFail2);
  const result = [];
  const allKey = keyBattery(fail1, fail2).sort();

  

  for (const key of allKey) {
    const put = [];
    put.push(acc)
    const valeu = isObject(fail1[key]) ? '[complex value]': fail1[key];
    const newValue = isObject(fail2[key]) ? '[complex value]': fail2[key];
    if (isObject(fail1[key]) && isObject(fail2[key]) ) {
      acc.push(key)
      result.push(iter(fail1[key], fail2[key], acc))
      acc.pop()
    } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] !== fail2[key]) {
      put.push(key)
      result.push(`Property ${put.join('.')} was updated. From ${valeu} to ${newValue}`)
    } else if (!fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
      put.push(key)
      result.push(`Property ${put.join('.')} was added with value: ${newValue}`)
    } else if (fail1.hasOwnProperty(key) && !fail2.hasOwnProperty(key)) {
      put.push(key)
      result.push(`Property ${put.join('.')} was removed`);
    } 
  }
  return result.flat();
}
return iter(jsFail1, jsFail2, []).flat()
}
console.log(planCalculator(ll, tt))
