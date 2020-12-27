var Database_Object = require("sqit/database/Database_Object");
var database = require("sqit/database/database");

const collection_name = "Activities";

const Activity = {

  from_JSON(JSON_object) {

    // Ew. I can't believe I'm doing this.
    Database_Object.Database_Object.from_JSON.bind(this, JSON_object)();

    if(this.start_time !== null) {
      this.start_time = new Date(this.start_time);
    }

    if(this.end_time !== null) {
      this.end_time = new Date(this.end_time);
    }
  }

};

exports.create_activity = function(activity_JSON) {

  var activity = Database_Object.create_database_object(collection_name);
  Object.assign(activity, Activity);

  activity.goal_id = activity_JSON.goal_id;

  if(activity_JSON.hasOwnProperty("start_time")) {

    if(activity_JSON.start_time === null) {
      activity.start_time = new Date();
    }
    else {
      activity.start_time = new Date(activity_JSON.start_time);
    }
  }
  else {
    activity.start_time = new Date();
  }

  if(activity_JSON.hasOwnProperty("end_time") && activity_JSON.end_time !== null) {
    activity.end_time = new Date(activity_JSON.end_time);
  }
  else {
    activity.end_time = null;
  }

  var promise = activity.save()
  .then(function() {
    return activity;
  });

  return promise;
};

exports.get_activity_by_id = function(activity_id) {

  var promise = database.get_object_by_id(collection_name, activity_id)
  .then(function(activity_JSON) {

    var activity = Database_Object.create_database_object(collection_name);
    Object.assign(activity, Activity);

    activity.from_JSON(activity_JSON);

    return activity;
  });

  return promise;
};

exports.get_activities = function(filter) {

  var promise = database.get_objects(collection_name, filter,
    {target_date: 1, name: 1})
  .then(function(results) {

    var activities = [];

    for(var activity_index = 0; activity_index < results.length;
      activity_index++) {

      var activity = Database_Object.create_database_object(collection_name);
      Object.assign(activity, Activity);
      activity.from_JSON(results[activity_index]);

      activities.push(activity);
    }

    return activities;

  });

  return promise;
};

exports.collection_name = collection_name;
