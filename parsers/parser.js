#!/usr/bin/env node
import { differenceCalculator } from '../src/utils.js'; 
import commander from 'commander';


const perserJs = (failJs) => {
    const result = JSON.stringify(failJs)
    JSON.parse(result, (k, v) => {
    console.log(`${k}: ${v}`);
    return 
    });
};

export default perserJs;
