#!/usr/bin/env node
import commander from 'commander';
import getDiffCalculator from '../formaters/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2> ')
  .action((filepath1Value, filepath2Value) => {
    const result = getDiffCalculator(filepath1Value, filepath2Value, program.format);
    console.log(result);
    return result;
  });

program.parse(process.argv);
