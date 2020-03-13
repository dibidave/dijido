var database = require("sqit/database/database");
var Goal = require("./Goal");
var Status = require("./Status");

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

const DATABASE_VERSION = 7;

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

var upgrade_database_v_3 = function() {
  return database.update_many(Goal.collection_name, {},
    {
      $set: {
        "is_recurrence_fixed": false
      }
    }
  ).then(function() {
    return database.update_many(Goal.collection_name,
      {
        "recurrence_time_unit": "isoWeek"
      },
      {
        $set: {
          "recurrence_time_unit": "week"
        }
      }
    );
  });
};

var upgrade_database_v_4 = function() {
  return database.update_many(Goal.collection_name, {},
    {
      $set: {
        "notes": ""
      }
    }
  );
};

var upgrade_database_v_5 = function() {
  return database.update_many(Goal.collection_name, {},
    {
      $set: {
        "is_organized": true
      }
    }
  );
};

var upgrade_database_v_6 = function() {
  return database.update_many(Status.collection_name, {},
    {
      $set: {
        "is_default": false
      }
    }
  );
};


const VERSION_UPGRADE_MAP = {
  0: initialize_database,
  1: upgrade_database_v_1,
  2: upgrade_database_v_2,
  3: upgrade_database_v_3,
  4: upgrade_database_v_4,
  5: upgrade_database_v_5,
  6: upgrade_database_v_6
};