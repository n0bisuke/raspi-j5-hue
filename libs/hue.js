'use strict'

const http = require(`http`);
const config = require('../config');
const HOST = config.hue.ip;
const USER = config.hue.user;
const LIGHT_ID = config.hue.id;
const PATH = `/api/${USER}/lights/${LIGHT_ID}/state`;
const debugFlag = config.flag.debug;

function putHue(v){
    log(`${typeof(v)}:${v}`);

    let postData = {};
    if(v == 0){
        postData = {"on":false};
    }else{
        postData = {"on":true};
    }

    let postDataStr = JSON.stringify(postData);
    let options = {
        host: HOST,
        port: 80,
        path: PATH,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postDataStr.length
        }
    };

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
    
    req.write(postDataStr);
    req.end();
}

function log(v){
    if(debugFlag === 'off')return;
    console.log(v);
}

module.exports = putHue;