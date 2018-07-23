var http = require("http");
var logger = require("dijible-lib/util/logger").init_logger("server");
var app = require("../app");
var database = require("dijible-lib/connectors/database");
var config = require("../config/config");

port = config.port;

app.set("port", port);

var connection_promises = [];

connection_promises.push(database.connect());

Promise.all(connection_promises)
.then(function() {
  server = http.createServer(app);
  server.listen(port);
  server.on("listening", on_listening);
}).catch(function(error) {
  logger.fatal(error);
});

function on_listening() {
  logger.info("Server listening on " + port);
};
