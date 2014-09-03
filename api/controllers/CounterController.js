
var counter = 0;

function incrementAndTransmit() {
    counter++;
    sails.sockets.broadcast('counter', {
        value: counter
    });
}

setInterval(incrementAndTransmit, 500);

module.exports = {
    subscribe: function (req, res) {
        sails.sockets.join(req.socket, 'counter');
        res.json({
            message: 'Joined "counter"'
        });
    },
    unsubscribe: function (req, res) {
        sails.sockets.leave(req.socket, 'counter');
        res.json({
            message: 'Left "counter"'
        });
    }
};