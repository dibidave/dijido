function Home_Tab(tab_header_div, tab_content_div, connector) {

  this.tab_header = Tab_Header("Home", "#home", tab_header_div, true);

  this.tab_content_div = tab_content_div;
  this.connector = connector;

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "home");
  this.tab_content.className = "tab-pane fade active show";

  this.grid_header_row = document.createElement("div");
  this.grid_header_row.className = "row";

  this.current_goal_div = document.createElement("div");
  this.current_goal_div.className = "col-sm-6";

  // The current goal id field
  this.current_goal_id_row = document.createElement("div");
  this.current_goal_id_row.className = "pt-3 pb-1 row";

  this.current_goal_id_label = document.createElement("label");
  this.current_goal_id_label.className = "label label-default col-sm-3";
  this.current_goal_id_label.innerHTML = "Goal Id";
  this.current_goal_id_row.appendChild(this.current_goal_id_label);

  this.current_goal_id_field = document.createElement("input");
  this.current_goal_id_field.className = "col-sm-6";
  this.current_goal_id_field.setAttribute("readonly","readonly");
  this.current_goal_id_row.appendChild(this.current_goal_id_field);

  this.new_goal_button = document.createElement("button");
  this.new_goal_button.className = "btn btn-primary ml-auto";
  this.new_goal_button.innerHTML = "New Goal";
  this.new_goal_button.addEventListener(
    "click", this.new_goal_clicked.bind(this));
  this.current_goal_id_row.appendChild(this.new_goal_button);

  this.current_goal_div.appendChild(this.current_goal_id_row);

  // The current goal name field
  this.current_goal_name_row = document.createElement("div");
  this.current_goal_name_row.className = "pb-1 row";

  this.current_goal_name_label = document.createElement("label");
  this.current_goal_name_label.className = "label label-default col-sm-3";
  this.current_goal_name_label.innerHTML = "Name";
  this.current_goal_name_row.appendChild(this.current_goal_name_label);

  this.current_goal_name_field = document.createElement("input");
  this.current_goal_name_field.className = "col-sm-9";
  this.current_goal_name_row.appendChild(this.current_goal_name_field);

  this.current_goal_div.appendChild(this.current_goal_name_row);

  // The current goal status field
  this.current_goal_status_row = document.createElement("div");
  this.current_goal_status_row.className = "pb-1 row";

  this.current_goal_status_label = document.createElement("label");
  this.current_goal_status_label.className = "label label-default col-sm-3";
  this.current_goal_status_label.innerHTML = "Status";
  this.current_goal_status_row.appendChild(this.current_goal_status_label);

  this.current_goal_status_field = document.createElement("select");
  this.current_goal_status_field.className = "js-example-basic";
  this.current_goal_status_field.id = "current_goal_status_select";

  this.current_goal_status_row.appendChild(this.current_goal_status_field);
  this.current_goal_div.appendChild(this.current_goal_status_row);
  
  this.target_date_row = document.createElement("div");
  this.target_date_row.className = "pb-1 row";

  this.target_date_label = document.createElement("label");
  this.target_date_label.className = "label label-default col-sm-3";
  this.target_date_label.innerHTML = "Target Date";

  this.target_date_row.appendChild(this.target_date_label);
  this.target_date_field = document.createElement("input");
  this.target_date_field.className = "col-sm-6";
  this.target_date_picker = flatpickr(this.target_date_field,
    {
      defaultDate: null,
      disableMobile: true
    }
  );

  this.target_date_row.appendChild(this.target_date_field);
  this.current_goal_div.appendChild(this.target_date_row);
  
  this.due_date_row = document.createElement("div");
  this.due_date_row.className = "pb-1 row";

  this.due_date_label = document.createElement("label");
  this.due_date_label.className = "label label-default col-sm-3";
  this.due_date_label.innerHTML = "Due Date";

  this.due_date_row.appendChild(this.due_date_label);
  this.due_date_field = document.createElement("input");
  this.due_date_field.className = "col-sm-6";
  this.due_date_picker = flatpickr(this.due_date_field,
    {
      defaultDate: null,
      disableMobile: true
    }
  );

  this.due_date_row.appendChild(this.due_date_field);
  this.current_goal_div.appendChild(this.due_date_row);

  this.parent_goals_row = document.createElement("div");
  this.parent_goals_row.className = "pb-1 row";

  this.parent_goals_label = document.createElement("label");
  this.parent_goals_label.className = "label label-default col-sm-3";
  this.parent_goals_label.innerHTML = "Parent Goals";
  this.parent_goals_row.appendChild(this.parent_goals_label);

  this.parent_goals_dropdown = document.createElement("select")
  this.parent_goals_dropdown.className = "js-example-basic-multiple";
  this.parent_goals_dropdown.setAttribute("multiple", "multiple");
  this.parent_goals_dropdown.id = "parent_goals_select";

  this.parent_goals_row.appendChild(this.parent_goals_dropdown);
  this.current_goal_div.appendChild(this.parent_goals_row);

  // Buttons for saving/canceling the current goal
  this.current_goal_buttons_row = document.createElement("div");
  this.current_goal_buttons_row.className = "row justify-content-center";

  this.save_button = document.createElement("button");
  this.save_button.className = "btn btn-primary";
  this.save_button.innerHTML = "Save";
  this.save_button.addEventListener("click", this.save_clicked.bind(this));

  this.cancel_delete_button = document.createElement("button");
  this.cancel_delete_button.className = "btn btn-primary";
  this.cancel_delete_button.innerHTML = "Cancel";
  this.cancel_delete_button.addEventListener(
    "click", this.cancel_delete_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.save_button);
  this.current_goal_buttons_row.appendChild(this.cancel_delete_button);

  this.current_goal_div.appendChild(this.current_goal_buttons_row);

  this.grid_header_row.appendChild(this.current_goal_div);

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

  this.goals_table_div = document.createElement("div");
  this.goals_table_div.className = "col-sm-12";
  this.tab_content.appendChild(this.goals_table_div);

  this.tab_content_div.appendChild(this.tab_content);

  this.current_goal_id = null;

  this.update_statuses()
  .then(this.update_goals.bind(this));

  $(document).ready(function() {
    $(".js-example-basic").select2();
    $("#current_goal_status_select").select2(
      {
        width: "75%"
      }
    );
    $(".js-example-basic-multiple").select2();
    $("#active_statuses_select").select2(
      {
        width: "50%",
        maximumSelectionLength: 6
      }
    );
    $("#parent_goals_select").select2(
      {
        width: "75%"
      }
    );
  });
};

