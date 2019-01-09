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
  this.current_goal_div.className = "col-sm-6  border";

  // The current goal id field
  this.current_goal_id_row = document.createElement("div");
  this.current_goal_id_row.className = "pt-1 pb-1 row";

  this.current_goal_header = document.createElement("h3");
  this.current_goal_header.innerHTML = "Current Goal";

  this.current_goal_id_row.appendChild(this.current_goal_header);

  this.new_goal_button = document.createElement("button");
  this.new_goal_button.className = "btn btn-primary mx-auto float-right";
  this.new_goal_button.innerHTML = "New Goal";
  this.new_goal_button.addEventListener(
    "click", this.new_goal_clicked.bind(this));
  this.current_goal_id_row.appendChild(this.new_goal_button);

  this.new_subgoal_button = document.createElement("button");
  this.new_subgoal_button.className = "btn btn-primary float-right invisible";
  this.new_subgoal_button.innerHTML = "New Subgoal";
  this.new_subgoal_button.addEventListener(
    "click", this.new_subgoal_clicked.bind(this));
  
  this.current_goal_id_row.appendChild(this.new_subgoal_button);

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
  
  // this.due_date_row = document.createElement("div");
  // this.due_date_row.className = "pb-1 row";

  // this.due_date_label = document.createElement("label");
  // this.due_date_label.className = "label label-default col-sm-3";
  // this.due_date_label.innerHTML = "Due Date";

  // this.due_date_row.appendChild(this.due_date_label);
  // this.due_date_field = document.createElement("input");
  // this.due_date_field.className = "col-sm-6";
  // this.due_date_picker = flatpickr(this.due_date_field,
  //   {
  //     defaultDate: null,
  //     disableMobile: true
  //   }
  // );

  // this.due_date_row.appendChild(this.due_date_field);
  // this.current_goal_div.appendChild(this.due_date_row);
  
  this.completed_date_row = document.createElement("div");
  this.completed_date_row.className = "pb-1 row d-none";

  this.completed_date_label = document.createElement("label");
  this.completed_date_label.className = "label label-default col-sm-3";
  this.completed_date_label.innerHTML = "Completed On";

  this.completed_date_row.appendChild(this.completed_date_label);
  this.completed_date_field = document.createElement("input");
  this.completed_date_field.className = "col-sm-6";
  this.completed_date_picker = flatpickr(this.completed_date_field,
    {
      defaultDate: null,
      disableMobile: true
    }
  );

  this.completed_date_row.appendChild(this.completed_date_field);

  this.current_goal_div.appendChild(this.completed_date_row);
  
  this.abandoned_date_row = document.createElement("div");
  this.abandoned_date_row.className = "pb-1 row d-none";

  this.abandoned_date_label = document.createElement("label");
  this.abandoned_date_label.className = "label label-default col-sm-3";
  this.abandoned_date_label.innerHTML = "Completed On";

  this.abandoned_date_row.appendChild(this.abandoned_date_label);
  this.abandoned_date_field = document.createElement("input");
  this.abandoned_date_field.className = "col-sm-6";
  this.abandoned_date_picker = flatpickr(this.abandoned_date_field,
    {
      defaultDate: null,
      disableMobile: true
    }
  );

  this.completed_date_row.appendChild(this.abandoned_date_field);

  this.current_goal_div.appendChild(this.completed_date_row);

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

  this.recurrence_row = document.createElement("div");
  this.recurrence_row.className = "row";

  this.recurrence_label = document.createElement("label");
  this.recurrence_label.className = "label label-default col-sm-3";
  this.recurrence_label.innerHTML = "Recurrence";

  this.recurrence_row.appendChild(this.recurrence_label);

  this.recurrence_rate_field = document.createElement("input");
  this.recurrence_rate_field.className = "col-sm-2";
  this.recurrence_rate_field.type = "number";
  this.recurrence_row.appendChild(this.recurrence_rate_field);

  this.recurrence_time_unit_field = document.createElement("select");
  this.recurrence_time_unit_field.className = "js-example-basic";
  this.recurrence_time_unit_field.id = "recurrence_time_unit_select";

  this.recurrence_row.appendChild(this.recurrence_time_unit_field);

  this.current_goal_div.appendChild(this.recurrence_row);

  // Buttons for saving/canceling the current goal
  this.current_goal_buttons_row = document.createElement("div");
  this.current_goal_buttons_row.className = "row justify-content-center";

  this.save_button = document.createElement("button");
  this.save_button.className = "btn btn-primary";
  this.save_button.innerHTML = "Save";
  this.save_button.addEventListener("click", this.save_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.save_button);

  this.complete_button = document.createElement("button");
  this.complete_button.className = "btn btn-primary";
  this.complete_button.innerHTML = "Complete";
  this.complete_button.addEventListener(
    "click", this.complete_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.complete_button);

  this.abandon_button = document.createElement("button");
  this.abandon_button.className = "btn btn-primary";
  this.abandon_button.innerHTML = "Abandon";
  this.abandon_button.addEventListener(
    "click", this.abandon_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.abandon_button);

  this.cancel_delete_button = document.createElement("button");
  this.cancel_delete_button.className = "btn btn-primary";
  this.cancel_delete_button.innerHTML = "Cancel";
  this.cancel_delete_button.addEventListener(
    "click", this.cancel_delete_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.cancel_delete_button);

  this.set_active_button = document.createElement("button");
  this.set_active_button.className = "btn btn-primary";
  this.set_active_button.innerHTML = "Make Active";
  this.set_active_button.addEventListener(
    "click", this.set_active_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.set_active_button);

  this.current_goal_div.appendChild(this.current_goal_buttons_row);

  this.grid_header_row.appendChild(this.current_goal_div);

  this.grid_filter_div = document.createElement("div");
  this.grid_filter_div.className = "col-sm-6 border";

  this.grid_filter_div_header = document.createElement("h3");
  this.grid_filter_div_header.className = "pt-1";
  this.grid_filter_div_header.innerHTML = "Filters";

  this.grid_filter_div.appendChild(this.grid_filter_div_header);


  this.active_statuses_row = document.createElement("div");
  this.active_statuses_row.className = "row justify-content-center";

  this.active_statuses_label = document.createElement("label");
  this.active_statuses_label.innerHTML = "Active Statuses";
  this.active_statuses_label.className = "pr-1";
  this.active_statuses_row.appendChild(this.active_statuses_label);

  this.active_statuses_dropdown = document.createElement("select")
  this.active_statuses_dropdown.className = "js-example-basic-multiple";
  this.active_statuses_dropdown.setAttribute("multiple", "multiple");
  this.active_statuses_dropdown.id = "active_statuses_select";

  this.active_statuses_row.appendChild(this.active_statuses_dropdown);

  this.grid_filter_div.appendChild(this.active_statuses_row);

  this.parent_goal_filter_row = document.createElement("div");
  this.parent_goal_filter_row.className = "row justify-content-center";

  this.parent_goal_filter_label = document.createElement("label");
  this.parent_goal_filter_label.className = "pr-1";
  this.parent_goal_filter_label.innerHTML = "Parent Goal";
  this.parent_goal_filter_row.appendChild(this.parent_goal_filter_label);

  this.parent_goal_filter_dropdown = document.createElement("select")
  this.parent_goal_filter_dropdown.className = "js-example-basic";
  this.parent_goal_filter_dropdown.setAttribute("multiple", "multiple");
  this.parent_goal_filter_dropdown.id = "parent_goal_filter_select";

  this.parent_goal_filter_row.appendChild(this.parent_goal_filter_dropdown);

  this.grid_filter_div.appendChild(this.parent_goal_filter_row);

  this.parent_goal_filter_options_row = document.createElement("div");
  this.parent_goal_filter_options_row.className = "row justify-content-center";

  this.filter_by_current_button_column = document.createElement("div");
  this.filter_by_current_button_column.className = "col col-md-auto";

  this.filter_by_current_button = document.createElement("button");
  this.filter_by_current_button.className = "btn btn-secondary";
  this.filter_by_current_button.innerHTML = "Filter by Current";

  this.filter_by_current_button.addEventListener("click",
    this.filter_by_current_clicked.bind(this));

  this.filter_by_current_button_column
    .appendChild(this.filter_by_current_button);

  this.parent_goal_filter_options_row.appendChild(this.filter_by_current_button_column);

  this.go_up_button_column = document.createElement("div");
  this.go_up_button_column.className = "col col-md-auto";

  this.go_up_button = document.createElement("button");
  this.go_up_button.className = "btn btn-secondary";
  this.go_up_button.innerHTML = "Go Up";

  this.go_up_button.addEventListener("click",
    this.go_up_clicked.bind(this));

  this.filter_by_current_button_column
    .appendChild(this.go_up_button);

  this.parent_goal_filter_options_row.appendChild(
    this.go_up_button_column);

  this.spacer_div = document.createElement("div");
  this.spacer_div.className = "col-md-1";
  this.parent_goal_filter_options_row.appendChild(this.spacer_div);

  this.parent_goal_recursive_div = document.createElement("div");
  this.parent_goal_recursive_div.className = "form-check my-auto";

  this.parent_goal_recursive_checkbox = document.createElement("input");
  this.parent_goal_recursive_checkbox.id = "parent_goal_recursive_checkbox";
  this.parent_goal_recursive_checkbox.className = "form-check-input";
  this.parent_goal_recursive_checkbox.setAttribute("type", "checkbox");
  this.parent_goal_recursive_checkbox.checked = true;
  this.parent_goal_recursive_checkbox.addEventListener("click",
    this.parent_filters_changed.bind(this));

  this.parent_goal_recursive_div
    .appendChild(this.parent_goal_recursive_checkbox);

  this.parent_goal_recursive_label = document.createElement("label");
  this.parent_goal_recursive_label.innerHTML = "Recursive";
  this.parent_goal_recursive_label.className = "form-check-label";
  this.parent_goal_recursive_label.setAttribute("for", "parent_goal_recursive_checkbox");

  this.parent_goal_recursive_div
    .appendChild(this.parent_goal_recursive_label);

  this.parent_goal_filter_options_row.appendChild(this.parent_goal_recursive_div);

  this.grid_filter_div.appendChild(this.parent_goal_filter_options_row);

  // Additional options box
  this.additional_filter_options_row = document.createElement("div");
  this.additional_filter_options_row.className = "row justify-content-center";

  this.hide_non_leaf_div = document.createElement("div");
  this.hide_non_leaf_div.className = "form-check";

  this.hide_non_leaf_checkbox = document.createElement("input");
  this.hide_non_leaf_checkbox.id = "hide_non_leaf_checkbox";
  this.hide_non_leaf_checkbox.className = "form-check-input";
  this.hide_non_leaf_checkbox.setAttribute("type", "checkbox");
  this.hide_non_leaf_checkbox.checked = false;
  this.hide_non_leaf_checkbox.addEventListener("click",
    this.parent_filters_changed.bind(this));

  this.hide_non_leaf_div.appendChild(this.hide_non_leaf_checkbox);

  this.hide_non_leaf_label = document.createElement("label");
  this.hide_non_leaf_label.innerHTML = "Hide Non-Leaf Nodes";
  this.hide_non_leaf_label.className = "form-check-label text-nowrap";
  this.hide_non_leaf_label.setAttribute("for", "hide_non_leaf_checkbox");

  this.hide_non_leaf_div.appendChild(this.hide_non_leaf_label);

  this.additional_filter_options_row.appendChild(this.hide_non_leaf_div);

  this.grid_filter_div.appendChild(this.additional_filter_options_row);

  // Add the filter dive to the page header
  this.grid_header_row.appendChild(this.grid_filter_div);

  this.tab_content.appendChild(this.grid_header_row);

  this.goals_table_div = document.createElement("div");
  this.goals_table_div.className = "col-sm-12 pt-2";
  this.tab_content.appendChild(this.goals_table_div);

  this.tab_content_div.appendChild(this.tab_content);

  this.current_goal_id = null;

  this.filter_goal_ids = [];

  this.update_statuses()
  .then(this.update_recurrence_dropdown.bind(this))
  .then(this.update_goals.bind(this))
  .then(function() {

    $(document).ready(function() {
      $(".js-example-basic").select2();
      $("#current_goal_status_select").select2(
        {
          width: "75%",
          allowClear: true,
          placeholder: "Select status"
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
      $("#active_statuses_select")
        .on("change", this.update_goals_table.bind(this));
      $("#parent_goal_filter_select").select2(
        {
          width: "50%"
        }
      );
      $("#recurrence_time_unit_select").select2(
        {
          allowClear: true,
          width: "25%",
          placeholder: "Select time unit"
        }
      );
      $("#parent_goal_filter_select").on("change",
        this.parent_filters_changed.bind(this));
    }.bind(this));
  }.bind(this));
};

Home_Tab.prototype.update_statuses = function() {

  var promise = this.connector.get_statuses()
  .then(function(statuses) {

    this.unsorted_statuses = statuses;
    this.status_id_map = {};
    this.statuses = [];

    for(var status_index = 0; status_index < this.unsorted_statuses.length;
      status_index++) {

      let status = this.unsorted_statuses[status_index];

      this.status_id_map[status._id] = status;
    }

    while(this.unsorted_statuses.length > 0) {

      let earliest_status = this.unsorted_statuses[0];
      let earliest_status_index = 0;
      let earliest_status_range = 
        Util.get_date_range_for_status(earliest_status);

      // Find the earliest status
      for(var status_index = 1; status_index < this.unsorted_statuses.length;
        status_index++) {

        let status = this.unsorted_statuses[status_index];

        let date_range = Util.get_date_range_for_status(status);

        if(earliest_status_range.end === null) {

          if(date_range.end === null) {

            if(earliest_status_range.start === null) {

              if(date_range.start === null) {
                // If everything is null, the earliest is by index
                continue;
              }
              else {

              }
            }
            else {

            }
          }
          else {
            earliest_status = status;
            earliest_status_index = status_index;
            earliest_status_range = date_range;
          }
        }
        else {

          // If the earliest has an end, but this one doesn't, we leave it
          if(date_range.end === null) {
            continue;
          }
          else {
            if(date_range.end < earliest_status_range.end) {
              earliest_status = status;
              earliest_status_index = status_index;
              earliest_status_range = date_range;
            }
          }
        }
      }

      this.unsorted_statuses.splice(earliest_status_index, 1);

      this.statuses.push(earliest_status);

    }

    this.update_status_dropdown();
  }.bind(this));

  return promise;
};

Home_Tab.prototype.update_goals = function() {

  return this.connector.get_goals()
  .then(function(goals) {

    let old_filter_goal_ids = this.filter_goal_ids;

    $("#parent_goals_select").empty().trigger("change");
    $("#parent_goal_filter_select").empty().trigger("change");

    this.goals = goals;
    this.goal_id_map = {};
    this.active_goal_ids = [];
    this.parent_goal_id_set = {};

    for(var goal_index = 0; goal_index < this.goals.length;
      goal_index++) {

      let goal = this.goals[goal_index];

      for(let parent_goal_index = 0;
        parent_goal_index < goal.parent_goal_ids.length;
        parent_goal_index++) {

        this.parent_goal_id_set[goal.parent_goal_ids[parent_goal_index]] = 1;
      }

      this.goal_id_map[goal._id] = goal;

      if(goal.is_active) {
        this.active_goal_ids.push(goal._id);
      }

      if(goal.completed_on !== null || goal.abandoned_on !== null) {
        continue;
      }

      let option = new Option(goal.name, goal._id, false, false);
      $("#parent_goals_select").append(option).trigger("change");

      option = new Option(goal.name, goal._id, false, false);
      $("#parent_goal_filter_select").append(option).trigger("change");
    }

    if(this.current_goal_id !== null) {
      let current_goal = this.goal_id_map[this.current_goal_id];
      $("#parent_goals_select").val(current_goal.parent_goal_ids)
        .trigger("change");
    }

    this.filter_goal_ids = [];

    for(var goal_index = 0; goal_index < old_filter_goal_ids.length;
      goal_index++) {

      if(old_filter_goal_ids[goal_index] in this.goal_id_map) {
        this.filter_goal_ids.push(old_filter_goal_ids[goal_index]);
      }
    }

    $("#parent_goal_filter_select").val(this.filter_goal_ids).trigger("change");

    this.update_goals_table();

  }.bind(this));
};

Home_Tab.prototype.update_recurrence_dropdown = function() {

  var recurrence_time_unit_names = {
    "Day": "day",
    "Week": "isoWeek",
    "Month": "month",
    "Year": "year"
  };

  for(var recurrence_time_unit_name in recurrence_time_unit_names) {

    var option = new Option(recurrence_time_unit_name,
      recurrence_time_unit_names[recurrence_time_unit_name], false, false);

    $("#recurrence_time_unit_select").append(option).trigger("change");
  }
  
  $("#recurrence_time_unit_select").val(null).trigger("change");
};

Home_Tab.prototype.update_status_dropdown = function() {

  default_status_ids = []

  $("#active_statuses_select").empty().trigger("change");
  $("#current_goal_status_select").empty().trigger("change");

  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    var status = this.statuses[status_index];

    default_status_ids.push(status._id);

    var option = new Option(status.name, status._id, false, false);
    $("#current_goal_status_select").append(option).trigger("change");

    option = new Option(status.name, status._id, false, false);
    $("#active_statuses_select").append(option).trigger("change");
  }
  
  $("#active_statuses_select").val(default_status_ids).trigger("change");
  $("#current_goal_status_select").val(null).trigger("change");
};

