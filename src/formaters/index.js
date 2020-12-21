import plainFormat from './plain.js';
import stylishFormat from './stylish.js';

const formats = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: JSON.stringify,
};

const format = (data, key) => formats[key](data);

export default format;