Home_Tab.prototype.update_statuses = function() {

  var promise = this.connector.get_statuses()
  .then(function(statuses) {

    this.statuses = statuses;
    this.status_id_map = {};

    for(var status_index = 0; status_index < this.statuses.length;
      status_index++) {

      let status = this.statuses[status_index];

      let date_range = Util.get_date_range_for_status(status);

      console.log(date_range);

      this.status_id_map[status._id] = status;
    }

    this.update_status_dropdown();
  }.bind(this));

  return promise;
};

Home_Tab.prototype.update_goals = function() {

  this.connector.get_goals()
  .then(function(goals) {

    $("#parent_goals_select").empty().trigger("change");

    this.goals = goals;
    this.goal_id_map = {};

    for(var goal_index = 0; goal_index < this.goals.length;
      goal_index++) {

      let goal = this.goals[goal_index];

      this.goal_id_map[goal._id] = goal;

      let option = new Option(goal.name, goal._id, false, false);
      $("#parent_goals_select").append(option).trigger("change");
    }

    if(this.current_goal_id !== null) {
      let current_goal = this.goal_id_map[this.current_goal_id];
      $("#parent_goals_select").val(current_goal.parent_goal_ids).trigger("change");
    }

    this.update_goals_table();

  }.bind(this));
};

Home_Tab.prototype.update_status_dropdown = function() {

  default_status_strings = 
    ["Uncategorized", "This Week", "Tomorrow", "Today", "Doing"];

  default_status_ids = []

  $("#active_statuses_select").empty().trigger("change");
  $("#current_goal_status_select").empty().trigger("change");

  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    var status = this.statuses[status_index];

    if(default_status_strings.indexOf(status.name) > -1) {
      default_status_ids.push(status._id);
    }

    var option = new Option(status.name, status._id, false, false);
    $("#current_goal_status_select").append(option).trigger("change");

    option = new Option(status.name, status._id, false, false);
    $("#active_statuses_select").append(option).trigger("change");
  }
  
  $("#active_statuses_select").val(default_status_ids).trigger("change");
};

Home_Tab.prototype.save_clicked = function() {

  if(this.current_goal_name_field.value.length === 0) {
    alert("Must specify a name for an goal");
    return;
  }

  let selected_status_index = 
    $("#current_goal_status_select").find(":selected")[0].index;

  let selected_status = this.statuses[selected_status_index];

  // If the current goal id is null, we are creating a new goal
  if(this.current_goal_id === null) {

    let new_goal = {};
    new_goal.name = this.current_goal_name_field.value;
    new_goal.status_id = selected_status._id;
    new_goal.target_date = this.target_date_picker.selectedDates[0];
    new_goal.due_date = this.due_date_picker.selectedDates[0];
    new_goal.parent_goal_ids = $("#parent_goals_select").val();

    this.connector.post_goal(new_goal)
    .then(function(new_goal) {
      this.new_goal_clicked();
      return this.update_goals();
    }.bind(this));
  }
  else {

    let current_goal = this.goal_id_map[this.current_goal_id];
    current_goal.name = this.current_goal_name_field.value;
    current_goal.status_id = selected_status._id;
    current_goal.target_date = this.target_date_picker.selectedDates[0];
    current_goal.due_date = this.due_date_picker.selectedDates[0];
    current_goal.parent_goal_ids = $("#parent_goals_select").val();

    this.connector.put_goal(current_goal._id, current_goal)
    .then(function() {
      return this.update_goals();
    }.bind(this));
  }
};

