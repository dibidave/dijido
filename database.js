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

const DATABASE_VERSION = 2;

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

const VERSION_UPGRADE_MAP = {
  0: initialize_database,
  1: upgrade_database_v_1
};