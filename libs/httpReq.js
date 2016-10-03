/**
 * HTTP Requestを共通化
 */

'use strict'

const http = require(`http`);
const debugFlag = require('../config').flag.debug;

module.exports = (body, options) => {

    let req = http.request(options, (res) => {
        log('STATUS: ' + res.statusCode);
        log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            log('BODY: ' + chunk);
        });
    });
    
    req.on('error', (e) => {
        log('problem with request: ' + e.message);
    });
    
    req.write(JSON.stringify(body));
    req.end();
}

function log(v){
    if(debugFlag === 'off')return;
    console.log(v);
}