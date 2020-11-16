import _ from 'lodash';

const planCalculator = (tree) => {
  const iter = (data, put) => {
    const arr = data.reduce((result, child) => {
      const key = child.length === 2 ? child[0] : Object.keys(Object.values(child)[0]);
      put.push(key);
      if (child.length === 2) {
        result.push(iter(child[1], put));
      } else if (_.has(child, 'deletion')) {
        result.push(`Property ${put.join('.')} was removed`);
      } else if (_.has(child, 'add')) {
        const { add } = child;
        const data1 = Object.values(add)[0];
        const value = _.isObject(data1) ? '[complex value]' : Object.values(add).flat();
        result.push(`Property ${put.join('.')} was added with value: ${value}`);
      } else if (_.has(child, 'updated')) {
        const { updated } = child;
        const values = Object.values(updated).flat();
        const value = _.isObject(values[0]) ? '[complex value]' : values[0];
        const newValue = _.isObject(values[1]) ? '[complex value]' : values[1];
        result.push(`Property ${put.join('.')} was updated. From ${value} to ${newValue}`);
      }
      put.pop();
      return result.flat();
    }, []);
    return arr;
  };
  return iter(tree, []);
};

export default planCalculator;
