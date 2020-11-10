import {
  getChildren, getMeta, getName, isDirectory,
} from '@hexlet/immutable-fs-trees';

const formatJson = (tree) => {
  const children = getChildren(tree);
  const result = children.reduce((acc, child) => {
    if (!isDirectory(child)) {
      const meta = getMeta(child);
      const arrKey = Object.keys(meta);
      const key = getName(child);
      if (arrKey.length === 1) {
        acc[`${arrKey[0]} ${key}`] = meta[arrKey[0]];
      } else {
        acc[`${arrKey[0]} ${key}`] = meta[arrKey[0]];
        acc[`${arrKey[1]} ${key}`] = meta[arrKey[1]];
      }
    } else {
      acc[getName(child)] = formatJson(child);
    }
    return acc;
  }, {});
  return result;
};

export default formatJson;
