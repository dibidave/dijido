var Database_Object = require("sqit/database/Database_Object");
var database = require("sqit/database/database");

const collection_name = "Notes";

const Note = {

  from_JSON(JSON_object) {

    // Ew. I can't believe I'm still doing this.
    Database_Object.Database_Object.from_JSON.bind(this, JSON_object)();

    if(this.date !== null) {
      this.date = new Date(this.date);
    }
  }
};

exports.create_note = function(note_JSON) {

  var note = Database_Object.create_database_object(collection_name);
  Object.assign(note, Note);
  note.name = note_JSON.name;

  if(note_JSON.hasOwnProperty("date") && note_JSON.date !== null) {
    note.date = new Date(note_JSON.date);
  }
  else {
    note.date = note._created_on;
  }

  if(note_JSON.hasOwnProperty("text")) {
    note.text = note_JSON.text;
  }
  else {
    note.text = "";
  }

  var promise = note.save()
  .then(function() {
    return note;
  });

  return promise;
};

exports.get_notes = function() {

  var promise = database.get_objects(collection_name)
  .then(function(results) {

    var notes = [];

    for(var note_index = 0; note_index < results.length;
      note_index++) {

      var note = Database_Object.create_database_object(collection_name);
      Object.assign(note, Note);
      note.from_JSON(results[note_index]);

      notes.push(note);
    }

    return notes;

  });

  return promise;
};

exports.get_note_by_id = function(note_id) {

  var promise = database.get_object_by_id(collection_name, note_id)
  .then(function(note_JSON) {

    var note = Database_Object.create_database_object(collection_name);
    Object.assign(note, Note);

    note.from_JSON(note_JSON);

    return note;
  });

  return promise;
};