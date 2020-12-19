import _ from 'lodash';

const genDiff = (node1, node2) => {
  const keysData1 = Object.keys(node1);
  const keysData2 = Object.keys(node2);
  const keys = _.union(keysData1, keysData2).sort();
  const dataDiffTree = (data1, data2, key) => {
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        const ChildrensNodes = genDiff(data1[key], data2[key]);
        return { name: key, type: 'nested', children: ChildrensNodes };
      }
      if (data1[key] !== data2[key]) {
        return {
          name: key, type: 'updated', oldValue: data1[key], newValue: data2[key],
        };
      }
    }
    return { name: key, type: 'notUpdated', value: data1[key] };
  };
  return keys.map((key) => dataDiffTree(node1, node2, key));
};

export default genDiff;
