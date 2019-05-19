var Datastore = function(connector) {

  this.connector = connector;

  this.goals = [];
  this.goal_id_map = {};
  this.statuses = [];
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

Datastore.prototype.get_goal_by_id = function(goal_id) {

  if(goal_id in this.goals) {
    return this.goal_id_map[goal_id];
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

Datastore.prototype.update_goal = function(goal_id, goal) {

  return this.connector.put_goal(goal_id, goal)
  .then(function(goal) {
    
    for(var goal_index = 0; goal_index < this.goals.length; goal_index++) {
      if(this.goals[goal_index]._id == goal._id) {
        this.goals[goal_index] = goal;
        break;
      }
    }

    this.goal_id_map[goal._id] = goal;
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
  }.bind(this));

};