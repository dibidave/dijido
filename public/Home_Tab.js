function Home_Tab(tab_header_div, tab_content_div, connector) {

  this.tab_header = Tab_Header("Home", "#home", tab_header_div, true);

  this.tab_content_div = tab_content_div;
  this.connector = connector;

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "home");
  this.tab_content.className = "tab-pane fade active show";

  this.grid_header_row = document.createElement("div");
  this.grid_header_row.className = "row";

  this.current_action_div = document.createElement("div");
  this.current_action_div.className = "col-sm-6";

  // The current action id field
  this.current_action_id_row = document.createElement("div");
  this.current_action_id_row.className = "pt-3 pb-1 row";

  this.current_action_id_label = document.createElement("label");
  this.current_action_id_label.className = "label label-default col-sm-3";
  this.current_action_id_label.innerHTML = "Action Id";
  this.current_action_id_row.appendChild(this.current_action_id_label);

  this.current_action_id_field = document.createElement("input");
  this.current_action_id_field.className = "col-sm-6";
  this.current_action_id_field.setAttribute("readonly","readonly");
  this.current_action_id_row.appendChild(this.current_action_id_field);

  this.new_action_button = document.createElement("button");
  this.new_action_button.className = "btn btn-primary ml-auto";
  this.new_action_button.innerHTML = "New Action";
  this.new_action_button.addEventListener(
    "click", this.new_action_clicked.bind(this));
  this.current_action_id_row.appendChild(this.new_action_button);

  this.current_action_div.appendChild(this.current_action_id_row);

  // The current action name field
  this.current_action_name_row = document.createElement("div");
  this.current_action_name_row.className = "pb-1 row";

  this.current_action_name_label = document.createElement("label");
  this.current_action_name_label.className = "label label-default col-sm-3";
  this.current_action_name_label.innerHTML = "Name";
  this.current_action_name_row.appendChild(this.current_action_name_label);

  this.current_action_name_field = document.createElement("input");
  this.current_action_name_field.className = "col-sm-9";
  this.current_action_name_row.appendChild(this.current_action_name_field);

  this.current_action_div.appendChild(this.current_action_name_row);

  // The current action status field
  this.current_action_status_row = document.createElement("div");
  this.current_action_status_row.className = "pb-1 row";

  this.current_action_status_label = document.createElement("label");
  this.current_action_status_label.className = "label label-default col-sm-3";
  this.current_action_status_label.innerHTML = "Status";
  this.current_action_status_row.appendChild(this.current_action_status_label);

  this.current_action_status_field = document.createElement("select");
  this.current_action_status_field.className = "js-example-basic";
  this.current_action_status_field.id = "current_action_status_select";

  this.current_action_status_row.appendChild(this.current_action_status_field);
  this.current_action_div.appendChild(this.current_action_status_row);

  // Buttons for saving/canceling the current action
  this.current_action_buttons_row = document.createElement("div");
  this.current_action_buttons_row.className = "row justify-content-center";

  this.save_button = document.createElement("button");
  this.save_button.className = "btn btn-primary";
  this.save_button.innerHTML = "Save";
  this.save_button.addEventListener("click", this.save_clicked.bind(this));

  this.cancel_delete_button = document.createElement("button");
  this.cancel_delete_button.className = "btn btn-primary";
  this.cancel_delete_button.innerHTML = "Cancel";
  this.cancel_delete_button.addEventListener(
    "click", this.cancel_delete_clicked.bind(this));

  this.current_action_buttons_row.appendChild(this.save_button);
  this.current_action_buttons_row.appendChild(this.cancel_delete_button);

  this.current_action_div.appendChild(this.current_action_buttons_row);

  this.grid_header_row.appendChild(this.current_action_div);

  this.grid_filter_div = document.createElement("div");
  this.grid_filter_div.className = "col-sm-6";

  this.active_statuses_row = document.createElement("div");
  this.active_statuses_row.className = "row justify-content-center";

  this.active_statuses_label = document.createElement("label");
  this.active_statuses_label.innerHTML = "Active Statuses";
  this.active_statuses_row.appendChild(this.active_statuses_label);

  this.active_statuses_dropdown = document.createElement("select")
  this.active_statuses_dropdown.className = "js-example-basic-multiple";
  this.active_statuses_dropdown.setAttribute("multiple", "multiple");
  this.active_statuses_dropdown.id = "active_statuses_select";

  this.active_statuses_row.appendChild(this.active_statuses_dropdown);

  this.grid_filter_div.appendChild(this.active_statuses_row);

  this.grid_header_row.appendChild(this.grid_filter_div);

  this.tab_content.appendChild(this.grid_header_row);

  this.actions_table_div = document.createElement("div");
  this.actions_table_div.className = "col-sm-12";
  this.tab_content.appendChild(this.actions_table_div);

  this.tab_content_div.appendChild(this.tab_content);

  this.current_action_id = null;

  this.update_statuses()
  .then(this.update_actions.bind(this));

  $(document).ready(function() {
    $(".js-example-basic").select2();
    $("#current_action_status_select").select2(
      {
        width: "75%"
      });
    $(".js-example-basic-multiple").select2();
    $("#active_statuses_select").select2(
      {
        width: "50%",
        maximumSelectionLength: 6
      });
  });
};

