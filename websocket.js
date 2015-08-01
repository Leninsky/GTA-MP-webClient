/**
 * @overview Websocket class, which initializes a new socket and webserver for the webclient
 * @author Jannis 'Cludch' Lehmann
 * @copyright (c) Cludch
 * @license See LICENSE file
 */

'use strict';

module.exports = class WebSocket {
  /**
   * Starts the socket and webserver on a given port
   * @param  {number} port
   */
  constructor(port) {
    this.port = parseInt(port);
    // Validate port
    if(isNaN(port)) {
      this.port = 8080;
    }

    let express = require('express');
    let app = express();
    let http = require('http').Server(app);
    let io = require('socket.io')(http);

    app.use(express.static(__dirname + '/public'));

    app.get('/', function(req, res){
      res.sendFile('index.html');
    });

    io.on('connection', function(socket) {
      socket.on('setUsername', function(username) {
        socket.player = new global.STAPlayer(username);
        socket.player.SendChatMessage = (msg, rgb) => {
          // Check if colors are set
          if(!rgb) {
            rgb = new RGB(0,0,255);
          }
          // Send the message to the client
          socket.emit('data', {msg, rgb});
        };

        global.g_STAPlayers.push(socket.player);
        socket.emit('data', {msg: `Welcome ${socket.player.name}!`, rgb: new RGB(0,150,20)});
      });

      socket.on('data', function(msg) {
        // Check if message is a command
        if(msg.msg.charAt(0) === '/') {
          // Call ChatCommand event
          events.Call("ChatCommand", socket.player, msg.msg.substring(1,msg.msg.length));
        }
        // Else it is a chat message, format it as a chat message
        // Call ChatMessage, checks for swearing (atleast in the default server package)
        else if(!events.Call("ChatMessage", socket.player, msg.msg)[0]) {
          io.emit('data', {msg: `[Chat]${socket.player.name}: ${msg.msg}`, rgb: new RGB(0,0,255)});
        }
      });
    });

    http.listen(port, function() {
      console.log(`Successfully started the WebClient on port ${port}`);
    });
  }
};
