var Database_Object = require("sqit/database/Database_Object");
var database = require("sqit/database/database");

const collection_name = "Statuses";

const Status = {
};

exports.create_status = function(status_JSON) {

  var status = Database_Object.create_database_object(collection_name);
  Object.assign(status, Status);
  status.name = status_JSON.name;

  var promise = status.save()
  .then(function() {
    return status;
  });

  return promise;
};

exports.get_statuses = function(user_id) {

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