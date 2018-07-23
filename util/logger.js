var bunyan = require("bunyan");
var fs = require("fs");
var config = require("../config/config.json");
var path = require("path");
var sendmail = require("sendmail")();
var stream = require("stream");
var package_info = require("../package.json");

var Email_Stream = new stream.Writable();

Email_Stream.write = function(object) {

  var stringified_object = JSON.stringify(object, null, 2);
  stringified_object = stringified_object.split("\\n").join("\n");

  var subject = null;

  subject = "SCRAP Error";

  sendmail({
    from: config.log_sender_email,
    to: config.log_recipient_email,
    subject: subject,
    text: stringified_object
  });
};

var Fatal_Stream = new stream.Writable();

Fatal_Stream.write = function(object) {
  process.exit();
};

try {
  var stats = fs.statSync(config.log_directory);
}
catch (error) {
  fs.mkdirSync(config.log_directory);
}

var parent_logger = null;
var process_logger = null;
var loggers = {};
var process_name = null;

exports.init_logger = function(new_process_name) {

  if(process_logger !== null) {
    return process_logger;
  }

  process_name = new_process_name;

  parent_logger = bunyan.createLogger(
  {
    name: process_name,
    serializers: bunyan.stdSerializers,
    streams: [
    {
      level: config.screen_threshold,
      stream: process.stdout
    },
    {
      type: "rotating-file",
      period: "1d",
      count: 30,
      level: config.file_threshold,
      path: path.join(config.log_directory, process_name + ".log")
    },
    {
      type: "raw",
      level: config.email_threshold,
      stream: Email_Stream
    },
    {
      type: "raw",
      level: "fatal",
      stream: Fatal_Stream
    }
    ]
  });

  parent_logger.info("dijido " + new_process_name + " log initialized, version " + package_info.version);

  process_logger = parent_logger.child({module_name: process_name});

  return process_logger;
};

exports.get_logger = function(module_name) {

  if(module_name === undefined) {
    return parent_logger;
  }

  if(!loggers.hasOwnProperty(module_name)) {
    loggers[module_name] = parent_logger.child({module_name: module_name});
  }

  return loggers[module_name];
};