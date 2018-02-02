/**
 *****************************************
 * Created by lifx
 * Created on 2018-02-01 19:02:24
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 合并对象
 *****************************************
 */
export default function assign(...args) {
    return args.reduce((data, curr) =>(
        curr && typeof curr === 'object' ? { ...data, ...curr } : data
    ), {});
}