Home_Tab.prototype.save_clicked = function() {

  // Check whether this is a newly created goal; if it is, we'll clear the
  // fields once saved
  var is_new_goal = this.current_goal_id === null;

  return this.save_current()
  .then(function() {
    if(is_new_goal) {
      return this.new_goal_clicked();
    }
  }.bind(this)
  ).catch(function() {
    return;
  });
};

Home_Tab.prototype.save_current = function() {

  if(this.current_goal_name_field.value.length === 0) {
    alert("Must specify a name for an goal");
    return Promise.reject();
  }

  let selected_status_option =
    $("#current_goal_status_select").find(":selected");
  let selected_status_id = null;
  let selected_status = null;

  if(selected_status_option.length > 0) {
    let selected_status_index = selected_status_option[0].index;
    selected_status = this.statuses[selected_status_index];
    selected_status_id = selected_status._id;
  }

  let completed_on = null;

  if(this.completed_date_picker.selectedDates.length > 0) {
    completed_on = this.completed_date_picker.selectedDates[0];
  }

  let abandoned_on = null;

  if(this.abandoned_date_picker.selectedDates.length > 0) {
    abandoned_on = this.abandoned_date_picker.selectedDates[0];
  }

  let target_date = null;

  if(this.target_date_picker.selectedDates.length > 0) {
    target_date = this.target_date_picker.selectedDates[0];
  }

  if(selected_status_id === null && target_date === null) {
    alert("Must specify either a status or a target date");
    return Promise.reject();
  }

  let recurrence_rate = this.recurrence_rate_field.value;

  if(recurrence_rate === "") {
    recurrence_rate = null;
  }

  if(recurrence_rate !== null) {
    if(!isFinite(recurrence_rate) || recurrence_rate <= 0) {
      console.log(recurrence_rate)
      alert("Recurrence rate must be a number greater than 0!");
      return Promise.reject();
    }
    recurrence_rate = parseInt(recurrence_rate);
  }

  let recurrence_time_unit_option =
    $("#recurrence_time_unit_select").find(":selected");
  let recurrence_time_unit = null;

  if(recurrence_time_unit_option.length > 0) {
    recurrence_time_unit = recurrence_time_unit_option[0].value;
  }

  if((recurrence_time_unit !== null && recurrence_rate === null) ||
    (recurrence_time_unit === null && recurrence_rate !== null)) {
      alert("Must specify both recurrence rate and time unit or neither");
      return Promise.reject();
  }

  // TODO: allow it if they don't conflict
  if(selected_status_id !== null && target_date !== null) {
    alert("Can't specify both a target date and a status!");
    return Promise.reject();
  }

  // Find the target date given this status
  if(selected_status_id !== null) {

    if(selected_status.time_unit !== null) {
      time_range = Util.get_date_range_for_status(selected_status);

      target_date = time_range.end;
      selected_status_id = null;
    }
  }

  // If the current goal id is null, we are creating a new goal
  if(this.current_goal_id === null) {

    let new_goal = {};
    new_goal.name = this.current_goal_name_field.value;
    new_goal.status_id = selected_status_id;
    new_goal.target_date = target_date;
    // new_goal.due_date = this.due_date_picker.selectedDates[0];
    new_goal.due_date = null;
    new_goal.parent_goal_ids = $("#parent_goals_select").val();
    new_goal.completed_on = completed_on;
    new_goal.abandoned_on = abandoned_on;
    new_goal.recurrence_time_unit = recurrence_time_unit;
    new_goal.recurrence_rate = recurrence_rate;

    return this.connector.post_goal(new_goal)
    .then(function(new_goal) {
      return this.update_goals();
    }.bind(this));
  }
  else {

    let current_goal = this.goal_id_map[this.current_goal_id];
    current_goal.name = this.current_goal_name_field.value;
    current_goal.status_id = selected_status_id;
    current_goal.target_date = target_date;
    // current_goal.due_date = this.due_date_picker.selectedDates[0];
    current_goal.due_date = null;
    current_goal.parent_goal_ids = $("#parent_goals_select").val();
    current_goal.completed_on = completed_on;
    current_goal.abandoned_on = abandoned_on;
    current_goal.recurrence_time_unit = recurrence_time_unit;
    current_goal.recurrence_rate = recurrence_rate;

    return this.connector.put_goal(current_goal._id, current_goal)
    .then(function() {
      return this.update_goals();
    }.bind(this));
  }
};

