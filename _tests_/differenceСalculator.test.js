import { test, expect } from '@jest/globals';
import { differenceCalculator } from '../src/utils.js'; 

const data1 = {
    "timeout": 50
};
const data2 = {
    "timeout": 20
};

const result = { '+ timeout': 50, '- timeout': 20 };

test('test 1', () => {
  expect(differenceCalculator(data1, data2)).toEqual(result);
});
