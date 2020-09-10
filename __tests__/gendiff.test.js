import reverse from '../bin/differenceСalculator';

const data1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
};
const data2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
}
  

test('test 1', () => {
  expect(differenceСalculator(data1, data2)).toEqual();
  expect(reverse('')).toEqual('');
});
