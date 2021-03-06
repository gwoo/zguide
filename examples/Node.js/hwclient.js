// Hello World client
// Connects REQ socket to tcp://localhost:5555
// Sends "Hello" to server.

var context = require('zmq')

// socket to talk to server
console.log("Connecting to hello world server...")
var requester = context.createSocket('req')

var x = 0
requester.on("message", function(reply) {
  console.log("Received reply", x, ": [", reply.toString(), ']')
  x += 1
})

requester.connect("tcp://localhost:5555")

for(var i = 0; i < 10; i++) {
  console.log("Sending request", i, '...')
  requester.send("Hello")
}

process.on('SIGINT', function() {
  requester.close()
})
