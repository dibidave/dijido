var http = require("http");
var https = require("https");
var logger = require("sqit/logging/Logger").init_logger("server");
var app = require("../app");
var database = require("../database");
var config = require("../config/config");
var fs = require("fs");

port = config.port;
var key_file_path = config.key_file_path;
var certificate_file_path = config.certificate_file_path;

app.set("port", port);

database.connect()
.then(function() {

  var private_key = null;
  var certificate = null;
  var server = null;
  var use_HTTPS = false;

  if(key_file_path !== "") {

    try {
      private_key = fs.readFileSync(key_file_path);
      certificate = fs.readFileSync(certificate_file_path);
      use_HTTPS = true;
    }
    catch(error) {
      logger.warn("No key files found, unable to use HTTPS");
    }
  }

  if(use_HTTPS) {
    var HTTPS_options = {
      key: private_key,
      cert: certificate
    };

    server = https.createServer(HTTPS_options, app);
    var redirect_server = http.createServer(
      function(request, response) {
        response.writeHead(301,
          {
            "Location": "https://" + request.headers.host + request.url
          }
        );
        response.end();
      }
    );

    redirect_server.listen(config.insecure_port);
  }
  else {
    logger.warn("No key files specified, unable to use HTTPS");
    server = http.createServer(app);
  }

  server.listen(port);
  server.on("listening", on_listening);
}).catch(function(error) {
  logger.fatal(error);
});

function on_listening() {
  logger.info("Server listening on " + port);
};
