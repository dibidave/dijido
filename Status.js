
var database = require("./connectors/database");

const collection_name = "Statuses";

const Status = {

  save() {

    var self = this;

    var promise = null;

    if(this._id === undefined) {
      promise = database.insert(collection_name, this.to_JSON())
      .then(function(sample_id) {
        self._id = sample_id;
        return self;
      });
    }
    else {
      promise = database.update(collection_name, this._id, this.to_JSON())
      .then(function() {
        return self;
      });
    }

    return promise;
  },

  to_JSON() {
    return {
      "_id": this._id,
      "name": this.name
    };
  },

  from_JSON(JSON_object) {
    this._id = JSON_object._id;
    this.name = JSON_object.name;
  }

};

exports.create_status = function(name) {

  var status = Object.create(Status);
  status.name = name;

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

      var status = Object.create(Status);
      status.from_JSON(results[status_index]);

      statuses.push(status);
    }

    return statuses;

  });

  return promise;
};