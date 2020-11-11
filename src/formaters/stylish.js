import _ from 'lodash';
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

const formatStylish = (data) => {
  const json = formatJson(data);
  const iter = (objct, dep) => {
    const indent = (count = 1) => '    '.repeat(count);
    const keys = Object.keys(objct);
    const result = keys.reduce((acc, key) => {
      const value = _.isObject(objct[key]) ? iter(objct[key], dep + 1) : objct[key];
      acc += `${indent(dep)} ${key}: ${value} \n`;
      return acc;
    }, '{ \n');
    return `${result} ${indent(dep)}}`;
  };
  return iter(json, 0);
};

export default formatStylish;

// const formatStylish = (tree) => {
//   const iter = (tree, dep) => {
//     const indent = (count = 1) => '    '.repeat(count);
//     const children = getChildren(tree);
//     const result = children.reduce((acc, child) => {
//       const meta = getMeta(child);
//       const arrKey = Object.keys(meta);
//       const key = getName(child);
//       const value = (data) => (_.isObject(data) ? ffff(data, dep + 1) : data);
//       if (!isDirectory(child)) {
//         if (arrKey.length === 1) {
//           acc += `${indent(dep)} ${arrKey[0]} ${key}: ${value(meta[arrKey[0]])} \n`;
//         } else {
//           acc += `${indent(dep)} ${arrKey[0]} ${key}: ${value(meta[arrKey[0]])} \n`;
//           acc += `${indent(dep)} ${arrKey[1]} ${key}: ${value(meta[arrKey[1]])} \n`;
//         }
//       }
//       else {
//         acc += `${indent(dep)} ${arrKey} ${key}: ${iter(child, dep + 1)} \n`;
//       }
//       return acc;
//     }, '{ \n');
//     return `${result} ${indent(dep)}}`;
//   };
//   return iter(tree, 0);
// };

// export default formatStylish;

// const f = (data) => {
//   const iter = (objct, dep) => {
//     const indent = (count = 1) => '    '.repeat(count);
//     const keys = Object.keys(objct);
//     const result = keys.reduce((acc, key) => {
//       const value = _.isObject(objct[key]) ? iter(objct[key], dep + 1) : objct[key];
//       acc += `${indent(dep)} ${key}: ${value} \n`;
//       return acc;
//     }, '{ \n');
//     return `${result} ${indent(dep)}}`;
//   };
//   return iter(data, 0);
// };
