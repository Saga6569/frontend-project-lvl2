import { readFileSync } from 'fs';

const parser = (formatData1, data1, formatdata2, data2) => {
  const object1 = formatData1(readFileSync(data1, 'utf-8'));
  const object2 = formatdata2(readFileSync(data2, 'utf-8'));
  const getObject = { data1: object1, data2: object2 };
  return getObject;
};

export default parser;
