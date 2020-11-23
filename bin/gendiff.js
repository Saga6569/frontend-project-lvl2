#!/usr/bin/env node
import commander from 'commander';
import getDiff from '../index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2> ')
  .action((filePath1, filePath2) => {
    const result = getDiff(filePath1, filePath2, program.format);
    console.log(result);
  });

program.parse(process.argv);
