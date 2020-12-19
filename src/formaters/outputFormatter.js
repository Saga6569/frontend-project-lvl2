import plainFormatDifferences from './plain.js';
import stylishFormatDifferences from './stylish.js';

const formats = {
  stylish: stylishFormatDifferences,
  plain: plainFormatDifferences,
  json: JSON.stringify,
};

const nodeOutputFormat = (data, key) => formats[key](data);

export default nodeOutputFormat;
