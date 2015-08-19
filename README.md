# webclient

The web client is a GTA-MP server package.
It is a similar client as the fake player binary but it allows to emulate a client via a browser.
So even other people of your team could access the webserver to test.

## Version

1.2.0

## Installation

  - Type `npm install` in the root directory of this repository
  - Put the whole folder (not content) into the `packages` directory of the STA
  - Check the `config.js` to set the port - default port is `8080`
  - Run the STA

## Todos

 - Check if the player name only consists of spaces

## Changelog

##### 1.0 (01.08.2015)
 - First release

##### 1.1 (01.08.2015)
 - Added a new layout
 - Reworked the RGB codes
 - Added message types
 - Added a disconnect event

##### 1.2.0 (19.08.2015)
 - Moved the JavaScript client code to a separate file (now GitHub detects that the package is mostly JavaScript)
 - Now compatible with the newest default server package

## Scripts used
 - [socket.io Chat](http://socket.io/get-started/chat/)

## Thanks
 - To Tirus for giving me the idea for creating this as a package and not a standalone application

##  Bitcoin
If you want to donate me some coffee for further developments, my Bitcoin address is `16w7umTeoJfPzZnDbQtuefrPRssq21jhJ5`

License
----

MIT