Home_Tab.prototype.add_action_clicked = function() {
  
  var action_JSON = {
    description: action_description_field.value
  };

  this.connector.post_action(action_JSON);

};

Home_Tab.prototype.update_statuses = function() {

  var promise = this.connector.get_statuses()
  .then(function(statuses) {

    this.statuses = statuses;
    this.status_id_map = {};

    for(var status_index = 0; status_index < this.statuses.length;
      status_index++) {

      let status = this.statuses[status_index];

      this.status_id_map[status._id] = status;
    }

    this.update_status_dropdown();
  }.bind(this));

  return promise;
};

Home_Tab.prototype.update_actions = function() {

  this.connector.get_actions()
  .then(function(actions) {

    this.actions = actions;
    this.action_id_map = {};

    for(var action_index = 0; action_index < this.actions.length;
      action_index++) {

      let action = this.actions[action_index];

      this.action_id_map[action._id] = action;
    }

    this.update_actions_table();

  }.bind(this));
};

Home_Tab.prototype.update_status_dropdown = function() {

  default_status_strings = 
    ["Uncategorized", "This Week", "Tomorrow", "Today", "Doing"];

  default_status_ids = []

  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    var status = this.statuses[status_index];

    if(default_status_strings.indexOf(status.name) > -1) {
      default_status_ids.push(status._id);
    }

    var option = new Option(status.name, status._id, false, false);
    $("#current_action_status_select").append(option).trigger("change");

    option = new Option(status.name, status._id, false, false);
    $("#active_statuses_select").append(option).trigger("change");
  }
  
  $("#active_statuses_select").val(default_status_ids).trigger("change");
};

Home_Tab.prototype.save_clicked = function() {

  if(this.current_action_name_field.value.length === 0) {
    alert("Must specify a name for an action");
    return;
  }

  let selected_status_index = 
    $("#current_action_status_select").find(":selected")[0].index;

  let selected_status = this.statuses[selected_status_index];

  // If the current action id is null, we are creating a new action
  if(this.current_action_id === null) {

    let new_action = {};
    new_action.name = this.current_action_name_field.value;
    new_action.status_id = selected_status._id;

    this.connector.post_action(new_action)
    .then(function() {
      return this.update_actions();
    }.bind(this));
  }
  else {

    let current_action = this.action_id_map[this.current_action_id];
    current_action.name = this.current_action_name_field.value;
    current_action.status_id = selected_status._id;

    this.connector.put_action(current_action._id, current_action)
    .then(function() {
      return this.update_actions();
    }.bind(this));
  }
};

Home_Tab.prototype.cancel_delete_clicked = function() {

};

Home_Tab.prototype.update_actions_table = function() {

  while(this.actions_table_div.firstChild) {
    this.actions_table_div.removeChild(
      this.actions_table_div.firstChild);
  }

  if(this.actions.length === 0) {
    return;
  }

  this.actions_table_row = document.createElement("div");
  this.actions_table_row.className = "row justify-content-center";

  this.status_divs = {};

  let selected_status_ids = $("#active_statuses_select").val();

  for(var status_index = 0; status_index < selected_status_ids.length;
    status_index++) {

    let status = this.status_id_map[selected_status_ids[status_index]];

    var status_div = document.createElement("div");
    status_div.className = "col-sm-2 justify-content-center";

    let header_label = document.createElement("h5");
    header_label.innerHTML = status.name;
    header_label.align = "center";

    status_div.appendChild(header_label);

    this.status_divs[status._id] = status_div;

    this.actions_table_row.appendChild(status_div);
  }

  for(var action_index = 0; action_index < this.actions.length;
    action_index++) {

    let action = this.actions[action_index];

    if(!(action.status_id in this.status_divs)) {
      continue;
    }

    let status_div = this.status_divs[action.status_id];

    let action_button = document.createElement("button");
    action_button.className = "btn btn-outline-primary btn-lg btn-block";
    action_button.setAttribute("width", "100%");
    action_button.innerHTML = action.name;
    // Allow text wrapping
    action_button.style["white-space"] = "normal";
    action_button.addEventListener(
      "click", this.action_clicked.bind(this, action._id));

    status_div.appendChild(action_button);
  }

  this.actions_table_div.appendChild(this.actions_table_row);
};

Home_Tab.prototype.action_clicked = function(action_id) {
  
  this.current_action_id = action_id;
  let current_action = this.action_id_map[action_id];
  this.current_action_id_field.value = action_id;
  this.current_action_name_field.value = current_action.name;

  $("#current_action_status_select").val(
    current_action.status_id).trigger("change");
};

Home_Tab.prototype.new_action_clicked = function() {

  this.current_action_id = null;
  this.current_action_id_field.value = "";
  this.current_action_name_field.value = "";

  $("#current_action_status_select").val(
    this.statuses[0]._id).trigger("change");
};