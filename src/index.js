import parser from './parsers/parser.js';
import genDiff from './formaters/index.js';
import nodeFormat from './parsers/nodeFormatter.js';
import nodeOutputFormat from './format.js';

const getDiff = (node1, node2, format) => {
  const formatNode1 = nodeFormat(node1);
  const formatNode2 = nodeFormat(node2);
  const object = parser(formatNode1, node1, formatNode2, node2);
  const differenceTree = genDiff(object);
  const result = nodeOutputFormat(format)(differenceTree);
  return result;
};

export default getDiff;
