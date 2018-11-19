var express = require("express");
var router = express.Router();
var database = require("sqit/database/database");
var dateformat = require('dateformat');
var logger = require("sqit/logging/Logger").get_logger("routes");
var path = require("path");
var Goal = require("./Goal");
var Status = require("./Status");

var is_authenticated = function(request, response, next) {

  if(request.isAuthenticated()) {
    return next();
  }
  else {
    logger.warn("OMG Y U ACCESS THIS, CLICKY THE BUTTONS");
    response.redirect("/");
  }
};

var get_home_page = function(request, response, next) {
  response.render("index", { title: "Express" });
};

var post_goal = function(request, response) {

  Goal.create_goal(request.body)
  .then(function(goal) {
    return response.json({goal: goal});
  });
};

var post_status = function(request, response) {

  Status.create_status(request.body)
  .then(function(status) {
    return response.json({status: status});
  });
};

var get_goals = function(request, response) {

  var filter = {};

  for(var parameter in request.query) {

    if(parameter === "_") {
      continue;
    }

    filter[parameter] = request.query[parameter];
  }

  Goal.get_goals(filter)
  .then(function(goals) {

    var goal_JSON_objects = [];

    for(var goal_index = 0; goal_index < goals.length;
      goal_index++) {

      var goal_JSON_object = goals[goal_index].to_JSON();

      goal_JSON_objects.push(goal_JSON_object);
    }

    return response.json({goals: goal_JSON_objects});
  });
};

var get_statuses = function(request, response) {

  Status.get_statuses()
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

var update_goal = function(request, response) {

  var goal_id = request.params._id;
  var updated_goal = request.body;

  Goal.get_goal_by_id(goal_id)
  .then(function(goal) {
    goal.from_JSON(updated_goal);
    return goal.save();
  }).then(function(goal) {
    return response.json({});
  });
};

var delete_goal = function(request, response) {

  var goal_id = request.params._id;

  Goal.get_goal_by_id(goal_id)
  .then(function(goal) {
    return goal.delete();
  }).then(function(goal) {
    return response.json({});
  });
};

var get_session = function(request, response) {

  return response.json({
    session: request.session
  });
};

router.get("/", is_authenticated, get_home_page);
router.post("/goals", is_authenticated, post_goal);
router.get("/goals", is_authenticated, get_goals);
router.get("/statuses", is_authenticated, get_statuses);
router.post("/statuses", is_authenticated, post_status);
router.put("/goals/:_id", is_authenticated, update_goal);
router.delete("/goals/:_id", is_authenticated, delete_goal);
router.get("/session", get_session);

module.exports = router;