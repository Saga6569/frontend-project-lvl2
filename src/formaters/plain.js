import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const flatFormat = (object, accKeys = []) => {
  const { type, name } = object;
  const pathFromKeys = [...accKeys];
  pathFromKeys.push(name);
  const str = `Property '${pathFromKeys.join('.')}' was`;
  if (type === 'deletion') {
    return `${str} removed`;
  } if (type === 'add') {
    const { value } = object;
    return `${str} added with value: ${getValue(value)}`;
  } if (type === 'updated') {
    const { oldValue, newValue } = object;
    return `${str} updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
  } if (type === 'nested') {
    const { children } = object;
    return children.flatMap((child) => flatFormat(child, pathFromKeys));
  }
  return [];
};

const flatFormatDifferences = (tree) => tree.flatMap((branches) => flatFormat(branches));

export default flatFormatDifferences;
