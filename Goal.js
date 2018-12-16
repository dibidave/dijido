var Database_Object = require("sqit/database/Database_Object");
var database = require("sqit/database/database");

const collection_name = "Goals";

const Goal = {

  from_JSON(JSON_object) {

    // Ew. I can't believe I'm doing this.
    Database_Object.Database_Object.from_JSON.bind(this, JSON_object)();

    if(this.target_date !== null) {
      this.target_date = new Date(this.target_date);
    }

    if(this.due_date !== null) {
      this.due_date = new Date(this.due_date);
    }

    if(this.completed_on !== null) {
      this.completed_on = new Date(this.completed_on);
    }

    if(this.abandoned_on !== null) {
      this.abandoned_on = new Date(this.abandoned_on);
    }
  }

};

exports.create_goal = function(goal_JSON) {

  var goal = Database_Object.create_database_object(collection_name);
  Object.assign(goal, Goal);

  goal.name = goal_JSON.name;
  goal.status_id = goal_JSON.status_id;

  if(goal_JSON.hasOwnProperty("target_date")) {

    if(goal_JSON.target_date === null) {
      goal.target_date = null;
    }
    else {
      goal.target_date = new Date(goal_JSON.target_date);
    }
  }
  else {
    goal.target_date = null;
  }

  if(goal_JSON.hasOwnProperty("due_date")) {
    goal.due_date = new Date(goal_JSON.due_date);
  }
  else {
    goal.due_date = null;
  }

  if(goal_JSON.hasOwnProperty("completed_on")) {

    if(goal_JSON.completed_on === null) {
      goal.completed_on = null;
    }
    else {
      goal.completed_on = new Date(goal_JSON.completed_on);
    }
  }
  else {
    goal.completed_on = null;
  }

  if(goal_JSON.hasOwnProperty("abandoned_on")) {

    if(goal_JSON.abandoned_on === null) {
      goal.abandoned_on = null;
    }
    else {
      goal.abandoned_on = new Date(goal_JSON.abandoned_on);
    }
  }
  else {
    goal.abandoned_on = null;
  }

  if(goal_JSON.hasOwnProperty("parent_goal_ids")) {
    goal.parent_goal_ids = goal_JSON.parent_goal_ids;
  }
  else {
    goal.parent_goal_ids = [];
  }

  if(goal_JSON.hasOwnProperty("is_active")) {
    goal.is_active = goal_JSON.is_active;
  }
  else {
    goal.is_active = false;
  }

  var promise = goal.save()
  .then(function() {
    return goal;
  });

  return promise;
};

exports.get_goal_by_id = function(goal_id) {

  var promise = database.get_object_by_id(collection_name, goal_id)
  .then(function(goal_JSON) {

    var goal = Database_Object.create_database_object(collection_name);
    Object.assign(goal, Goal);

    goal.from_JSON(goal_JSON);

    return goal;
  });

  return promise;
};

exports.get_goals = function(filter) {

  var promise = database.get_objects(collection_name, filter)
  .then(function(results) {

    var goals = [];

    for(var goal_index = 0; goal_index < results.length;
      goal_index++) {

      var goal = Database_Object.create_database_object(collection_name);
      Object.assign(goal, Goal);
      goal.from_JSON(results[goal_index]);

      goals.push(goal);
    }

    return goals;

  });

  return promise;
};

exports.collection_name = collection_name;