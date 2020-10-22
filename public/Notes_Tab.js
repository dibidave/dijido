function Notes_Tab(tab_header_div, tab_content_div, datastore) {

  this.tab_header = Tab_Header("Notes", "#notes", tab_header_div, false);

  this.tab_content_div = tab_content_div;
  this.datastore = datastore;

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "notes");
  this.tab_content.className = "tab-pane fade show";

  this.grid_header_row = document.createElement("div");
  this.grid_header_row.className = "row";

  this.current_note_div = document.createElement("div");
  this.current_note_div.className = "col-sm-9  border";

  // The current note id field
  this.current_note_id_row = document.createElement("div");
  this.current_note_id_row.className = "pt-1 pb-1 row";

  this.current_note_header = document.createElement("h3");
  this.current_note_header.innerHTML = "Current Note";

  this.current_note_id_row.appendChild(this.current_note_header);

  this.new_note_button = document.createElement("button");
  this.new_note_button.className = "btn btn-primary mx-auto float-right";
  this.new_note_button.innerHTML = "New Note";
  this.new_note_button.addEventListener(
    "click", this.new_note_clicked.bind(this));
  this.current_note_id_row.appendChild(this.new_note_button);

  this.current_note_div.appendChild(this.current_note_id_row);

  // The note text field
  this.current_note_text_row = document.createElement("div");
  this.current_note_text_row.className = "pb-1 row";

  this.current_note_text_label = document.createElement("label");
  this.current_note_text_label.className = "label label-default col-sm-3";
  this.current_note_text_label.innerHTML = "Text";
  this.current_note_text_row.appendChild(this.current_note_text_label);

  this.current_note_text_field = document.createElement("textarea");
  this.current_note_text_field.id = "current_note_text_field";
  this.current_note_text_field.className = "form-control py-3";
  this.current_note_text_field.align = "center";
  this.current_note_text_field.setAttribute("rows", 5);

  this.current_note_text_row.appendChild(this.current_note_text_field);

  this.current_note_div.appendChild(this.current_note_text_row);

  // The current note date field  
  this.note_date_row = document.createElement("div");
  this.note_date_row.className = "pb-1 row";

  this.note_date_label = document.createElement("label");
  this.note_date_label.className = "label label-default col-sm-3";
  this.note_date_label.innerHTML = "Date";

  this.note_date_row.appendChild(this.note_date_label);
  this.note_date_field = document.createElement("input");
  this.note_date_field.className = "col-sm-6";
  this.note_date_picker = flatpickr(this.note_date_field,
    {
      defaultDate: null,
      disableMobile: true,
      enableTime: true
    }
  );

  this.note_date_row.appendChild(this.note_date_field);
  this.current_note_div.appendChild(this.note_date_row);

  // Buttons for saving/canceling the current note
  this.current_note_buttons_row = document.createElement("div");
  this.current_note_buttons_row.className = "row justify-content-center";

  this.save_button = document.createElement("button");
  this.save_button.className = "btn btn-primary";
  this.save_button.innerHTML = "Save";
  this.save_button.addEventListener("click", this.save_clicked.bind(this));

  this.current_note_buttons_row.appendChild(this.save_button);

  this.cancel_delete_button = document.createElement("button");
  this.cancel_delete_button.className = "btn btn-primary";
  this.cancel_delete_button.innerHTML = "Cancel";
  this.cancel_delete_button.addEventListener(
    "click", this.cancel_delete_clicked.bind(this));

  this.current_note_buttons_row.appendChild(this.cancel_delete_button);

  this.current_note_div.appendChild(this.current_note_buttons_row);

  this.grid_header_row.appendChild(this.current_note_div);

  this.tab_content.appendChild(this.grid_header_row);

  this.notes_table_div = document.createElement("div");
  this.notes_table_div.className = "col-sm-12 pt-2";
  this.tab_content.appendChild(this.notes_table_div);

  this.tab_content_div.appendChild(this.tab_content);

  this.current_note_id = null;

  this.update_notes();

  $(document).ready(function() {
    $('#current_note_text_field').focus();
  });
};

Notes_Tab.prototype.update_notes = function() {

  return this.datastore.get_notes()
  .then(function(notes) {

    this.notes = notes;
    this.note_id_map = {};

    for(var note_index = 0; note_index < this.notes.length;
      note_index++) {

      let note = this.notes[note_index];
      this.note_id_map[note._id] = note;
    }

    this.update_notes_table();

  }.bind(this));
};

