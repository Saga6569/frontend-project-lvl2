#!/usr/bin/env node
import _ from 'lodash';

export const perserJs = (objct) => { 
    const parserSS = (objct, acc) => {
        let str = '{ \n';
        const keys = Object.keys(objct);
        for (const key of keys) { 
            if (_.isObject(objct[key])) {
                str += `  ${key} :  ${parserSS(objct[key], acc)} \n `;
            } else {
                str += ` ${key} : ${objct[key]} \n`;
            }
        }
        str += `}`;
        return str;
    }
   return parserSS(objct, []);
};

export default perserJs;
