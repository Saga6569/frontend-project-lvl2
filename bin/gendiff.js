#!/usr/bin/env node

import commander from 'commander';
import { resolve } from 'path';
import  perserJs from '../parsers/parser.js'; 
import { readFileSync } from 'fs';
import pkg from 'js-yaml';
import { differenceCalculator } from '../src/utils.js';

const program = new commander.Command();

let filepath1Value;
let filepath2Value;

program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments(`<filepath1> <filepath2>`)
    .action(differenceCalculator)

    
program.parse(process.argv);
