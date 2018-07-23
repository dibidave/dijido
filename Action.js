var Database_Object = require("dijible-lib/Database_Object");
var database = require("dijible-lib/connectors/database");

const collection_name = "Actions";

const Action = {

};

exports.create_action = function(user_id, action_JSON) {

  var action = Database_Object.create_database_object(user_id, collection_name);
  Object.assign(action, Action);

  action.name = action_JSON.name;
  action.status_id = action_JSON.status_id;

  var promise = action.save()
  .then(function() {
    return action;
  });

  return promise;
};

exports.get_action_by_id = function(user_id, action_id) {

  var promise = database.get_object_by_id(user_id, collection_name, action_id)
  .then(function(action_JSON) {

    var action = Database_Object.create_database_object(
      user_id, collection_name);
    Object.assign(action, Action);

    action.from_JSON(action_JSON);

    return action;
  });

  return promise;
};

exports.get_actions = function(user_id) {

  var promise = database.get_objects(user_id, collection_name)
  .then(function(results) {

    var actions = [];

    for(var action_index = 0; action_index < results.length;
      action_index++) {

      var action = Database_Object.create_database_object(
        user_id, collection_name);
      Object.assign(action, Action);
      action.from_JSON(results[action_index]);

      actions.push(action);
    }

    return actions;

  });

  return promise;
};