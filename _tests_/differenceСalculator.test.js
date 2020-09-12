import { test, expect } from '@jest/globals';
import differenceСalculator from '../bin/differenceСalculator.js'; 

const data1 = {
    "timeout": 50
};
const data2 = {
    "timeout": 20
}

const result = { '+timeout': 50, '-timeout': 20 }

test('test 1', () => {
  expect(differenceСalculator(data1, data2)).toEqual(result);
});
