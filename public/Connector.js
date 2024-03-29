function Connector(obj) {
  this.base_URL = obj.base_URL;
};

function get_URL(URL) {
  var promise = new Promise(function(resolve, reject) {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: URL,
      cache: false,
      error: function(jqXHR, status, error) {
        return reject(error);
      },
      success: function(response) {
        return resolve(response);
      }
    });
  });
  return promise;
};

function post_URL(URL, data) {
  var data_JSON = JSON.stringify(data);

  var promise = new Promise(function(resolve, reject) {
    $.ajax({
      type: 'post',
      contentType: 'application/json; charset=UTF-8',
      url: URL,
      data: data_JSON,
      error: function(jqXHR, status, error) {
        return reject(error);
      },
      success: function(response, text_status) {
        return resolve(response);
      }
    });
  });

  return promise;
};

function delete_URL(URL) {

  var promise = new Promise(function(resolve, reject) {
    $.ajax({
      type: 'delete',
      url: URL,
      error: function(jqXHR, status, error) {
        return reject(error);
      },
      success: function(response) {
        return resolve(response);
      }
    });
  });

  return promise;
};

function put_URL(URL, data) {

  var data_JSON = JSON.stringify(data);

  var promise = new Promise(function(resolve, reject) {
    $.ajax({
      type: 'put',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      url: URL,
      data: data_JSON,
      error: function(jqXHR, status, error) {
        return reject(error);
      },
      success: function(response) {
        return resolve(response);
      }
    });
  });

  return promise;
};

Connector.prototype.get_goals = function() {

  var URL = this.base_URL + "/goals";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.goals;
    });

  return promise;
};

Connector.prototype.get_incomplete_goals = function() {

  var URL = this.base_URL + "/goals?completed_on=null&abandoned_on=null";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.goals;
    });

  return promise;
};

Connector.prototype.get_goal = function(goal_id) {
  
  var URL = this.base_URL + "/goals/?_id=" + goal_id;

  var promise = get_URL(URL)
    .then(function(response) {
      return response.goals[0];
    });

  return promise;

};

Connector.prototype.get_unfinished_activity_by_goal_id = function(goal_id) {

  var URL = this.base_URL + "/activities/?goal_id=" + goal_id + "&end_time=null";
  
  var promise = get_URL(URL)
    .then(function(response) {
      return response.activities;
    });

  return promise;

};

Connector.prototype.post_goal = function(goal) {
  var URL = this.base_URL + "/goals";

  var promise = post_URL(URL, goal)
    .then(function(response) {
      return response.goal;
    });

  return promise;
};

Connector.prototype.get_statuses = function() {
  var URL = this.base_URL + "/statuses";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.statuses;
    });

  return promise;
};

Connector.prototype.get_logs = function(age) {
  var URL = this.base_URL + "logs/?age=" + age;

  var promise = get_URL(URL)
  .then(function(response) {
    return response.logs;
  });

  return promise;
}

Connector.prototype.put_goal = function(goal_id, goal) {

  var URL = this.base_URL + "/goals/" + goal_id;

  var promise = put_URL(URL, goal)
  .then(function(response) {
    return response;
  });

  return promise;
};

Connector.prototype.put_activity = function(activity_id, activity) {

  var URL = this.base_URL + "/activities/" + activity_id;

  var promise = put_URL(URL, activity)
  .then(function(response) {
    return response;
  });

  return promise;
};

Connector.prototype.delete_goal = function(goal_id) {

  var URL = this.base_URL + "/goals/" + goal_id;

  var promise = delete_URL(URL)
  .then(function(response) {
    return response;
  });

  return promise;
};

Connector.prototype.get_session = function() {

  var URL = this.base_URL + "/session";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.session;
    });

  return promise;
};

Connector.prototype.post_login = function(username, password) {

  var URL = this.base_URL + "/login";

  var promise = post_URL(URL, {
    username: username,
    password: password
  }).then(function(response) {
    return response;
  });

  return promise;
};

Connector.prototype.get_notes = function() {

  var URL = this.base_URL + "/notes";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.notes;
    });

  return promise;
};

Connector.prototype.get_config = function() {

  var URL = this.base_URL + "/config";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.config;
    });

  return promise;
};

Connector.prototype.get_note = function(note_id) {
  
  var URL = this.base_URL + "/notes/?_id=" + note_id;

  var promise = get_URL(URL)
    .then(function(response) {
      return response.notes[0];
    });

  return promise;

};

Connector.prototype.post_note = function(note) {
  var URL = this.base_URL + "/notes";

  var promise = post_URL(URL, note)
    .then(function(response) {
      return response.note;
    });

  return promise;
};

Connector.prototype.post_activity = function(activity) {
  var URL = this.base_URL + "/activities";

  var promise = post_URL(URL, activity)
    .then(function(response) {
      return response.activity;
    });

  return promise;
};

Connector.prototype.put_note = function(note_id, note) {

  var URL = this.base_URL + "/notes/" + note_id;

  var promise = put_URL(URL, note)
  .then(function(response) {
    return response;
  });

  return promise;
};

Connector.prototype.delete_note = function(note_id) {

  var URL = this.base_URL + "/notes/" + note_id;

  var promise = delete_URL(URL)
  .then(function(response) {
    return response;
  });

  return promise;
};