Notes_Tab.prototype.save_clicked = function() {

  // Check whether this is a newly created note; if it is, we'll clear the
  // fields once saved
  var is_new_note = this.current_note_id === null;

  return this.save_current()
  .then(function() {
    if(is_new_note) {
      return this.new_note_clicked();
    }
  }.bind(this)
  ).catch(function() {
    return;
  });
};

Notes_Tab.prototype.save_current = function() {

  if(this.current_note_text_field.value.length === 0) {
    alert("Must specify some text for a note");
    return Promise.reject();
  }

  let note_date = null;

  if(this.note_date_picker.selectedDates.length > 0) {
    note_date = this.note_date_picker.selectedDates[0];
  }

  // If the current note id is null, we are creating a new note
  if(this.current_note_id === null) {

    let new_note = {};
    new_note.text = this.current_note_text_field.value;
    new_note.date = note_date;

    return this.datastore.add_note(new_note)
    .then(function(new_note) {
      return this.update_notes();
    }.bind(this));
  }
  else {

    let current_note = this.note_id_map[this.current_note_id];
    current_note.text = this.current_note_text_field.value;

    if(note_date === null) {
      note_date = current_note._created_on;
    }
    
    current_note.date = note_date;

    return this.datastore.update_note(current_note._id, current_note)
    .then(function() {
      return this.update_notes();
    }.bind(this));
  }
};

Notes_Tab.prototype.cancel_delete_clicked = function() {

  // If the current note id is null, we are creating a new note
  if(this.current_note_id === null) {
    return this.new_note_clicked();
  }
  else {

    let current_note = this.note_id_map[this.current_note_id];

    this.datastore.delete_note(current_note._id)
    .then(function() {
      this.new_note_clicked();
      return this.update_notes();
    }.bind(this));
  }

};

Notes_Tab.prototype.update_notes_table = function() {

  while(this.notes_table_div.firstChild) {
    this.notes_table_div.removeChild(
      this.notes_table_div.firstChild);
  }

  if(this.notes.length === 0) {
    return;
  }

  this.notes_table = document.createElement("table");
  this.notes_table.className = "table-condensed table-striped table-bordered";

  this.notes_table_header = document.createElement("thead");

  var header_row = document.createElement("tr");
  var cell = document.createElement("th");
  cell.setAttribute("scope", "col");
  cell.innerHTML = "Date";
  header_row.appendChild(cell);

  var cell = document.createElement("th");
  cell.setAttribute("scope", "col");
  cell.innerHTML = "Text";
  header_row.appendChild(cell);

  var cell = document.createElement("th");
  cell.setAttribute("scope", "col");
  cell.innerHTML = "Edit";
  header_row.appendChild(cell);

  this.notes_table_header.appendChild(header_row);
  this.notes_table.appendChild(this.notes_table_header);

  this.notes_table_body = document.createElement("tbody");

  for(var note_index = 0; note_index < this.notes.length; note_index++) {

    var note = this.notes[note_index];

    var row = document.createElement("tr");
    row.className = "table-active";

    var cell = document.createElement("td");
    cell.innerHTML = new Date(note.date).toLocaleString();
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = note.text;
    row.appendChild(cell);

    var cell = document.createElement("td");

    var edit_button = document.createElement("button");
    edit_button.className = "btn btn-primary";
    edit_button.setAttribute("type","button");
    edit_button.innerHTML = "Edit";
    edit_button.addEventListener("click",
      this.edit_note_clicked.bind(this, note._id));

    cell.appendChild(edit_button);
    row.appendChild(cell);

    this.notes_table_body.appendChild(row);
  }

  this.notes_table.appendChild(this.notes_table_body);
  this.notes_table_div.appendChild(this.notes_table);
};

Notes_Tab.prototype.edit_note_clicked = function(note_id) {
  
  this.current_note_id = note_id;
  let current_note = this.note_id_map[note_id];
  this.current_note_text_field.value = current_note.text;
  this.cancel_delete_button.innerHTML = "Delete";

  if(current_note.date === null) {
    this.note_date_picker.setDate(null);
  }
  else {
    this.note_date_picker.setDate(current_note.date);
  }
};

Notes_Tab.prototype.new_note_clicked = function() {

  this.current_note_id = null;
  this.current_note_text_field.value = "";
  this.note_date_picker.setDate(null);

  this.cancel_delete_button.innerHTML = "Cancel";
};
