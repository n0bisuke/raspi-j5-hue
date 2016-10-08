'use strict'

const os = require('os');
const hcPost = require('./libs/hcPost');
let interfaces = os.networkInterfaces();
let mes = '';

for (let dev in interfaces) {
    interfaces[dev].forEach((details) => {
        if (details.internal || details.family !== 'IPv4') return;

        mes = `${os.hostname()}:${details.address} (standup)`;
        let postData = {
            "color": "yellow",
            "message": mes,
            "notify": false,
            "message_format":"text"
        };
        hcPost(postData);
    });
}