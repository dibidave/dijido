var fs = require("fs");
var dateformat = require("dateformat");
var shell = require("shelljs");

exports.is_string_true = function(string) {
  if(string === "True" || string == "true" || string === "1" ||
    string === "t" || string === "T") {
    return true;
  }

  return false;
};

exports.make_directory = function(path) {

  if(!fs.existsSync(path)) {
    shell.mkdir("-p", path);
  }

  return;
};

//Determine if file is a fastq (false for Undetermined ones)
exports.is_valid_FASTQ = function(str){
  if(!str.startsWith("Undetermined") && str.endsWith("fastq.gz")){
    return true;
  }
  else{
    return false;
  }
};