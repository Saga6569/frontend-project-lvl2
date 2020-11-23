import { readFileSync } from 'fs';
import jsyaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: ini.parse,
};

const parser = (data) => {
  const index = data.lastIndexOf('.');
  const format = data.slice(index + 1);
  return parsers[format](readFileSync(data, 'utf-8'));
};

export default parser;
