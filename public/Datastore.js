var Datastore = function(connector) {

  this.connector = connector;

  this.goals = [];
  this.goal_id_map = {};
  this.statuses = [];
  this.notes = [];
  this.note_id_map = {};
  this.config = {};
  this.logs = [];
  this.log_age = -1;
};

Datastore.prototype.sync = function() {

  return this.connector.get_incomplete_goals()
  .then(function(server_goals) {

    var new_goals = [];
    var new_goal_id_map = {};

    for(var goal_index = 0; goal_index < server_goals.length;
      goal_index++) {

      let goal = server_goals[goal_index];

      new_goal_id_map[goal._id] = goal;
    }

    for(var goal_id in new_goal_id_map) {
      new_goals.push(new_goal_id_map[goal_id]);
    }

    this.goals = new_goals;
    this.goal_id_map = new_goal_id_map;

    return this.get_parent_goals();

  }.bind(this)
  ).then(this.connector.get_statuses)
  .then(function(server_statuses) {
    this.statuses = server_statuses;
  }.bind(this)
  ).then(this.connector.get_notes)
  .then(function(server_notes) {
    this.notes = server_notes;
    this.sort_notes();
  }.bind(this)
  ).then(this.connector.get_config)
  .then(function(config) {
    this.config = config;
  }.bind(this));
};

Datastore.prototype.get_parent_goals = function() {

  var goal_ids_to_fetch = {};

  for(var goal_index = 0; goal_index < this.goals.length;
    goal_index++) {

    let parent_goal_ids = this.goals[goal_index].parent_goal_ids;

    for(var parent_goal_index = 0; parent_goal_index < parent_goal_ids.length;
      parent_goal_index++) {

      let parent_goal_id = parent_goal_ids[parent_goal_index];

      if(parent_goal_id in this.goal_id_map) {
        continue;
      }

      if(parent_goal_id in goal_ids_to_fetch) {
        continue;
      }

      goal_ids_to_fetch[parent_goal_id] = 1;
    }
  }

  if(Object.keys(goal_ids_to_fetch).length == 0) {
    return Promise.resolve();
  }

  var promise_chain = Promise.resolve();

  for(var goal_id in goal_ids_to_fetch) {
    promise_chain = promise_chain.then(function(goal_id) {
      return this.get_goal_by_id(goal_id);
    }.bind(this, goal_id));
  }

  return promise_chain.then(function() {
    return this.get_parent_goals();
  }.bind(this));
};

Datastore.prototype.get_goals = function() {
  return Promise.resolve(this.goals);
};

Datastore.prototype.get_logs = function(age) {
  
  if(age <= this.log_age) {
    return Promise.resolve(this.logs);
  }
  else {
    this.log_age = age;
    return this.load_logs()
    .then(function() {
      return this.logs;
    }.bind(this));
  }
};

Datastore.prototype.load_logs = function() {

  let age = this.log_age;

  var promise = this.connector.get_logs(age)
  .then(function(logs) {

    var log_promises = [];
    
    for(var log_index = 0; log_index < logs.length; log_index++) {
      
      let log = logs[log_index];
      if(log.type === "Started" || log.type === "Stopped") {
        var promise = this.get_goal_by_id(log.text)
        .then(function(log, goal) {
          log.text = goal.name;
          return log;
        }.bind(this, log));
        log_promises.push(promise);
      }
      else {
        log_promises.push(Promise.resolve(log));
      }
    }
    
    return Promise.all(log_promises);
  }.bind(this))
  .then(function(logs) {
    this.logs = logs;

    return this.sort_logs();
  }.bind(this));

  return promise;
};

Datastore.prototype.get_notes = function() {
  return Promise.resolve(this.notes);
};

