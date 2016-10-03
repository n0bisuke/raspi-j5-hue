'use strict'

const os = require('os');
const hcPost = require('./libs/hcPost');
console.log(getLocalAddress());

function getLocalAddress() {
    var ifacesObj = {}
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        ifacesObj.ipv4.push({name:dev, address:details.address});
                        let postData = {
                            "color": "yellow",
                            "message": `${os.hostname()}: ${details.address}`,
                            "notify": false,
                            "message_format":"text"
                        };
                        hcPost(postData);
                    break;
                    case "IPv6":
                        ifacesObj.ipv6.push({name:dev, address:details.address})
                    break;
                }
            }
        });
    }
    return ifacesObj;
};