Home_Tab.prototype.cancel_delete_clicked = function() {

  if(this.current_goal_name_field.value.length === 0) {
    alert("Must specify a name for an goal");
    return;
  }

  let selected_status_index = 
    $("#current_goal_status_select").find(":selected")[0].index;

  let selected_status = this.statuses[selected_status_index];

  // If the current goal id is null, we are creating a new goal
  if(this.current_goal_id === null) {

    return this.new_goal_clicked();
  }
  else {

    let current_goal = this.goal_id_map[this.current_goal_id];
    current_goal.name = this.current_goal_name_field.value;
    current_goal.status_id = selected_status._id;
    current_goal.target_date = this.target_date_picker.selectedDates[0];
    current_goal.due_date = this.due_date_picker.selectedDates[0];

    this.connector.delete_goal(current_goal._id)
    .then(function() {
      this.new_goal_clicked();
      return this.update_goals();
    }.bind(this));
  }

};

Home_Tab.prototype.update_goals_table = function() {

  while(this.goals_table_div.firstChild) {
    this.goals_table_div.removeChild(
      this.goals_table_div.firstChild);
  }

  if(this.goals.length === 0) {
    return;
  }

  this.goals_table_row = document.createElement("div");
  this.goals_table_row.className = "row justify-content-center";

  this.status_divs_by_id = {};

  let selected_status_ids = $("#active_statuses_select").val();

  // let selected_statuses = 

  for(var status_index = 0; status_index < selected_status_ids.length;
    status_index++) {

    let status = this.status_id_map[selected_status_ids[status_index]];

    var status_div = document.createElement("div");
    status_div.className = "col-sm-2 justify-content-center";

    let header_label = document.createElement("h5");
    header_label.innerHTML = status.name;
    header_label.align = "center";

    status_div.appendChild(header_label);

    this.status_divs_by_id[status._id] = status_div;

    this.goals_table_row.appendChild(status_div);
  }

  for(var goal_index = 0; goal_index < this.goals.length;
    goal_index++) {

    let goal = this.goals[goal_index];

    if(!(goal.status_id in this.status_divs_by_id)) {
      continue;
    }

    let status_div = this.status_divs_by_id[goal.status_id];

    let goal_button = document.createElement("button");
    goal_button.className = "btn btn-outline-primary btn-lg btn-block";
    goal_button.setAttribute("width", "100%");
    goal_button.innerHTML = goal.name;
    // Allow text wrapping
    goal_button.style["white-space"] = "normal";
    goal_button.addEventListener(
      "click", this.goal_clicked.bind(this, goal._id));

    status_div.appendChild(goal_button);
  }

  this.goals_table_div.appendChild(this.goals_table_row);
};

Home_Tab.prototype.goal_clicked = function(goal_id) {
  
  this.current_goal_id = goal_id;
  let current_goal = this.goal_id_map[goal_id];
  this.current_goal_id_field.value = goal_id;
  this.current_goal_name_field.value = current_goal.name;
  this.cancel_delete_button.innerHTML = "Delete";

  $("#current_goal_status_select").val(
    current_goal.status_id).trigger("change");

  if(current_goal.target_date === null) {
    this.target_date_picker.setDate(null);
  }
  else {
    this.target_date_picker.setDate(current_goal.target_date);
  }

  if(current_goal.due_date === null) {
    this.due_date_picker.setDate(null);
  }
  else {
    this.due_date_picker.setDate(current_goal.due_date);
  }

  $("#parent_goals_select").val(current_goal.parent_goal_ids).trigger("change");
};

Home_Tab.prototype.new_goal_clicked = function() {

  this.current_goal_id = null;
  this.current_goal_id_field.value = "";
  this.current_goal_name_field.value = "";

  $("#current_goal_status_select").val(
    this.statuses[0]._id).trigger("change");

  this.target_date_picker.setDate(null);
  this.due_date_picker.setDate(null);

  this.cancel_delete_button.innerHTML = "Cancel";

  $("#parent_goals_select").empty().trigger("change");
};