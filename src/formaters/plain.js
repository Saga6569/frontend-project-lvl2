import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const planin = (data, accKeys = []) => {
  const { type, name } = data;
  const pathFromKeys = [...accKeys];
  pathFromKeys.push(name);
  if (type === 'deletion') {
    return `Property ${pathFromKeys.join('.')} was removed`;
  } if (type === 'add') {
    const { value } = data;
    return `Property ${pathFromKeys.join('.')} was added with value: ${getValue(value)}`;
  } if (type === 'updated') {
    const { value, newValue } = data;
    return `Property ${pathFromKeys.join('.')} was updated. From ${getValue(value)} to ${getValue(newValue)}`;
  } if (type === 'nested') {
    const { children } = data;
    accKeys.push(name);
    return children.map((child) => planin(child, accKeys)).flat();
  }
  return [];
};

const planCalculator = (tree) => tree.flatMap((child) => planin(child));

export default planCalculator;
