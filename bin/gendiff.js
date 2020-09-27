#!/usr/bin/env node

import commander from 'commander';
import { resolve } from 'path';
import  perserJs from '../parsers/parser.js'; 
import { readFileSync } from 'fs';
import pkg from 'js-yaml';

const program = new commander.Command();

let filepath1Value;
let filepath2Value;

program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments(`<filepath1> <filepath2>`)
   
program.parse(process.argv);
if (program.arguments(filepath1Value, filepath2Value)) console.log(perserJs(differenceCalculator(filepath1Value, filepath2Value)));