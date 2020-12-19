import _ from 'lodash';

const indent = (count = 1) => '    '.repeat(count);

const formattingTheValue = (data, depth = 0) => {
  if (!_.isObject(data)) {
    return data;
  }
  const getindent = indent(depth);
  const keys = Object.keys(data);
  const result = keys.flatMap((key) => {
    const value = _.isObject(data[key]) ? formattingTheValue(data[key], depth + 1) : data[key];
    return `${getindent}${key}: ${value} \n`;
  }).join('');
  return `{ \n${result}${getindent}}`;
};

const nestedDiff = (node, depth = 0) => {
  const getindent = indent(depth);
  const { name, type } = node;
  switch (type) {
    case 'nested': {
      const { children } = node;
      const iterChildren = children.flatMap((cild) => nestedDiff(cild, depth + 1)).join('');
      const result = `{\n${iterChildren}${getindent}}`;
      return `${getindent}${name}: ${result}\n`;
    }
    case 'deleted': {
      const { value } = node;
      const getValue = formattingTheValue(value, depth + 1);
      return `${getindent}- ${name}: ${getValue}\n`;
    }
    case 'added': {
      const { value } = node;
      const getValue = formattingTheValue(value, depth + 1);
      return `${getindent}+ ${name}: ${getValue}\n`;
    }
    case 'updated': {
      const { oldValue, newValue } = node;
      const getOldValue = formattingTheValue(oldValue, depth + 1);
      const getNewValue = formattingTheValue(newValue, depth + 1);
      return `${getindent}- ${name}: ${getOldValue}\n${getindent}+ ${name}: ${getNewValue}\n`;
    }
    default: {
      const { value } = node;
      const getValue = formattingTheValue(value, depth + 1);
      return `${getindent}  ${name}: ${getValue}\n`;
    }
  }
};

const stylishFormatDifferences = (tree) => {
  const result = tree.map((child) => nestedDiff(child)).join('');
  return `{\n${result}}`;
};

export default stylishFormatDifferences;
