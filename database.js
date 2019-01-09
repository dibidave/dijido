var database = require("sqit/database/database");
var Goal = require("./Goal");

// Javascript module inheritance? lol
for(var key in database) {
  module.exports[key] = database[key];
}

module.exports["connect"] = function() {
  return database.connect()
  .then(function() {
    return database.upgrade(VERSION_UPGRADE_MAP, DATABASE_VERSION);
  });
};

const DATABASE_VERSION = 3;

var initialize_database = function() {
  return Promise.resolve();
};

var upgrade_database_v_1 = function() {
  return database.update_many(Goal.collection_name, {},
    {
      $set: {
        "is_active": false
      }
    }
  );
};

var upgrade_database_v_2 = function() {
  return database.update_many(Goal.collection_name, {},
    {
      $set: {
        "recurrence_rate": null,
        "recurrence_time_unit": null
      }
    }
  );
};

const VERSION_UPGRADE_MAP = {
  0: initialize_database,
  1: upgrade_database_v_1,
  2: upgrade_database_v_2
};