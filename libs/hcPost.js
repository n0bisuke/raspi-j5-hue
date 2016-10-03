/**
 * HipChatへの投稿共通化
 */

'use strict'

const config = require('../config');
const httpReq = require('./httpReq');

module.exports = (postData) => {
    let options = {
        host: config.hc.host,
        port: 80,
        path: config.hc.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(postData).length
        }
    };
    httpReq(postData, options);
}