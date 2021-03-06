import _ from 'lodash';

const getIndent = (depth = 1) => ' '.repeat(depth * 4 - 2);

const formatValue = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const indent = getIndent(depth + 1);
  const keys = Object.keys(data);
  const result = keys.map((key) => {
    const value = formatValue(data[key], depth + 1);
    return `${indent}      ${key}: ${value}\n`;
  }).join('');
  return `{\n${result}${indent}  }`;
};

const format = (node, depth = 0) => {
  const indent = getIndent(depth + 1);
  const { type } = node;
  switch (type) {
    case 'nested': {
      const { children, name } = node;
      const formattedNodes = children.map((child) => format(child, depth + 1)).join('\n');
      const result = `{\n${formattedNodes}\n${indent}  }`;
      return `${indent}  ${name}: ${result}`;
    }
    case 'deleted': {
      const { value, name } = node;
      const formattedValue = formatValue(value, depth);
      return `${indent}- ${name}: ${formattedValue}`;
    }
    case 'added': {
      const { value, name } = node;
      const formattedValue = formatValue(value, depth);
      return `${indent}+ ${name}: ${formattedValue}`;
    }
    case 'updated': {
      const { oldValue, newValue, name } = node;
      const oldFormattedValue = formatValue(oldValue, depth);
      const newFormattedValue = formatValue(newValue, depth);
      return `${indent}- ${name}: ${oldFormattedValue}\n${indent}+ ${name}: ${newFormattedValue}`;
    }
    case 'notUpdated': {
      const { value, name } = node;
      const formattedValue = formatValue(value, depth);
      return `${indent}  ${name}: ${formattedValue}`;
    }
    default:
      throw new Error(`Unknown type '${type}'!`);
  }
};

const stylishFormat = (tree) => {
  const result = tree.map((node) => format(node)).join('\n');
  return `{\n${result}\n}`;
};

export default stylishFormat;
