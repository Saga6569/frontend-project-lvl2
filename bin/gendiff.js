#!/usr/bin/env node
import commander from 'commander';
import perserJs from '../parsers/parser.js';
import { fileFormat } from '../src/utils.js';
// eslint-disable-next-line no-unused-vars
import { diffCalculator, getDiffCalculator } from '../formaters/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2> ')
  .action((filepath1Value, filepath2Value) => {
    const fail1 = fileFormat(filepath1Value);
    const fail2 = fileFormat(filepath2Value);
    if (program.format === 'plain') {
      const result = getDiffCalculator(fail1, fail2, 'plain');
      console.log(result);
      return result;
    } if (program.format === 'json') {
      const result = getDiffCalculator(fail1, fail2, 'json');
      console.log(result);
      return result;
    }
    const result = perserJs(getDiffCalculator(fail1, fail2));
    console.log(result);
    return result;
  });

program.parse(process.argv);
