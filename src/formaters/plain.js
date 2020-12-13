import _ from 'lodash';

const genValue = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const flatFormat = (node, paths = []) => {
  const { type, name } = node;
  const pathKeys = [...paths, name];
  const strKeys = pathKeys.join('.');
  switch (type) {
    case 'delete': {
      return `Property '${strKeys}' was removed`;
    }
    case 'addes': {
      const { value } = node;
      return `Property '${strKeys}' was added with value: ${genValue(value)}`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      return `Property '${strKeys}' was updated. From ${genValue(oldValue)} to ${genValue(newValue)}`;
    }
    case 'notUpdated': {
      return [];
    }
    case 'nested': {
      const { children } = node;
      return children.flatMap((child) => flatFormat(child, pathKeys));
    }
    default:
      return [];
  }
};

const flatFormatDifferences = (tree) => tree.flatMap((branches) => flatFormat(branches));

export default flatFormatDifferences;