Home_Tab.prototype.cancel_delete_clicked = function() {

  // If the current goal id is null, we are creating a new goal
  if(this.current_goal_id === null) {
    return this.new_goal_clicked();
  }
  else {

    let current_goal = this.goal_id_map[this.current_goal_id];

    this.connector.delete_goal(current_goal._id)
    .then(function() {
      this.new_goal_clicked();
      return this.update_goals();
    }.bind(this));
  }

};

Home_Tab.prototype.set_active_clicked = function() {

  var promise = Promise.resolve();

  // If the current goal id is null, save it and make it active
  if(this.current_goal_id === null) {
    promise = promise.then(this.save_current.bind(this));
  }

  promise = promise.then(function() {

    if (this.current_goal_id === null) {
      return Promise.resolve();
    }

    let current_goal = this.goal_id_map[this.current_goal_id];

    if(current_goal.is_active) {

      current_goal.is_active = false;
      this.set_active_button.innerHTML = "Make Active";
      return this.connector.put_goal(current_goal._id, current_goal);
    }

    this.set_active_button.innerHTML = "Make Inactive";

    var update_promises = [];

    for(var goal_index = 0; goal_index < this.active_goal_ids.length;
      goal_index++) {

      let active_goal = this.goal_id_map[this.active_goal_ids[goal_index]];

      active_goal.is_active = false;

      update_promises.push(this.connector.put_goal(active_goal._id,
        active_goal));
    }

    current_goal.is_active = true;

    update_promises.push(this.connector.put_goal(current_goal._id,
      current_goal));

    return Promise.all(update_promises);

  }.bind(this))
  .then(this.update_goals.bind(this));

  return promise;

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

  let selected_statuses = [];

  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    let status = this.statuses[status_index];

    for(var selected_status_index = 0;
      selected_status_index < selected_status_ids.length;
      selected_status_index++) {

      let selected_status_id = selected_status_ids[selected_status_index];

      if(status._id === selected_status_id) {
        selected_statuses.push(status);
        break;
      }
    }
  }

  // Make all the status columns
  for(var status_index = 0; status_index < selected_statuses.length;
    status_index++) {

    let status = selected_statuses[status_index];

    var status_div = document.createElement("div");
    status_div.className = "col-sm-2 justify-content-center";

    let header_row = document.createElement("div");
    header_row.className = "row justify-content-center mb-2";

    let header_label = document.createElement("h5");
    header_label.innerHTML = status.name;
    header_label.align = "center";
    header_label.verticalAlign = "middle";

    header_row.appendChild(header_label);
    let header_move_to_button = document.createElement("button");
    header_move_to_button.className = "btn btn-secondary btn-sm";
    header_move_to_button.innerHTML = "&#11022"
    header_move_to_button.verticalAlign = "middle";
    header_move_to_button.addEventListener(
      "click", this.move_to_status_clicked.bind(this, status._id));

    header_row.appendChild(header_move_to_button);

    status_div.appendChild(header_row);

    this.status_divs_by_id[status._id] = status_div;

    this.goals_table_row.appendChild(status_div);
  }

  this.goal_buttons_by_id = {};

  // Add goals to respective columns
  for(var goal_index = 0; goal_index < this.goals.length;
    goal_index++) {

    let goal = this.goals[goal_index];

    if(!this.is_goal_in_filter(goal)) {
      continue;
    }

    let status_div = null;

    if(goal.status_id in this.status_divs_by_id) {
      status_div = this.status_divs_by_id[goal.status_id];
    }
    else if(goal.target_date === null) {
      continue;
    }
    else {

      let goal_target_date = new Date(goal.target_date);

      for(status_index = 0; status_index < selected_statuses.length;
        status_index++) {

        let status = selected_statuses[status_index];

        let status_range = Util.get_date_range_for_status(status);

        if(status_range.end === null) {
          continue;
        }

        if(goal_target_date <= status_range.end) {
          status_div = this.status_divs_by_id[status._id];
          break;
        }
      }
    }

    if(status_div === null) {
      continue;
    }

    let goal_button = document.createElement("button");
    goal_button.className = "btn btn-outline-primary btn-lg btn-block";

    if(goal._id === this.current_goal_id) {
      goal_button.className = "btn btn-outline-primary btn-lg btn-block active";
      goal_button.setAttribute("aria-pressed", true);
    }
    else if(goal.is_active) {
      goal_button.className = "btn btn-success btn-lg btn-block";
    }

    goal_button.setAttribute("width", "100%");
    goal_button.innerHTML = goal.name;
    // Allow text wrapping
    goal_button.style["white-space"] = "normal";
    goal_button.addEventListener(
      "click", this.goal_clicked.bind(this, goal._id));

    this.goal_buttons_by_id[goal._id] = goal_button;

    status_div.appendChild(goal_button);
  }

  this.goals_table_div.appendChild(this.goals_table_row);
};

