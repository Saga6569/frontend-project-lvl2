import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value !== 'string' ? value : `'${value}'`;
};

const format = (node, paths = []) => {
  const { type, name } = node;
  const newPaths = [...paths, name];
  const fullPath = newPaths.join('.');
  switch (type) {
    case 'deleted': {
      return `Property '${fullPath}' was removed`;
    }
    case 'added': {
      const { value } = node;
      return `Property '${fullPath}' was added with value: ${getValue(value)}`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      return `Property '${fullPath}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
    }
    case 'notUpdated': {
      return [];
    }
    case 'nested': {
      const { children } = node;
      return children.flatMap((child) => format(child, newPaths));
    }
    default:
      throw new Error(`Unknown type '${type}'!`);
  }
};

const plainFormat = (tree) => tree.flatMap((node) => format(node)).join('\n');

export default plainFormat;
