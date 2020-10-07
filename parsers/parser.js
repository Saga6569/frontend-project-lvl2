#!/usr/bin/env node
import { differenceCalculator } from '../src/utils.js'; 
import commander from 'commander';
import pkg2 from 'lodash';
const { isObject, mapKeys } = pkg2;

const perserJs = (failJs) => {
    const result = JSON.stringify(failJs);
    JSON.parse(result, (k, v) => {
    console.log(`${k}: ${v}`);
    return k + v
    });
};

export default perserJs;
