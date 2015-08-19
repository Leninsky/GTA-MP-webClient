'use strict';

$(document).ready(function() {
  $('#messages').append($('<li>').text('Type in your input field "use [playerName]" to use your desired player name').prepend('<i class="fa fa-info pr5"></i>'));
});

let socket = io.connect('http://localhost:8080');
let playerName = '';

let RGB = class RGB {
  constructor(_r,_g,_b) {
    this.r=_r;
    this.g=_g;
    this.b=_b;
  }
};

let send = function() {
  let message = $('#m').val();

  // Check if message is meant to set the playerName
  if(message.substring(0,4) === 'use ' && playerName.length === 0) {
    playerName = message.substring(4, message.length);
    $('#playerName').text(`Your Name: ${playerName}`);
    socket.emit('setUsername', playerName);
    $('#messages').append($('<li>').text(`Now using ${playerName} as STAPlayer`));
  }
  // Check if playerName is already set but the client tries to set it again
  else if(message.substring(0,4) === 'use ' && playerName.length > 0) {
    $('#messages').append($('<li>').text('You can only change your name by restarting the client.').css('color', 'rgb(220,20,60)').prepend('<i class="fa fa-info pr5"></i>'));
  }
  // Check if playerName starts with spaces
  else if(playerName.startsWith(' ')) {
    $('#messages').append($('<li>').text('Your name should not contain spaces!').css('color', 'rgb(220,20,60)').prepend('<i class="fa fa-info pr5"></i>'));
  }
  // Check if playerName is already set
  else if(playerName.length > 0) {
    socket.emit('data', {msg: message, rgb: new RGB(0,0,255)});
  }
  // playerName is not set, report to client
  else {
    $('#messages').append($('<li>').text('Type in your input field "use [playerName]" to use your desired player name').css('color', 'rgb(220,20,60)').prepend('<i class="fa fa-info pr5"></i>'));
  }
  // Clear the input
  $('#m').val('');
  return false;
};

socket.on('data', function(msg) {
  // Check if Message is type of connect
  if(msg.type == 'connect') {
    $('#messages').append($('<li>').text(msg.msg).css('color', `rgb(${msg.rgb.r}, ${msg.rgb.g}, ${msg.rgb.b})`).prepend('<i class="fa fa-user-plus pr5"></i>'));
  }

  // Check if Message is type of disconnect
  else if(msg.type == 'disconnect') {
    $('#messages').append($('<li>').text(msg.msg).css('color', `rgb(${msg.rgb.r}, ${msg.rgb.g}, ${msg.rgb.b})`).prepend('<i class="fa fa-user-times pr5"></i>'));
  }

  // If no type matches, use default
  else {
    $('#messages').append($('<li>').text(msg.msg).css('color', `rgb(${msg.rgb.r}, ${msg.rgb.g}, ${msg.rgb.b})`));
  }
});