Home_Tab.prototype.goal_clicked = function(goal_id) {

  if(this.current_goal_id !== null) {

    if(this.current_goal_id in this.goal_buttons_by_id) {
  
      let current_goal = this.goal_id_map[this.current_goal_id];
      let goal_button = this.goal_buttons_by_id[this.current_goal_id];

      if(current_goal.is_active) {
        goal_button.className = "btn btn-success btn-lg btn-block";
      }
      else {
        goal_button.className = "btn btn-outline-primary btn-lg btn-block";
      }

      goal_button.setAttribute("aria-pressed", false);
    }
  }

  this.new_subgoal_button.classList.remove("invisible");
  
  this.current_goal_id = goal_id;
  let current_goal = this.goal_id_map[goal_id];
  // this.current_goal_id_field.value = goal_id;
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

  // if(current_goal.due_date === null) {
  //   this.due_date_picker.setDate(null);
  // }
  // else {
  //   this.due_date_picker.setDate(current_goal.due_date);
  // }

  if(current_goal.completed_on === null) {
    this.completed_date_picker.setDate(null);
  }
  else {
    this.completed_date_picker.setDate(current_goal.completed_on);
  }

  if(current_goal.abandoned_on === null) {
    this.abandoned_date_picker.setDate(null);
  }
  else {
    this.abandoned_date_picker.setDate(current_goal.abandoned_on);
  }

  if(current_goal.is_active) {
    this.set_active_button.innerHTML = "Make Inactive";
  }
  else {
    this.set_active_button.innerHTML = "Make Active";
  }

  if(current_goal.recurrence_rate === null) {
    this.recurrence_rate_field.value = null;
  }
  else {
    this.recurrence_rate_field.value = current_goal.recurrence_rate;
  }

  if(current_goal.recurrence_time_unit === null) {
    $("#recurrence_time_unit_select").val(null).trigger("change");
  }
  else {
    $("#recurrence_time_unit_select").val(current_goal.recurrence_time_unit)
      .trigger("change");
  }

  $("#parent_goals_select").val(current_goal.parent_goal_ids).trigger("change");

  let goal_button = this.goal_buttons_by_id[goal_id];
  goal_button.className = "btn btn-outline-primary btn-lg btn-block active";
  goal_button.setAttribute("aria-pressed", true);
};

