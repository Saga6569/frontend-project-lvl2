import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const dataJs1 = getFixturePath('file1.');
const dataJs2 = getFixturePath('file2.');

const referenceStylish = `{\n${'common: {\n'
+ '    + follow: false\n'
+ '      setting1: Value 1\n'
+ '    - setting2: 200\n'
+ '    - setting3: true\n'
+ '    + setting3: null\n'
+ '    + setting4: blah blah\n'
+ '    + setting5: { \n'
+ '        key5: value5 \n'
+ '        }\n'
+ '    setting6: {\n'
+ '        doge: {\n'
+ '            - wow: \n'
+ '            + wow: so much\n'
+ '        }\n'
+ '          key: value\n'
+ '        + ops: vops\n'
+ '    }\n'
+ '}\n'
+ 'group1: {\n'
+ '    - baz: bas\n'
+ '    + baz: bars\n'
+ '      foo: bar\n'
+ '    - nest: { \n'
+ '        key: value \n'
+ '        }\n'
+ '    + nest: str\n'
+ '}\n'
+ '- group2: { \n'
+ '    abc: 12345 \n'
+ '    deep: { \n'
+ '        id: 45 \n'
+ '        } \n'
+ '    }\n'
+ '+ group3: { \n'
+ '    fee: 100500 \n'
+ '    deep: { \n'
+ '        id: { \n'
+ '            number: 45 \n'
+ '            } \n'
+ '        } \n'
+ '    }\n'}}`;

const referencePlain = ["Property 'common.follow' was added with value: 'false'",
  "Property 'common.setting2' was removed",
  "Property 'common.setting3' was updated. From 'true' to 'null'",
  "Property 'common.setting4' was added with value: 'blah blah'",
  "Property 'common.setting5' was added with value: [complex value]",
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
  "Property 'common.setting6.ops' was added with value: 'vops'",
  "Property 'group1.baz' was updated. From 'bas' to 'bars'",
  "Property 'group1.nest' was updated. From [complex value] to 'str'",
  "Property 'group2' was removed",
  "Property 'group3' was added with value: [complex value]"];

const referenceJson = [{
  name: 'common',
  type: 'nested',
  children: [{ name: 'follow', type: 'added', value: false }, { name: 'setting1', type: 'notUpdated', value: 'Value 1' }, { name: 'setting2', type: 'deleted', value: 200 }, {
    name: 'setting3', type: 'updated', oldValue: true, newValue: null,
  }, { name: 'setting4', type: 'added', value: 'blah blah' }, { name: 'setting5', type: 'added', value: { key5: 'value5' } }, {
    name: 'setting6',
    type: 'nested',
    children: [{
      name: 'doge',
      type: 'nested',
      children: [{
        name: 'wow', type: 'updated', oldValue: '', newValue: 'so much',
      }],
    }, { name: 'key', type: 'notUpdated', value: 'value' }, { name: 'ops', type: 'added', value: 'vops' }],
  }],
}, {
  name: 'group1',
  type: 'nested',
  children: [{
    name: 'baz', type: 'updated', oldValue: 'bas', newValue: 'bars',
  }, { name: 'foo', type: 'notUpdated', value: 'bar' }, {
    name: 'nest', type: 'updated', oldValue: { key: 'value' }, newValue: 'str',
  }],
}, { name: 'group2', type: 'deleted', value: { abc: 12345, deep: { id: 45 } } }, { name: 'group3', type: 'added', value: { fee: 100500, deep: { id: { number: 45 } } } }];

test.each([
  ['json'],
  ['yml'],
  ['ini'],
])('.genDiff (%o)', (format) => {
  expect(getDiff(dataJs1 + format, dataJs2 + format, 'stylish')).toEqual(referenceStylish);
  expect(getDiff(dataJs1 + format, dataJs2 + format, 'plain')).toEqual(referencePlain);
  expect(getDiff(dataJs1 + format, dataJs2 + format, 'json')).toEqual(JSON.stringify(referenceJson));
});
