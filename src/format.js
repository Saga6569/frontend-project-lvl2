import flatFormatDifferences from './formaters/plain.js';
import nestedDiffFormat from './formaters/stylish.js';

const formats = {
  stylish: nestedDiffFormat,
  plain: flatFormatDifferences,
  json: JSON.stringify,
};

const nodeOutputFormat = (node) => formats[node];

export default nodeOutputFormat;
