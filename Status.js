var Database_Object = require("sqit/database/Database_Object");
var database = require("sqit/database/database");

const collection_name = "Statuses";

const Status = {
};

exports.create_status = function(status_JSON) {

  var status = Database_Object.create_database_object(collection_name);
  Object.assign(status, Status);
  status.name = status_JSON.name;

  if(status_JSON.hasOwnProperty("time_unit")) {
    status.time_unit = status_JSON.time_unit;
  }
  else {
    status.time_unit = null;
  }

  if(status_JSON.hasOwnProperty("min_time")) {
    status.min_time = status_JSON.min_time;
  }
  else {
    status.min_time = null;
  }

  if(status_JSON.hasOwnProperty("max_time")) {
    status.max_time = status_JSON.max_time;
  }
  else {
    status.max_time = null;
  }

  if(status_JSON.hasOwnProperty("is_default")) {
    status.is_default = status_JSON.is_default;
  }
  else {
    status.is_default = false;
  }

  if(status_JSON.hasOwnProperty("is_planning")) {
    status.is_planning = status_JSON.is_planning;
  }
  else {
    status.is_planning = false;
  }

  var promise = status.save()
  .then(function() {
    return status;
  });

  return promise;
};

exports.get_statuses = function() {

  var promise = database.get_objects(collection_name)
  .then(function(results) {

    var statuses = [];

    for(var status_index = 0; status_index < results.length;
      status_index++) {

      var status = Database_Object.create_database_object(collection_name);
      Object.assign(status, Status);
      status.from_JSON(results[status_index]);

      statuses.push(status);
    }

    return statuses;

  });

  return promise;
};

exports.collection_name = collection_name;
