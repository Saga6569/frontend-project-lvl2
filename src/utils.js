/* eslint-disable no-param-reassign */
import _ from 'lodash';

export const keyBattery = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const result = _.union(keysData1, keysData2).sort();
  return result;
};

export const isNumber = (value) => {
  if (value % 1 === 0 && Number(value) !== 0 && value !== true) {
    return Number(value);
  }
  return value;
};
