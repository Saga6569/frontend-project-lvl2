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

//const data1 = {
 //   "timeout": 50,
//    'lalal': 5
//};
//const data2 = {
//    "timeout": 20
//};

//console.log(perserJs(differenceCalculator(data1, data2)));
