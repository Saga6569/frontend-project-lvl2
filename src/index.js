import flatFormatDifferences from './formaters/plain.js';
import nestedDiffFormat from './formaters/stylish.js';
import parser from './parsers/parser.js';
import genDiff from './formaters/index.js';
import nodeFormat from './parsers/nodeFormatter.js';

const formats = {
  stylish: nestedDiffFormat,
  plain: flatFormatDifferences,
  json: JSON.stringify,
};

const getDiff = (node1, node2, format) => {
  const formatNode1 = nodeFormat(node1);
  const formatNode2 = nodeFormat(node2);
  const object = parser(formatNode1, node1, formatNode2, node2);
  const differenceTree = genDiff(object);
  return formats[format](differenceTree);
};

export default getDiff;
