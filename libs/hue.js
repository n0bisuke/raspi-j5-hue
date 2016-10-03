/**
 * Hueへの投稿共通化
 */

'use strict'

const config = require('../config');
const httpReq = require('./httpReq');

module.exports = (v) => {
    let postData = {};
    if(v == 0){
        postData = {"on":false};
    }else{
        postData = {"on":true};
    }
    let options = {
        host: config.hue.ip,
        port: 80,
        path: `/api/${config.hue.user}/lights/${config.hue.id}/state`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(postData).length
        }
    };
    httpReq(postData, options);
}