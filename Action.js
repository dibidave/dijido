
var database = require("./connectors/database");

const collection_name = "Actions";

const Action = {

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
      "name": this.name,
      "status_id": this.status_id
    };
  },

  from_JSON(JSON_object) {
    this._id = JSON_object._id;
    this.name = JSON_object.name;
    this.status_id = JSON_object.status_id;
  }

};

exports.create_action = function(action_JSON) {

  var action = Object.create(Action);
  action.name = action_JSON.name;
  action.status_id = action_JSON.status_id;

  var promise = action.save()
  .then(function() {
    return action;
  });

  return promise;
};

exports.get_action_by_id = function(action_id) {

  var promise = database.get_objects(collection_name,
  {
    _id: action_id
  }).then(function(results) {

    var action = Object.create(Action);
    action.from_JSON(results[0]);

    return action;
  });

  return promise;
};

exports.get_actions = function() {

  var promise = database.get_objects(collection_name)
  .then(function(results) {

    var actions = [];

    for(var action_index = 0; action_index < results.length;
      action_index++) {

      var action = Object.create(Action);
      action.from_JSON(results[action_index]);

      actions.push(action);
    }

    return actions;

  });

  return promise;
};