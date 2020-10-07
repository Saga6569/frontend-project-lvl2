#!/usr/bin/env node

import pkg2 from 'lodash';
const { isObject, mapKeys, findLastKey } = pkg2;
import { differenceCalculator, fileFormat, keyBattery } from '../src/utils.js'; 
import  perserJs from '../parsers/parser.js'; 

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

  const gg = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true
  }



const ff =  differenceCalculator(ll, tt)
//console.log(ff)



const planCalculator = (jsFail1, jsFail2) => {
  const fail1 = fileFormat(jsFail1);
  const fail2 = fileFormat(jsFail2);
  const result = [];
  const pp = [];
  const allKey = keyBattery(fail1, fail2).sort();
  for (const key of allKey) {
    const valeu = (isObject(fail1[key])) ? '[complex value]': fail1[key];
    const newValue = (isObject(fail2[key])) ? '[complex value]': fail1[key];
    const put = (key, acc) => {
      acc.push(key)
      if (fail1[key] === fail2[key] || fail1[key] )
    }
    if (isObject(fail1[key]) && isObject(fail2[key])) {
      result.push(planCalculator(fail1[key], fail2[key]))
    } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] !== fail2[key]) {
      if (isObject(fail2[key])) {
        result.push(`Property ${put(key)} was added with value: [complex value]`)
      } else if (isObject(fail1[key])) {
        result.push(`Property ${'путь'} was updated. From [complex value] to ${fail2[key]}`)
      } else {
        result.push(`Property ${'путь'} was updated. From ${fail1[key]} to ${fail2[key]}`)
      }
    } else if (!fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key)) {
      if (isObject(fail2[key])) {
        result.push(`Property ${'путь'} was added with value: [complex value]`)
      } else {
        result.push(`Property ${put(key)} was added with value: ${fail2[key]}`)
      }
    } else if (fail1.hasOwnProperty(key) && !fail2.hasOwnProperty(key)) {
      result.push(`Property ${'путь'} was removed`);
    } else if (fail1.hasOwnProperty(key) && fail2.hasOwnProperty(key) && fail1[key] === fail2[key]) {
    }
  }
  return result.flat();
}

console.log(planCalculator(ll, tt))








///const add = (newValue) => `Property ${put} was added with value: ${newValue}`;
  //const delet  = () => `Property ${put} was removed`;
  //const update = (value, newValue) => `Property ${put} was updated. From ${value} to ${newValue}`;


  const plain = (obj) => {
    const put = 123
    
    const keys = Object.keys(obj);
    const longKeys = keys.length - 1
    const result = [];
    for (let i = 0; i <= longKeys; i = i + 1) { 
      if (!keys[i].includes('+') && !keys[i].includes('-') && isObject(obj[keys[i]])) {
        result.push(plain(obj[keys[i]]))
      } else if (!keys[i].includes('+') && !keys[i].includes('-')) {
      } else if ( i === longKeys) {
        if (keys[i].includes('+')) {
          result.push(['добавил',keys[i]])
        } else {
          result.push(['удалил', keys[i]])
        }
      } else if (keys[i].includes('-') && keys[i + 1].includes('+')) {
        result.push(['обновил', keys[i], keys[i + 1] ])
      } else if (keys[i].includes('-') && !keys[i + 1].includes('+') ) {
        result.push(['удалил', keys[i]]);
      }
    }
    return result;
  }
  
  
  