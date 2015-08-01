/**
 * @overview Entry point for the web client
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

let config = require('./config');
let Websocket = require('./websocket');

// Create test player class
global.STAPlayer = class Player {
  constructor(username) {
    this.name = username;
    this.client = {
      networkId: 1
    };
    this.ipAddress = '127.0.0.1';
  }
};
// Same as the g_players array, but since the g_players array is not writable,
// we need to create our own
global.g_STAPlayers = [];

global.RGB = class RGB {
  constructor(_r,_g,_b) {
    this.r = _r;
    this.g = _g;
    this.b = _b;
  }
};

/**
 * Entry point
 * @param number port to listen on
 */
function main(port) {
    new Websocket(port);

    console.log("\n----- GTA-MP web client -----");
    console.log("Authors: Cludch, derbl4ck");
    console.log(`Port: ${port}`);
    console.log("-----------------------------\n");
}

main(config.port);