Home_Tab.prototype.new_goal_clicked = function() {

  if(this.current_goal_id !== null) {

    if(this.current_goal_id in this.goal_buttons_by_id) {
      let goal_button = this.goal_buttons_by_id[this.current_goal_id];
      goal_button.className = "btn btn-outline-primary btn-lg btn-block";
      goal_button.setAttribute("aria-pressed", false);
    }
  }

  this.current_goal_id = null;
  // this.current_goal_id_field.value = "";
  this.current_goal_name_field.value = "";

  this.new_subgoal_button.classList.add("invisible");

  $("#current_goal_status_select").val(null).trigger("change");

  this.target_date_picker.setDate(null);
  // this.due_date_picker.setDate(null);
  this.completed_date_picker.setDate(null);

  this.cancel_delete_button.innerHTML = "Cancel";
  this.set_active_button.innerHTML = "Make active";

  $("#parent_goals_select").val(null).trigger("change");
};

Home_Tab.prototype.new_subgoal_clicked = function() {

  let parent_goal_id = this.current_goal_id;

  this.new_goal_clicked();

  if(parent_goal_id !== null) {

    $("#parent_goals_select").val([parent_goal_id]).trigger("change");
  }
};

Home_Tab.prototype.filter_by_current_clicked = function() {

  if(this.current_goal_id !== null) {

    this.filter_goal_ids = [this.current_goal_id];

    $("#parent_goal_filter_select").val(this.filter_goal_ids).trigger("change");
  }
};

