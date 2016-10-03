'use strict'

const pin = 7; //GPIO4番
const hue = require('./libs/hue');

const raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({io: new raspi()});
const INTERVAL = 7000;
let blockFlag = 'off';

board.on('ready', () => {
    let sensor = new five.Sensor.Digital(pin);
    sensor.on("change", (val) => {
        if(val == 1 && blockFlag === 'off'){//つく時
            hue(val);
        }else if(val == 0){//消える時
            blockFlag = 'on';
            setTimeout(()=>{
                hue(val);
                blockFlag = 'off';
            },INTERVAL);
        }
    });
});