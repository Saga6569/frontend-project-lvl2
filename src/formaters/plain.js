import _ from 'lodash';

const genValue = (value) => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const format = (node, paths = []) => {
  const { type, name } = node;
  const fullPath = [...paths, name];
  const newPaths = fullPath.join('.');
  switch (type) {
    case 'deleted': {
      return `Property '${newPaths}' was removed`;
    }
    case 'added': {
      const { value } = node;
      return `Property '${newPaths}' was added with value: ${genValue(value)}`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      return `Property '${newPaths}' was updated. From ${genValue(oldValue)} to ${genValue(newValue)}`;
    }
    case 'notUpdated': {
      return [];
    }
    case 'nested': {
      const { children } = node;
      return children.flatMap((child) => format(child, fullPath));
    }
    default:
      throw new Error(`Unknown key '${type}'!`);
  }
};

const plainFormatDifferences = (tree) => tree.flatMap((branches) => format(branches));

export default plainFormatDifferences;
