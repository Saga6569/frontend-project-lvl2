import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const childrensNodes = genDiff(data1[key], data2[key]);
      return { name: key, type: 'nested', children: childrensNodes };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        name: key, type: 'updated', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { name: key, type: 'notUpdated', value: data1[key] };
  });
};

export default genDiff;
