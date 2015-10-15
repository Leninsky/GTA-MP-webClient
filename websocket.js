/**
* @overview Websocket class, which initializes a new socket and webserver for the webclient
* @author Jannis 'Cludch' Lehmann & Lukas 'derbl4ck' Berwanger
* @copyright (c) Cludch & derbl4ck
* @license See LICENSE file
*/

'use strict';

module.exports = class WebSocket {
    /**
    * Starts the socket and webserver on a given port
    * @param  {number} port web server/socket port
    * @return {void}
    */
    constructor(port) {
        // Validate the port
        if(typeof port !== 'number') {
            port = 8080;
        }

        let express = require('express');
        let app = express();
        let http = require('http').Server(app);
        let io = require('socket.io')(http);

        app.use(express.static(__dirname + '/public'));

        app.get('/', function(req, res) {
            res.sendFile('index.html');
        });

        io.on('connection', function(socket) {
            socket.on('setUsername', function(username) {
                socket.player = new global.STAPlayer(username);
                socket.player.SendChatMessage = (msg, rgb, type) => {
                    // Check if colors are set else set default colors
                    if(!rgb) {
                        rgb = new RGB(0,191,255);
                    }

                    // Set message type to connect
                    type = 'connect';

                    // Send the message to the client
                    socket.emit('data', {msg, rgb, type});
                };

                global.g_STAPlayers.push(socket.player);
                socket.emit('data', {msg: `Welcome ${socket.player.name}!`, rgb: new RGB(50,205,50), type: 'connect'});
            });

            socket.on('data', function(msg) {

                if(msg.msg.charAt(0) === '/') {
                    // Check if message is a command
                    // Call ChatCommand event
                    events.Call("ChatCommand", socket.player, msg.msg.substring(1,msg.msg.length));
                } else {
                    // Else it is a chat message, format it as a chat message
                    // Call ChatMessage, checks for swearing (atleast in the default server package)
                    let eventMessage = events.Call("ChatMessage", socket.player, msg.msg)[0];
                    if (typeof eventMessage === 'string') {
                        io.emit('data', {msg: eventMessage, rgb: new RGB(0,191,255), type: 'message'});
                    }
                }
            });

            socket.on('disconnect', function() {
                socket.emit('data', {msg: 'Got disconnect!', rgb: new RGB(50,205,50), type: 'disconnect'});
                let i = global.g_STAPlayers.indexOf(socket.player);
                global.g_STAPlayers.splice(i, 1);
            });
        });

        http.listen(port, function() {
            console.log(`Successfully started the WebClient on port ${port}`);
        });
    }
};
