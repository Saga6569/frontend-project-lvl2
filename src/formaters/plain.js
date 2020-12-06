/* eslint-disable no-param-reassign */
import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const flatFormat = (node, paths = []) => {
  const { type, name } = node;
  paths = [...paths, name];
  const pathToValue = paths.join('.');
  switch (type) {
    case 'delete': {
      return `Property '${pathToValue}' was removed`;
    }
    case 'addes': {
      const { value } = node;
      return `Property '${pathToValue}' was added with value: ${getValue(value)}`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      return `Property '${pathToValue}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
    }
    case 'nested': {
      const { children } = node;
      return children.flatMap((child) => flatFormat(child, paths));
    }
    default:
      return [];
  }
};

const flatFormatDifferences = (tree) => tree.flatMap((branches) => flatFormat(branches));

export default flatFormatDifferences;
