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

Connector.prototype.get_actions = function() {
  var URL = this.base_URL + "/actions";

  var promise = get_URL(URL)
    .then(function(response) {
      return response.actions;
    });

  return promise;
};

Connector.prototype.post_action = function(action) {
  var URL = this.base_URL + "/actions";

  var promise = post_URL(URL, action)
    .then(function(response) {
      return response;
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

Connector.prototype.put_action = function(action_id, action) {

  var URL = this.base_URL + "/actions/" + action_id;

  var promise = put_URL(URL, action)
  .then(function(response) {
    return response;
  });

  return promise;
};