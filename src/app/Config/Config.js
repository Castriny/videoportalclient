"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.httpBasePath = 'http://videoportal.local/api/';
Config.notificationOptions = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
};
exports.Config = Config;
