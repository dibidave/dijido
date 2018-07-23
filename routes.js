var express = require("express");
var router = express.Router();
var database = require("dijible-lib/connectors/database");
var dateformat = require('dateformat');
var logger = require("dijible-lib/util/logger").get_logger("routes");
var path = require("path");
var Action = require("./Action");
var Status = require("./Status");

var get_home_page = function(request, response, next) {
  response.render("index", { title: "Express" });
};

var post_action = function(request, response) {

  Action.create_action(null, request.body)
  .then(function(action) {
    return response.json({action: action});
  });
};

var get_actions = function(request, response) {

  Action.get_actions(null)
  .then(function(actions) {

    var action_JSON_objects = [];

    for(var action_index = 0; action_index < actions.length;
      action_index++) {

      var action_JSON_object = actions[action_index].to_JSON();

      action_JSON_objects.push(action_JSON_object);
    }

    return response.json({actions: action_JSON_objects});
  });
};

var get_statuses = function(request, response) {

  Status.get_statuses(null)
  .then(function(statuses) {

    var status_JSON_objects = [];

    for(var status_index = 0; status_index < statuses.length;
      status_index++) {

      var status_JSON_object = statuses[status_index].to_JSON();

      status_JSON_objects.push(status_JSON_object);
    }

    return response.json({statuses: status_JSON_objects});
  });
};

var update_action = function(request, response) {

  var action_id = request.params._id;
  var updated_action = request.body;

  Action.get_action_by_id(null, action_id)
  .then(function(action) {
    action.from_JSON(updated_action);
    return action.save();
  }).then(function(action) {
    return response.json({});
  });
};

router.get("/", get_home_page);
router.post("/actions", post_action);
router.get("/actions", get_actions);
router.get("/statuses", get_statuses);
router.put("/actions/:_id", update_action);

module.exports = router;