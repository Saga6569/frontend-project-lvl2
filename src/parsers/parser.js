/* eslint-disable no-restricted-globals */
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const stringToNumber = (str) => (isNaN(parseFloat(str)) ? str : parseFloat(str));

const formattingNumber = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc[key] = formattingNumber(object[[key]]);
    } else {
      acc[key] = stringToNumber(object[key]);
    }
    return acc;
  }, {});
};

const iniParser = (stringPathToData) => formattingNumber(ini.parse(stringPathToData));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: iniParser,
};

const parser = (key, data) => parsers[key](data);

export default parser;