Home_Tab.prototype.go_up_clicked = function() {

  if(this.filter_goal_ids.length > 0) {

    let parent_goals_union = [];

    for(let filter_goal_index = 0;
      filter_goal_index < this.filter_goal_ids.length;
      filter_goal_index++) {

      let filter_goal_id = this.filter_goal_ids[filter_goal_index]

      let filter_goal = this.goal_id_map[filter_goal_id];

      for(let parent_goal_index = 0;
        parent_goal_index < filter_goal.parent_goal_ids.length;
        parent_goal_index++) {

        let parent_goal_id = filter_goal.parent_goal_ids[parent_goal_index];

        if(!parent_goals_union.includes(parent_goal_id)) {
          parent_goals_union.push(parent_goal_id);
        }
      }
    }

    this.filter_goal_ids = parent_goals_union;

    $("#parent_goal_filter_select").val(this.filter_goal_ids).trigger("change");
  }
};

Home_Tab.prototype.is_goal_in_filter = function(goal, ignore_depth) {

  if(ignore_depth === undefined) {
    ignore_depth = false;
  }

  if(goal.completed_on !== null || goal.abandoned_on !== null) {
    return false;
  }

  if(ignore_depth === false && this.hide_non_leaf_checkbox.checked) {
    if(goal._id in this.parent_goal_id_set) {
      return false;
    }
  }

  if(this.filter_goal_ids.length < 1) {
    if(this.parent_goal_recursive_checkbox.checked) {
      return true;
    }
    else {
      if(goal.parent_goal_ids.length === 0) {
        return true;
      }
    }
  }

  var is_in_filter = false;

  for(var goal_index = 0; goal_index < this.filter_goal_ids.length;
    goal_index++) {

    let filter_goal = this.goal_id_map[this.filter_goal_ids[goal_index]];

    if(goal.parent_goal_ids.includes(filter_goal._id)) {
      return true;
    }

    if(this.parent_goal_recursive_checkbox.checked) {
      for(var parent_goal_index = 0;
        parent_goal_index < goal.parent_goal_ids.length;
        parent_goal_index++) {

        let parent_goal_id = goal.parent_goal_ids[parent_goal_index];
        if(parent_goal_id in this.goal_id_map) {
          let parent_goal = this.goal_id_map[parent_goal_id];
          is_in_filter = 
            is_in_filter || this.is_goal_in_filter(parent_goal, true);
        }
      }
    }
  }

  return is_in_filter;

};

Home_Tab.prototype.parent_filters_changed = function() {

  this.filter_goal_ids = $("#parent_goal_filter_select").val();

  this.update_goals_table();
};

Home_Tab.prototype.complete_clicked = function() {

  if(this.current_goal_id === null) {
    return;
  }

  this.completed_date_picker.setDate(new Date());

  return this.save_clicked()
  .then(function() {
    return this.new_goal_clicked();
  }.bind(this));
};

Home_Tab.prototype.abandon_clicked = function() {

  if(this.current_goal_id === null) {
    return;
  }

  this.abandoned_date_picker.setDate(new Date());

  return this.save_clicked()
  .then(function() {
    return this.new_goal_clicked();
  }.bind(this));
};

Home_Tab.prototype.move_to_status_clicked = function(status_id) {

  if(this.current_goal_id === null) {
    return;
  }

  $("#current_goal_status_select").val(status_id).trigger("change");

  this.target_date_picker.setDate(null);

  return this.save_clicked();
};