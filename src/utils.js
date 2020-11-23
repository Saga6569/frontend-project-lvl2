/* eslint-disable no-param-reassign */
import _ from 'lodash';

export const keyBattery = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  return _.union(keysData1, keysData2).sort();
};

const isNumber = (value) => {
  if (value % 1 === 0 && Number(value) !== 0 && value !== true) {
    return Number(value);
  }
  return value;
};

export const pareserIni = (tree) => tree.reduce((result, child) => {
  const { type, children } = child;
  if (type === 'nested') {
    result.push(pareserIni(children));
  } else if (type === 'updated') {
    child.value = isNumber(child.value);
    child.newValue = isNumber(child.newValue);
    result.push(child);
  } else {
    child.value = isNumber(child.value);
    result.push(child);
  }
  return result.flat();
}, []);
