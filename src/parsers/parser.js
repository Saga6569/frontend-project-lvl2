/* eslint-disable no-restricted-globals */
import jsyaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const formatNumber = (object) => {
  const keys = Object.keys(object);
  return keys.reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc[key] = formatNumber(object[[key]]);
    } else {
      acc[key] = isNaN(parseFloat(object[key])) ? object[key] : parseFloat(object[key]);
    }
    return acc;
  }, {});
};

const iniParser = (data) => formatNumber(ini.parse(data));

const parsers = {
  yml: jsyaml.safeLoad,
  json: jsyaml.safeLoad,
  ini: iniParser,
};

const parser = (data, formatName) => parsers[formatName](data);

export default parser;
