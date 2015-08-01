# webclient

The webclient is a GTA-MP server package.
It is a similar client as the FakePlayer binary but it allows to emulate a client via a browser.
So even other people of your team could access the webserver to test.

### Version

1.0.0

### Installation

  - Type `npm install` in the root directory of this repository
  - Put the whole folder (not content) into the `packages` directory of the STA
  - Check the `config.js` to set the port - default port is `8080`
  - Run the STA

### Todos

 - Add a disconnect event and remove the player from the STAg_players array
 - Add more eye-friendly RGB codes

### Scripts used
 - [socket.io Chat](http://socket.io/get-started/chat/)

### Thanks
 - To Tirus for giving me the idea for creating this as a package and not a standalone application

###  Bitcoin
If you want to donate me some coffee for further developments, my Bitcoin address is `16w7umTeoJfPzZnDbQtuefrPRssq21jhJ5`

License
----

MIT
