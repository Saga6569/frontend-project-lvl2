import _ from 'lodash';
import {
  getChildren, getMeta, getName, isDirectory,
} from '@hexlet/immutable-fs-trees';

const planCalculator = (tree) => {
  const iter = (tree, put) => {
    const children = getChildren(tree);
    return children.reduce((result, child) => {
      const meta = getMeta(child);
      const arrKey = Object.keys(meta);
      const valeu = _.isObject(meta[arrKey[0]]) ? '[complex value]' : meta[arrKey[0]];
      const newValue = _.isObject(meta[arrKey[1]]) ? '[complex value]' : meta[arrKey[1]];
      const key = getName(child);
      put.push(key);
      if (!isDirectory(child)) {
        if (arrKey.length !== 1) {
          result.push(`Property ${put.join('.')} was updated. From ${valeu} to ${newValue}`);
        } else if (arrKey.length === 1 && arrKey.includes('+')) {
          result.push(`Property ${put.join('.')} was added with value: ${valeu}`);
        } else if (arrKey.length === 1 && arrKey.includes('-')) {
          result.push(`Property ${put.join('.')} was removed`);
        }
      } else if (isDirectory(child)) {
        result.push(iter(child, put));
      }
      put.pop();
      return result.flat();
    }, []);
  };
  return iter(tree, []);
};

export default planCalculator;
