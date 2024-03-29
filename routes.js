var express = require("express");
var router = express.Router();
var database = require("sqit/database/database");
var dateformat = require("dateformat");
var logger = require("sqit/logging/Logger").get_logger("routes");
var path = require("path");
var Goal = require("./Goal");
var Note = require("./Note");
var Status = require("./Status");
var Activity = require("./Activity");
var moment = require("moment");
var config = require("./config/config");

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

    var promise = Promise.resolve();

    if(goal.recurrence_rate !== null) {

      var new_subgoal_JSON = {};
      new_subgoal_JSON.name = goal.name;
      new_subgoal_JSON.parent_goal_ids = [goal._id];

      var target_date = moment().clone();
      new_subgoal_JSON.target_date = target_date.toDate();

      promise = promise.then(Goal.create_goal.bind(null, new_subgoal_JSON));
    }

    return promise.then(function() {
      return response.json({goal: goal});
    });
  });
};

var post_status = function(request, response) {

  Status.create_status(request.body)
  .then(function(status) {
    return response.json({status: status});
  });
};

var post_activity = function(request, response) {

  Activity.create_activity(request.body)
  .then(function(activity) {
    return response.json({activity: activity});
  });
};

var get_goals = function(request, response) {

  var filter = {};

  for(var parameter in request.query) {

    if(parameter === "_") {
      continue;
    }

    var filter_value = request.query[parameter];

    if(filter_value === "null") {
      filter_value = null;
    }

    filter[parameter] = filter_value;
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

var get_logs = function(request, response) {

  var age = 30;

  if("age" in request.query) {
    age = request.query["age"];
  }

  var earliest_date = moment().clone().subtract(age, "days");

  let completed_filter = {};
  completed_filter.completed_on = {
    "$gt": earliest_date.toDate(),
  };

  completed_filter._deleted_on = {
    "$eq": null
  };

  let abandoned_filter = {};
  abandoned_filter.abandoned_on = {
    "$gt": earliest_date.toDate()
  };

  abandoned_filter._deleted_on = {
    "$eq": null
  };

  let activity_start_filter = {};
  activity_start_filter.start_time = {
    "$gt": earliest_date.toDate()
  };

  let activity_end_filter = {};
  activity_end_filter.end_time = {
    "$gt": earliest_date.toDate()
  };

  Promise.all([
    Goal.get_goals(completed_filter),
    Goal.get_goals(abandoned_filter),
    Activity.get_activities(activity_start_filter),
    Activity.get_activities(activity_end_filter)
  ]).then(function(results) {

    completed_goals = results[0];
    abandoned_goals = results[1];
    started_activities = results[2];
    ended_activities = results[3];
    
    var logs = [];

    for(var goal_index = 0; goal_index < completed_goals.length;
      goal_index++) {

      var log = {};
      log.date = completed_goals[goal_index].completed_on;
      log.text = completed_goals[goal_index].name;
      log.type = "Completed";

      logs.push(log);
    }
    
    for(var goal_index = 0; goal_index < abandoned_goals.length;
      goal_index++) {

      var log = {};
      log.date = abandoned_goals[goal_index].abandoned_on;
      log.text = abandoned_goals[goal_index].name;
      log.type = "Abandoned";

      logs.push(log);
    }
    
    for(var activity_index = 0; activity_index < started_activities.length;
      activity_index++) {

      var log = {};
      log.date = started_activities[activity_index].start_time;
      log.text = started_activities[activity_index].goal_id;
      log.type = "Started";

      logs.push(log);
    }

    for(var activity_index = 0; activity_index < ended_activities.length;
      activity_index++) {

      var log = {};
      log.date = ended_activities[activity_index].end_time;
      log.text = ended_activities[activity_index].goal_id;
      log.type = "Stopped";

      logs.push(log);
    }

    return response.json({logs: logs});

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

var get_activities = function(request, response) {

  var filter = {};

  for(var parameter in request.query) {

    if(parameter === "_") {
      continue;
    }

    var filter_value = request.query[parameter];

    if(filter_value === "null") {
      filter_value = null;
    }

    filter[parameter] = filter_value;
  }

  Activity.get_activities(filter)
  .then(function(activities) {

    var activity_JSON_objects = [];

    for(var activity_index = 0; activity_index < activities.length;
      activity_index++) {

      var activity_JSON_object = activities[activity_index].to_JSON();

      activity_JSON_objects.push(activity_JSON_object);
    }

    return response.json({activities: activity_JSON_objects});
  });
};

var update_goal = function(request, response) {

  var goal_id = request.params._id;
  var updated_goal = request.body;

  Goal.get_goal_by_id(goal_id)
  .then(function(goal) {

    var recurrence_promise = new Promise(function(resolve, reject) {

      // Some logic for recurring tasks - check if the updated goal has been
      // completed or abandoned, if it hasn't it's not a completed recurrent
      // goal
      if((updated_goal.completed_on === null || goal.completed_on !== null) &&
        (updated_goal.abandoned_on === null || goal.abandoned_on !== null)) {
        return resolve();
      }

      // If it has more than one parent, it's not a recurring goal
      if(goal.parent_goal_ids.length !== 1) {
        return resolve();
      }

      // Check the parent to see if it's recurring
      return Goal.get_goal_by_id(goal.parent_goal_ids[0])
      .then(function(parent_goal) {

        // If the parent isn't recurring, don't gotta do anything
        if(parent_goal.recurrence_rate === null) {
          return resolve();
        }

        // Otherwise we create a new goal with the same name and parent as the
        // completed goal
        var new_goal_JSON = {};
        new_goal_JSON.name = updated_goal.name;
        new_goal_JSON.parent_goal_ids = updated_goal.parent_goal_ids;

        var target_date = null;

        // If recurrence is fixed, it's assumed this is a task that must be
        // completed on a fixed, rigid schedule, and if an event is completed
        // or abandoned, the next fixed time point must be completed as well
        if(parent_goal.is_recurrence_fixed) {

          target_date = moment(updated_goal.target_date);

          let time_unit = parent_goal.recurrence_time_unit;

          if(time_unit === "workday") {
            time_unit = "day";
          }

          target_date.add(
            parent_goal.recurrence_rate, time_unit
          );

          if(parent_goal.recurrence_time_unit === "workday") {
            while(target_date.isoWeekday() > 5) {
              target_date.add(1, "day");
            }
          }

        }

        // If recurrence is not fixed, it's... loose. It means, if you
        // completed this task, queue it up again for the same time as when
        // you completed it, but in the recurrence time in the future.
        // If it was abandoned, though, we'll try again for the next 
        // target date
        else {
          if(updated_goal.completed_on !== null) {
            target_date = moment(updated_goal.completed_on);
          }
          else {
            target_date = moment(updated_goal.target_date);
          }
        
          var now = moment();

          let num_increments = 0;

          while(num_increments === 0 || target_date < now) {

            let time_unit = parent_goal.recurrence_time_unit;

            if(time_unit === "workday") {
              time_unit = "day";
            }

            target_date.add(
              parent_goal.recurrence_rate, time_unit);

            if(parent_goal.recurrence_time_unit === "workday") {
              while(target_date.isoWeekday() > 5) {
                target_date.add(1, "day");
              }
            }

            num_increments = num_increments + 1;
          }
        }

        new_goal_JSON.target_date = target_date.toDate();

        Goal.create_goal(new_goal_JSON)
        .then(function(new_goal) {
          return resolve();
        })
      });


    });

    return recurrence_promise
    .then(function() {
      goal.from_JSON(updated_goal);
      return goal.save();
    });
  }).then(function(goal) {
    return response.json(goal);
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

var get_notes = function(request, response) {

  Note.get_notes()
  .then(function(notes) {

    var note_JSON_objects = [];

    for(var note_index = 0; note_index < notes.length;
      note_index++) {

      var note_JSON_object = notes[note_index].to_JSON();

      note_JSON_objects.push(note_JSON_object);
    }

    return response.json({notes: note_JSON_objects});
  });
};

var post_note = function(request, response) {

  Note.create_note(request.body)
  .then(function(note) {

    var promise = Promise.resolve();

    return promise.then(function() {
      return response.json({note: note});
    });
  });
};

var update_note = function(request, response) {

  var note_id = request.params._id;
  var updated_note = request.body;

  Note.get_note_by_id(note_id)
  .then(function(note) {
    note.from_JSON(updated_note);
    return note.save();
  }).then(function(note) {
    return response.json(note);
  });
};

var delete_note = function(request, response) {

  var note_id = request.params._id;

  Note.get_note_by_id(note_id)
  .then(function(note) {
    return note.delete();
  }).then(function(note) {
    return response.json({});
  });
};

var update_activity = function(request, response) {

  var activity_id = request.params._id;
  var updated_activity = request.body;

  Activity.get_activity_by_id(activity_id)
  .then(function(activity) {
    activity.from_JSON(updated_activity);
    return activity.save();
  }).then(function(activity) {
    return response.json(activity);
  });
};

var get_session = function(request, response) {

  return response.json({
    session: request.session
  });
};

var get_config = function(request, response) {

  return response.json({
    config: {
      end_of_day_offset: config.end_of_day_offset
    }
  });
};

router.get("/", is_authenticated, get_home_page);
router.get("/config", is_authenticated, get_config);
router.post("/goals", is_authenticated, post_goal);
router.get("/goals", is_authenticated, get_goals);
router.get("/statuses", is_authenticated, get_statuses);
router.post("/statuses", is_authenticated, post_status);
router.put("/goals/:_id", is_authenticated, update_goal);
router.delete("/goals/:_id", is_authenticated, delete_goal);
router.get("/notes", is_authenticated, get_notes);
router.post("/notes", is_authenticated, post_note);
router.put("/notes/:_id", is_authenticated, update_note);
router.delete("/notes/:_id", is_authenticated, delete_note);
router.get("/session", get_session);
router.get("/activities", is_authenticated, get_activities);
router.post("/activities", is_authenticated, post_activity);
router.put("/activities/:_id", is_authenticated, update_activity);
router.get("/logs", is_authenticated, get_logs);

module.exports = router;
