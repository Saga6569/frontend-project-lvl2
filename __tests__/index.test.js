import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import getDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__tests__', '__fixtures__', filename);

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
  children: [{ name: 'follow', type: 'addes', value: false }, { name: 'setting1', type: 'notUpdated', value: 'Value 1' }, { name: 'setting2', type: 'delete', value: 200 }, {
    name: 'setting3', type: 'updated', oldValue: true, newValue: null,
  }, { name: 'setting4', type: 'addes', value: 'blah blah' }, { name: 'setting5', type: 'addes', value: { key5: 'value5' } }, {
    name: 'setting6',
    type: 'nested',
    children: [{
      name: 'doge',
      type: 'nested',
      children: [{
        name: 'wow', type: 'updated', oldValue: '', newValue: 'so much',
      }],
    }, { name: 'key', type: 'notUpdated', value: 'value' }, { name: 'ops', type: 'addes', value: 'vops' }],
  }],
}, {
  name: 'group1',
  type: 'nested',
  children: [{
    name: 'baz', type: 'updated', oldValue: 'bas', newValue: 'bars',
  }, { name: 'foo', type: 'notUpdated', value: 'bar' }, {
    name: 'nest', type: 'updated', oldValue: { key: 'value' }, newValue: 'str',
  }],
}, { name: 'group2', type: 'delete', value: { abc: 12345, deep: { id: 45 } } }, { name: 'group3', type: 'addes', value: { fee: 100500, deep: { id: { number: 45 } } } }];

const format = { A: 'json', B: 'yml', C: 'ini' };

test.each([
  [dataJs1 + format.A, dataJs2 + format.A],
  [dataJs1 + format.B, dataJs2 + format.B],
  [dataJs1 + format.C, dataJs2 + format.C],
])('.genDiff (%o, %o )', (a, b) => {
  expect(getDiff(a, b, 'stylish')).toEqual(referenceStylish);
  expect(getDiff(a, b, 'plain')).toEqual(referencePlain);
  expect(getDiff(a, b, 'json')).toEqual(JSON.stringify(referenceJson));
});
