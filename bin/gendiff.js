#!/usr/bin/env node
import commander from 'commander';
import getDiffCalculator from '../src/formaters/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> ')
  .action((filepath1Value, filepath2Value) => {
    console.log(program.format);
    const result = getDiffCalculator(filepath1Value, filepath2Value, program.format);
    console.log(result);
  });

program.parse(process.argv);
