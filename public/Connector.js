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

  var URL = this.base_URL + "/goals?completed_on=null";

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

Connector.prototype.put_goal = function(goal_id, goal) {

  var URL = this.base_URL + "/goals/" + goal_id;

  var promise = put_URL(URL, goal)
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