Datastore.prototype.get_goal_by_id = function(goal_id) {

  if(goal_id in this.goal_id_map) {
    return Promise.resolve(this.goal_id_map[goal_id]);
  }
  else {
    return this.connector.get_goal(goal_id)
    .then(function(goal) {
      this.goals.push(goal);
      this.goal_id_map[goal._id] = goal;

      return goal;
    }.bind(this));
  }
};

Datastore.prototype.get_unfinished_activity_by_goal_id = function(goal_id) {

  return this.connector.get_unfinished_activity_by_goal_id(goal_id);
}

Datastore.prototype.update_activity = function(activity_id, activity) {

  return this.connector.put_activity(activity_id, activity);
};

Datastore.prototype.get_note_by_id = function(note_id) {

  if(note_id in this.note_id_map) {
    return this.note_id_map[note_id];
  }
  else {
    return this.connector.get_note(note_id)
    .then(function(note) {
      this.notes.push(note);
      this.note_id_map[note._id] = note;

      return note;
    }.bind(this));
  }
};

Datastore.prototype.delete_goal = function(goal_id) {

  return this.connector.delete_goal(goal_id)
  .then(function(goal_id) {
    
    for(var goal_index = 0; goal_index < this.goals.length; goal_index++) {
      if(this.goals[goal_index]._id == goal_id) {
        this.goals.splice(goal_index, 1);
        break;
      }
    }

    delete this.goal_id_map[goal_id];
  }.bind(this, goal_id))
};

Datastore.prototype.delete_note = function(note_id) {

  return this.connector.delete_note(note_id)
  .then(function(note_id) {
    
    for(var note_index = 0; note_index < this.notes.length; note_index++) {
      if(this.notes[note_index]._id == note_id) {
        this.notes.splice(note_index, 1);
        break;
      }
    }

    delete this.note_id_map[note_id];
  }.bind(this, note_id))
};

Datastore.prototype.update_goal = function(goal_id, goal) {

  console.log("Updating ");
  console.log(goal);
  
  return this.connector.put_goal(goal_id, goal)
  .then(function(goal) {
    
    for(var goal_index = 0; goal_index < this.goals.length; goal_index++) {
      if(this.goals[goal_index]._id == goal._id) {
        this.goals[goal_index] = goal;
        break;
      }
    }

    this.goal_id_map[goal._id] = goal;
    this.sort_goals();

    return goal;
  }.bind(this));
};

Datastore.prototype.update_note = function(note_id, note) {
  
  return this.connector.put_goal(note_id, note)
  .then(function(note) {
    
    for(var note_index = 0; note_index < this.notes.length; note_index++) {
      if(this.notes[note_index]._id == note._id) {
        this.notes[note_index] = note;
        break;
      }
    }

    this.note_id_map[note._id] = note;
    this.sort_notes();
  }.bind(this));
};

Datastore.prototype.get_statuses = function() {
  return Promise.resolve(this.statuses);
};

Datastore.prototype.add_goal = function(goal) {

  return this.connector.post_goal(goal)
  .then(function(goal) {
    this.goals.push(goal);
    this.goal_id_map[goal._id] = goal;
    this.sort_goals();
  }.bind(this));

};

Datastore.prototype.add_note = function(note) {

  return this.connector.post_note(note)
  .then(function(note) {
    this.notes.push(note);
    this.note_id_map[note._id] = note;
    this.sort_notes();
  }.bind(this));

};

Datastore.prototype.add_activity = function(activity) {

  return this.connector.post_activity(activity)
};

Datastore.prototype.sort_logs = function() {
  this.logs.sort((a, b) => (a.date < b.date) ? 1 : -1);
};


Datastore.prototype.sort_goals = function() {

  this.goals.sort((a, b) => (a.target_date > b.target_date) ? 1 :
    (a.target_date === b.target_date) ? ((a.name > b.name) ? 1 : -1) : -1);
  
};

Datastore.prototype.sort_notes = function() {

  this.notes.sort((a, b) => (a.date < b.date) ? 1 : -1);
  
};
