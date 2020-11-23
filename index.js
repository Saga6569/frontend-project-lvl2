import planCalculator from './src/formaters/plain.js';
import formatStylish from './src/formaters/stylish.js';
import diff from './src/formaters/index.js';

// const formats = {
//   stylish: formatStylish,
//   plain: planCalculator,
//   json: JSON.stringify,
// };

const getDiff = (data1, data2, format) => {
  const tree = diff(data1, data2);
  if (format === 'json') {
    return JSON.stringify(tree);
  } if (format === 'plain') {
    return planCalculator(tree);
  }
  return formatStylish(tree);
};

export default getDiff;
