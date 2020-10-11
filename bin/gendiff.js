#!/usr/bin/env node

import commander from 'commander';

import { resolve } from 'path';
import  perserJs from '../parsers/parser.js'; 
import { readFileSync } from 'fs';
import pkg from 'js-yaml';
import { differenceCalculator, fileFormat } from '../src/utils.js';
import planCalculator from '../formatters/index.js'; 




const program = new commander.Command();

let filepath1Value;
let filepath2Value;
program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments(`<filepath1> <filepath2> `)
    .action((filepath1Value, filepath2Value) => {
        if (program.format === 'plain') {
            const result = planCalculator(filepath1Value, filepath2Value)
            console.log(result)
            return result
        } else if (program.format === 'ison') {
            const result = differenceCalculator(filepath1Value, filepath2Value);
            console.log(result)
            return result
        } else {
            const result = perserJs(differenceCalculator(filepath1Value, filepath2Value));
            console.log(result)
            return result
        }
        
    })
    
program.parse(process.argv);
