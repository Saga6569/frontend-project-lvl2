import _ from 'lodash';

const nestedValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const planCalculator = (tree) => {
  const iter = (data, put) => {
    const arr = tree.reduce((result, child) => {
      const {
        name, type, value, newValue, children,
      } = child;
      put.push(name);
      if (type === 'nested') {
        result.push(iter(children, put));
      } if (type === 'deletion') {
        result.push(`Property ${put.join('.')} was removed`);
      } else if (type === 'add') {
        result.push(`Property ${put.join('.')} was added with value: ${nestedValue(value)}`);
      } else if (type === 'updated') {
        result.push(`Property ${put.join('.')} was updated. From ${nestedValue(value)} to ${nestedValue(newValue)}`);
      }
      put.pop(name);
      return result.flat();
    }, []);
    return arr;
  };
  return iter(tree, []);
};

export default planCalculator;
