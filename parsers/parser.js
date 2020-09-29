#!/usr/bin/env node
import { keyBattery, differenceCalculator, ymlInJson } from '../src/utils.js'; 


const perserJs = (failJs) => {
    const result = JSON.stringify(failJs)
    JSON.parse(result, (k, v) => {
    console.log(`${k}: ${v}`);
    return ;
    });
};

export default perserJs;
