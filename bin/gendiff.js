import commander from 'commander';
import perserJs from '../parsers/parser.js';
import { differenceCalculator } from '../src/utils.js';
import planCalculator from '../formaters/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2> ')
  .action((filepath1Value, filepath2Value) => {
    if (program.format === 'plain') {
      const result = planCalculator(filepath1Value, filepath2Value);
      console.log(result);
      return result;
    } if (program.format === 'json') {
      const result = differenceCalculator(filepath1Value, filepath2Value);
      console.log(result);
      return result;
    }
    const result = perserJs(differenceCalculator(filepath1Value, filepath2Value));
    console.log(result);
    return result;
  });

program.parse(process.argv);
