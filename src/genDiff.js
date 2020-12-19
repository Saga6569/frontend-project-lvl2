import _ from 'lodash';

const actionOnNodes = (node1, node2, act) => {
  const keysData1 = Object.keys(node1);
  const keysData2 = Object.keys(node2);
  const keys = _.union(keysData1, keysData2).sort();
  return keys.map((keyIter) => act(node1, node2, keyIter));
};

const dataDiffTree = (data1, data2, key) => {
  if (!_.has(data1, key)) {
    return { name: key, type: 'added', value: data2[key] };
  }
  if (!_.has(data2, key)) {
    return { name: key, type: 'deleted', value: data1[key] };
  }
  if (_.has(data1, key) && _.has(data2, key)) {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const ChildrensNodes = actionOnNodes(data1[key], data2[key], dataDiffTree);
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

const genDiff = (data1, data2) => actionOnNodes(data1, data2, dataDiffTree);

export default genDiff;
