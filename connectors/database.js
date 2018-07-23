
module.exports = {

  connect: function() {

    var url = "mongodb://" + config.database_host + ":" + config.database_port;

    logger.info("Connecting to '" + url + "'");

    var promise = MongoClient.connect(url)
    .then(function(client_connection) {

      client_connection = client_connection;

      db = client_connection.db("dijido");

    });

    return promise;
  },

  insert: function(collection_name, object) {

    var collection = db.collection(collection_name);

    for(var property in object) {
      if(property.endsWith("_id") && object[property] !== null &&
        object[property] !== undefined) {
        try {
          object[property] = ObjectID(object[property]);
        }
        catch (error) {

        }
      }
      else if(property.endsWith("_ids") && object[property] !== null &&
        object[property] !== undefined) {
        try {

          for(var object_index = 0; object_index < object[property].length;
            object_index++) {
            object[property][object_index] =
              ObjectID(object[property][object_index])
          }
        }
        catch (error) {

        }
      }
    }

    var promise = collection.insertOne(object)
    .then(function(result) {
      return result.insertedId;
    });

    return promise;
  },

  update: function(collection_name, id, object) {

    id = ObjectID(id);
    
    for(var property in object) {
      if(property.endsWith("_id") && object[property] !== null &&
        object[property] !== undefined) {
        try {
          object[property] = ObjectID(object[property]);
        }
        catch (error) {

        }
      }
      else if(property.endsWith("_ids") && object[property] !== null &&
        object[property] !== undefined) {
        try {

          for(var object_index = 0; object_index < object[property].length;
            object_index++) {
            object[property][object_index] =
              ObjectID(object[property][object_index])
          }
        }
        catch (error) {

        }
      }
    }

    var collection = db.collection(collection_name);

    var promise = collection.replaceOne(
    {
        "_id": id
    },
    object);

    return promise;
  },

  get_objects: function(collection_name, filter) {

    var collection = db.collection(collection_name);

    if(filter === undefined) {
      filter = {};
    }

    if(filter.hasOwnProperty("_id")) {
      filter._id = ObjectID(filter._id);
    }

    var promise = collection.find(filter).toArray();

    return promise;
  },

  delete_objects: function(collection_name, filter) {

    var collection = db.collection(collection_name);

    if(filter === undefined) {
      filter = {};
    }

    var promise = collection.deleteMany(filter);

    return promise;
  }
}

var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var client_connection = null;
var db = null;
var logger = require("../util/logger").get_logger("database");
var config = require("../config/config");