
var Websocket = require('ws');
var socket = new Websocket('wss://real.okcoin.com:10440/websocket/okcoinapi');

socket.on('open', function () {
    socket.send("[{'event':'addChannel','channel':'ok_btcusd_future_ticker_this_week'},{'event':'addChannel','channel':'ok_btcusd_future_ticker_next_week'},{'event':'addChannel','channel':'ok_btcusd_future_ticker_month'},{'event':'addChannel','channel':'ok_btcusd_future_ticker_quarter'}]");    
});

socket.on('message', function (message) {
    console.log('okcoin', message);
    sails.sockets.broadcast('okcoin', {
        msg: message
    });
});

module.exports = {
    subscribe: function (req, res) {
        sails.sockets.join(req.socket, 'okcoin');
        res.json({
            message: 'Joined <okcoin>'
        });
    },
    unsubscribe: function (req, res) {
        sails.sockets.leave(req.socket, 'okcoin');
        res.json({
            message: 'Left <okcoin>'
        });
    }
};