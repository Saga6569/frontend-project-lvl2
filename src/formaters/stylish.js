import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const stylishFormat = (data, depth = 0) => {
  if (!_.isObject(data)) {
    return data;
  }
  const retreat = indent(depth);
  const keys = Object.keys(data);
  const result = keys.flatMap((key) => {
    const value = _.isObject(data[key]) ? stylishFormat(data[key], depth + 1) : data[key];
    return `${retreat}${key}: ${value} \n`;
  }).join('');
  return `{ \n${result}${retreat}}`;
};

const nestedDiff = (node, depth = 0) => {
  const retreat = indent(depth);
  const { name, type } = node;
  switch (type) {
    case 'nested': {
      const { children } = node;
      const iterChildren = children.flatMap((cild) => nestedDiff(cild, depth + 1)).join('');
      const result = `{\n${iterChildren}${retreat}}`;
      return `${retreat}${name}: ${result}\n`;
    }
    case 'delete':
    case 'addes': {
      const { value } = node;
      const getValue = stylishFormat(value, depth + 1);
      const act = type === 'delete' ? '-' : '+';
      return `${retreat}${act} ${name}: ${getValue}\n`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      const getOldValue = stylishFormat(oldValue, depth + 1);
      const getNewValue = stylishFormat(newValue, depth + 1);
      return `${retreat}- ${name}: ${getOldValue}\n${retreat}+ ${name}: ${getNewValue}\n`;
    }
    default: {
      const { value } = node;
      const getValue = stylishFormat(value, depth + 1);
      return `${retreat}  ${name}: ${getValue}\n`;
    }
  }
};

const nestedDiffFormat = (tree) => {
  const result = tree.flatMap((child) => nestedDiff(child)).join('');
  return `{\n${result}}`;
};

export default nestedDiffFormat;
