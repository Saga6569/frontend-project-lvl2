import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const formats = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: ini.parse,
};

const formater = (data) => {
  const index = data.lastIndexOf('.');
  const format = data.slice(index + 1);
  if (_.has(formats, format)) {
    return formats[format](readFileSync(data, 'utf-8'));
  }
  return console.log('no format');
};

export default formater;
