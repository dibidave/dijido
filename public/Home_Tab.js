const MAX_COLUMNS = 6;

function Home_Tab(tab_header_div, tab_content_div, datastore) {

  this.tab_header = Tab_Header("Home", "#home", tab_header_div, true);

  this.tab_content_div = tab_content_div;
  this.datastore = datastore;

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "home");
  this.tab_content.className = "tab-pane fade active show container-fluid";

  this.grid_header_row = document.createElement("div");
  this.grid_header_row.className = "row";
  this.grid_header_row.id = "home_header";

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
      disableMobile: true,
      enableTime: true,
      defaultHour: 23,
      defaultMinute: 59
    }
  );

  this.target_date_row.appendChild(this.target_date_field);
  this.current_goal_div.appendChild(this.target_date_row);
  
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

  this.recurrence_fixed_div = document.createElement("div");
  this.recurrence_fixed_div.className = "form-check mx-auto my-auto";

  this.recurrence_fixed_checkbox = document.createElement("input");
  this.recurrence_fixed_checkbox.id = "recurrence_fixed_checkbox";
  this.recurrence_fixed_checkbox.className = "form-check-input";
  this.recurrence_fixed_checkbox.setAttribute("type", "checkbox");
  this.recurrence_fixed_checkbox.checked = false;

  this.recurrence_fixed_div
    .appendChild(this.recurrence_fixed_checkbox);

  this.recurrence_fixed_label = document.createElement("label");
  this.recurrence_fixed_label.innerHTML = "Fixed";
  this.recurrence_fixed_label.className = "form-check-label";
  this.recurrence_fixed_label.setAttribute("for", "recurrence_fixed_checkbox");

  this.recurrence_fixed_div
    .appendChild(this.recurrence_fixed_label);

  this.recurrence_row.appendChild(this.recurrence_fixed_div);

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
  this.set_active_button.innerHTML = "Set Active";
  this.set_active_button.addEventListener(
    "click", this.set_active_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.set_active_button);

  this.notes_button = document.createElement("button");
  this.notes_button.className = "btn btn-primary";
  this.notes_button.innerHTML = "Notes";
  this.notes_button.addEventListener(
    "click", this.notes_button_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.notes_button);

  this.set_organized_button = document.createElement("button");
  this.set_organized_button.className = "btn btn-primary invisible";
  this.set_organized_button.innerHTML = "Set Organized";
  this.set_organized_button.addEventListener(
    "click", this.set_organized_clicked.bind(this));

  this.current_goal_buttons_row.appendChild(this.set_organized_button);

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

  this.in_planning_mode = false;

  this.planning_mode_row = document.createElement("div");
  this.planning_mode_row.className = "row justify-content-center";

  this.planning_mode_button_column = document.createElement("div");
  this.planning_mode_button_column.className = "col col-md-auto";

  this.planning_mode_button = document.createElement("button");
  this.planning_mode_button.className = "btn btn-secondary";
  this.planning_mode_button.innerHTML = "Switch to Planning Mode";

  this.planning_mode_button.addEventListener("click",
    this.planning_mode_clicked.bind(this));

  this.planning_mode_button_column.appendChild(this.planning_mode_button);
  this.planning_mode_row.appendChild(this.planning_mode_button_column);
  this.grid_filter_div.appendChild(this.planning_mode_row);

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
    this.filter_by_goal_clicked.bind(this));

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
  this.hide_non_leaf_div.className = "col-md-3 form-check";

  this.hide_non_leaf_checkbox = document.createElement("input");
  this.hide_non_leaf_checkbox.id = "hide_non_leaf_checkbox";
  this.hide_non_leaf_checkbox.className = "form-check-input";
  this.hide_non_leaf_checkbox.setAttribute("type", "checkbox");
  this.hide_non_leaf_checkbox.checked = true;
  this.hide_non_leaf_checkbox.addEventListener("click",
    this.parent_filters_changed.bind(this));

  this.hide_non_leaf_div.appendChild(this.hide_non_leaf_checkbox);

  this.hide_non_leaf_label = document.createElement("label");
  this.hide_non_leaf_label.innerHTML = "Hide Non-Leaf";
  this.hide_non_leaf_label.className = "form-check-label text-nowrap";
  this.hide_non_leaf_label.setAttribute("for", "hide_non_leaf_checkbox");

  this.hide_non_leaf_div.appendChild(this.hide_non_leaf_label);

  this.additional_filter_options_row.appendChild(this.hide_non_leaf_div);
  
  this.hide_leaf_div = document.createElement("div");
  this.hide_leaf_div.className = "col-md-3 form-check";

  this.hide_leaf_checkbox = document.createElement("input");
  this.hide_leaf_checkbox.id = "hide_leaf_checkbox";
  this.hide_leaf_checkbox.className = "form-check-input";
  this.hide_leaf_checkbox.setAttribute("type", "checkbox");
  this.hide_leaf_checkbox.checked = false;
  this.hide_leaf_checkbox.addEventListener("click",
    this.parent_filters_changed.bind(this));

  this.hide_leaf_div.appendChild(this.hide_leaf_checkbox);

  this.hide_leaf_label = document.createElement("label");
  this.hide_leaf_label.innerHTML = "Hide Leaves";
  this.hide_leaf_label.className = "form-check-label text-nowrap";
  this.hide_leaf_label.setAttribute("for", "hide_leaf_checkbox");

  this.hide_leaf_div.appendChild(this.hide_leaf_label);

  this.additional_filter_options_row.appendChild(this.hide_leaf_div);


  this.hide_recurrent_div = document.createElement("div");
  this.hide_recurrent_div.className = "col-md-3 form-check";

  this.hide_recurrent_checkbox = document.createElement("input");
  this.hide_recurrent_checkbox.id = "hide_recurrent_checkbox";
  this.hide_recurrent_checkbox.className = "form-check-input";
  this.hide_recurrent_checkbox.setAttribute("type", "checkbox");
  this.hide_recurrent_checkbox.checked = true;
  this.hide_recurrent_checkbox.addEventListener("click",
    this.parent_filters_changed.bind(this));

  this.hide_recurrent_div.appendChild(this.hide_recurrent_checkbox);

  this.hide_recurrent_label = document.createElement("label");
  this.hide_recurrent_label.innerHTML = "Hide Recurrent";
  this.hide_recurrent_label.className = "form-check-label text-nowrap";
  this.hide_recurrent_label.setAttribute("for", "hide_recurrent_checkbox");

  this.hide_recurrent_div.appendChild(this.hide_recurrent_label);

  this.additional_filter_options_row.appendChild(this.hide_recurrent_div);

  this.grid_filter_div.appendChild(this.additional_filter_options_row);

  // Add the filter div to the page header
  this.grid_header_row.appendChild(this.grid_filter_div);

  this.tab_content.appendChild(this.grid_header_row);

  this.goals_table_row = document.createElement("div");
  this.goals_table_row.className = "row";
  this.goals_table_row.id = "goals_table";
  this.goals_table_row.style["overflow-y"] = "auto";
  this.goals_table_row.style["overflow-x"] = "hidden";
  this.tab_content.appendChild(this.goals_table_row);

  this.tab_content_div.appendChild(this.tab_content);

  this.notes_modal = document.createElement("div");
  this.notes_modal.id = "notes_modal";
  this.notes_modal.className = "modal fade";

  this.notes_modal_dialog = document.createElement("div");
  this.notes_modal_dialog.className = "modal-dialog";

  this.notes_modal_content = document.createElement("div");
  this.notes_modal_content.className = "modal-content";

  this.notes_modal_header = document.createElement("div");
  this.notes_modal_header.className = "modal-header";

  this.notes_modal_header_text = document.createElement("h5");
  this.notes_modal_header_text.className = "modal-title";
  this.notes_modal_header_text.innerHTML = "Notes";
  this.notes_modal_header.appendChild(this.notes_modal_header_text);

  this.close_notes_button = document.createElement("button");
  this.close_notes_button.className = "close";
  this.close_notes_button.addEventListener(
    "click", this.close_notes_button_clicked.bind(this));

  this.close_notes_symbol = document.createElement("span");
  this.close_notes_symbol.innerHTML = "&times";
  this.close_notes_button.appendChild(this.close_notes_symbol);

  this.notes_modal_header.appendChild(this.close_notes_button);

  this.notes_modal_content.appendChild(this.notes_modal_header);

  this.notes_modal_body = document.createElement("div");
  this.notes_modal_body.className = "modal-body";
  this.notes_modal_body.align = "center";

  this.notes_field = document.createElement("textarea");
  this.notes_field.className = "form-control py-3";
  this.notes_field.align = "center";
  this.notes_field.setAttribute("rows", 10);
  this.notes_modal_body.appendChild(this.notes_field);

  this.notes_modal_content.appendChild(this.notes_modal_body);

  this.notes_modal_footer = document.createElement("div");
  this.notes_modal_footer.className = "modal-footer";

  this.save_notes_button = document.createElement("button");
  this.save_notes_button.className = "btn btn-primary";
  this.save_notes_button.innerHTML = "Save";
  this.save_notes_button.addEventListener(
    "click", this.save_notes_clicked.bind(this));

  this.notes_modal_footer.appendChild(this.save_notes_button);

  this.notes_modal_content.appendChild(this.notes_modal_footer);
  this.notes_modal_dialog.appendChild(this.notes_modal_content);
  this.notes_modal.appendChild(this.notes_modal_dialog);

  this.tab_content_div.appendChild(this.notes_modal);

  this.current_goal_id = null;

  this.update_goals_timer = null;

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
          maximumSelectionLength: MAX_COLUMNS
        }
      );
      $("#parent_goals_select").select2(
        {
          width: "75%"
        }
      );
      $("#parent_goals_select").on("change",
        this.resize_goals_table.bind(this));
      $("#active_statuses_select")
        .on("change", this.update_goals_table.bind(this));
      $("#active_statuses_select").on("change",
        this.resize_goals_table.bind(this));
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
      $("#parent_goal_filter_select").on("change",
        this.resize_goals_table.bind(this));
      this.resize_goals_table();
      $(window).resize(function() {
        this.resize_goals_table();
      }.bind(this));

    }.bind(this));
  }.bind(this));
};

Home_Tab.prototype.resize_goals_table = function() {
  let new_height = $("#main_frame").outerHeight() - $("#home_header").outerHeight() - $("#navbar").outerHeight();
  $("#goals_table").height(new_height - 1);
};

Home_Tab.prototype.update_statuses = function() {

  var promise = this.datastore.get_statuses()
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

  if(this.update_goals_timer !== null) {
    clearTimeout(this.update_goals_timer);
  }

  return this.datastore.get_goals()
  .then(function(goals) {

    let old_filter_goal_ids = this.filter_goal_ids;

    $("#parent_goals_select").empty()
    $("#parent_goal_filter_select").empty()

    this.goals = goals;
    this.goal_id_map = {};
    this.active_goal_ids = [];
    this.parent_goal_id_set = {};
    this.next_goal_id = null;
    let time_now = new Date();
    this.child_goal_id_lookup = {};

    for(var goal_index = 0; goal_index < this.goals.length;
      goal_index++) {

      let goal = this.goals[goal_index];
      
      if(this.next_goal_id === null && goal.completed_on === null && goal.abandoned_on === null && goal.target_date !== null && time_now < new Date(goal.target_date)) {
        this.next_goal_id = goal._id;
      }

      for(let parent_goal_index = 0;
        parent_goal_index < goal.parent_goal_ids.length;
        parent_goal_index++) {

        let parent_goal_id = goal.parent_goal_ids[parent_goal_index];

        this.parent_goal_id_set[parent_goal_id] = 1;
        
        if(parent_goal_id in this.child_goal_id_lookup) {
          this.child_goal_id_lookup[parent_goal_id].push(goal._id);
        }
        else {
          this.child_goal_id_lookup[parent_goal_id] = [goal._id];
        }
      }

      this.goal_id_map[goal._id] = goal;

      if(goal.is_active) {
        this.active_goal_ids.push(goal._id);
        console.log(goal.name, " is active");
      }

      if(goal.completed_on !== null || goal.abandoned_on !== null) {
        continue;
      }

      let option = new Option(goal.name, goal._id, false, false);
      $("#parent_goals_select").append(option)

      option = new Option(goal.name, goal._id, false, false);
      $("#parent_goal_filter_select").append(option)
    }

    if(this.current_goal_id !== null) {
      let current_goal = this.goal_id_map[this.current_goal_id];
      $("#parent_goals_select").val(current_goal.parent_goal_ids)
        .trigger("change");
    }
    else {
      $("#parent_goals_select").val(null).trigger("change");
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

  }.bind(this)
  ).then(function() {
    setTimeout(this.update_goals.bind(this), 300000);
  }.bind(this));
};

Home_Tab.prototype.update_recurrence_dropdown = function() {

  var recurrence_time_unit_names = {
    "Hour": "hour",
    "Day": "day",
    "Workday": "workday",
    "Week": "week",
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

  let num_statuses_displayed = 0;
  
  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    var status = this.statuses[status_index];

    if(status.is_default && num_statuses_displayed < MAX_COLUMNS) {
      default_status_ids.push(status._id);
      num_statuses_displayed++;
    }

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
    else {
      this.goal_clicked(this.current_goal_id);
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

  if(recurrence_time_unit === null && this.recurrence_fixed_checkbox.checked) {
    alert("Fixed recurrence doesn't make sense if this task isn't recurring!");
    return Promise.reject();
  }

  // TODO: allow it if they don't conflict
  if(selected_status_id !== null && target_date !== null) {
    selected_status_id = null;
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
    new_goal.notes = this.notes_field.value;
    new_goal.status_id = selected_status_id;
    new_goal.target_date = target_date;
    // new_goal.due_date = this.due_date_picker.selectedDates[0];
    new_goal.due_date = null;
    new_goal.parent_goal_ids = $("#parent_goals_select").val();
    new_goal.completed_on = completed_on;
    new_goal.abandoned_on = abandoned_on;
    new_goal.recurrence_time_unit = recurrence_time_unit;
    new_goal.recurrence_rate = recurrence_rate;
    new_goal.is_recurrence_fixed = this.recurrence_fixed_checkbox.checked;
    new_goal.is_organized = true;

    return this.datastore.add_goal(new_goal)
    .then(function(new_goal) {
      return this.update_goals();
    }.bind(this));
  }
  else {

    let current_goal = this.goal_id_map[this.current_goal_id];
    current_goal.name = this.current_goal_name_field.value;
    current_goal.notes = this.notes_field.value;
    current_goal.status_id = selected_status_id;
    current_goal.target_date = target_date;
    // current_goal.due_date = this.due_date_picker.selectedDates[0];
    current_goal.due_date = null;
    current_goal.parent_goal_ids = $("#parent_goals_select").val();
    current_goal.completed_on = completed_on;
    current_goal.abandoned_on = abandoned_on;
    current_goal.recurrence_time_unit = recurrence_time_unit;
    current_goal.recurrence_rate = recurrence_rate;
    current_goal.is_recurrence_fixed = this.recurrence_fixed_checkbox.checked;
    current_goal.is_organized = true;

    return this.datastore.update_goal(current_goal._id, current_goal)
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

    if(current_goal._id in this.parent_goal_id_set) {
      alert("Can't delete a goal that has children! Change subgoals parent, or abandon this instead");
      return;
    }

    var promise = Promise.resolve();

    if(current_goal.is_active) {
      promise = promise.then(function() {
        return this.set_active_clicked();
      }.bind(this));
    }

    promise = promise.then(function() {
      return this.datastore.delete_goal(current_goal._id)
    }.bind(this))
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
      this.set_active_button.innerHTML = "Set Active";

      return this.datastore.get_unfinished_activity_by_goal_id(current_goal._id)
      .then(function(activities) {

        if(activities.length === 0) {
           alert("Something went wrong saving activity end, check logs.");
           return;
        }
        else {
          let activity = activities[0];
          activity.end_time = new Date();
          return this.datastore.update_activity(activity._id, activity);
        }
      }.bind(this))
      .then(function(current_goal) {
        return this.datastore.update_goal(current_goal._id, current_goal);
      }.bind(this, current_goal))
      .then(function(goal) {
        return this.update_goal_button(goal);
      }.bind(this));
    }

    this.set_active_button.innerHTML = "Set Inactive";

    var update_promises = [];

    for(var goal_index = 0; goal_index < this.active_goal_ids.length;
      goal_index++) {

      let active_goal = this.goal_id_map[this.active_goal_ids[goal_index]];

      active_goal.is_active = false;

      update_promises.push(this.datastore.get_unfinished_activity_by_goal_id(active_goal._id)
      .then(function(activities) {
        if(activities.length === 0) {
           alert("Something went wrong saving activity end, check logs.");
           return;
        }
        else {
          let activity = activities[0];
          activity.end_time = new Date();
          return this.datastore.update_activity(activity._id, activity);
        }
      }.bind(this)));

      update_promises.push(this.datastore.update_goal(active_goal._id,
        active_goal)
      .then(function(goal) {
        return this.update_goal_button(goal);
      }.bind(this)));
    }

    current_goal.is_active = true;
    
    let activity = {};
    activity.goal_id = current_goal._id;
    activity.start_time = new Date();
    activity.end_time = null;
    
    update_promises.push(this.datastore.add_activity(activity));

    update_promises.push(this.datastore.update_goal(current_goal._id,
      current_goal)
    .then(function(goal) {
      return this.update_goal_button(goal);
    }.bind(this)));

    return Promise.all(update_promises);

  }.bind(this))
  .then(this.update_goals.bind(this));

  return promise;

};

Home_Tab.prototype.update_goal_button = function(goal) {

  if(!this.goal_buttons_by_id.hasOwnProperty(goal._id)) {
    return;
  }

  var goal_button = this.goal_buttons_by_id[goal._id];

  while(goal_button.firstChild) {
    goal_button.removeChild(
      goal_button.firstChild);
  }

  let goal_container = document.createElement("div");
  goal_container.className = "row no-gutters";
  goal_container.style["overflow-y"] = "hidden";
  goal_container.style["overflow-x"] = "hidden";

  let goal_name_div = document.createElement("div");

  if(goal._id in this.parent_goal_id_set) {
    goal_name_div.className = "col-10 no-gutters";
  }
  else {
    goal_name_div.className = "col-12 no-gutters";
  }

  if(goal._id === this.current_goal_id) {
    goal_button.className = "btn active btn-outline-primary btn-lg " +
      "btn-block no-gutters";
    goal_button.setAttribute("aria-pressed", true);
  }
  else if(goal.is_active) {
    goal_button.className = "btn btn-success btn-lg btn-block " +
      "no-gutters";
  }
  else if(!goal.is_organized) {
    goal_button.className = "btn btn-info btn-lg btn-block " +
      "no-gutters";
  }
  else {
    goal_button.className = "btn btn-outline-primary btn-lg " +
      "btn-block no-gutters";
  }

  goal_name_div.innerHTML = goal.name;

  goal_name_div.setAttribute("width", "100%");

  // Allow text wrapping
  goal_name_div.style["white-space"] = "normal";

  goal_button.addEventListener(
    "click", this.goal_clicked.bind(this, goal._id));

  goal_container.appendChild(goal_name_div);

  if(goal._id in this.parent_goal_id_set) {

    let goal_expand_button_div = document.createElement("div");
    goal_expand_button_div.className = "col-2 no-gutters";

    let goal_expand_button = document.createElement("img");
    goal_expand_button.src = "images/noun_Arrow_1743494.svg";
    goal_expand_button.className = "no-gutters";
    goal_expand_button.setAttribute("width", "100%");

    goal_expand_button.addEventListener(
      "click", this.filter_by_goal_clicked.bind(this, goal._id));

    goal_expand_button_div.appendChild(goal_expand_button);

    goal_container.appendChild(goal_expand_button_div);
  }

  goal_button.appendChild(goal_container);
};

Home_Tab.prototype.update_goals_table = function() {

  while(this.goals_table_row.firstChild) {
    this.goals_table_row.removeChild(
      this.goals_table_row.firstChild);
  }

  if(this.goals.length === 0) {
    return;
  }

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

    // If this goal should not be displayed, ignore it
    if(!this.is_goal_in_filter(goal)) {
      continue;
    }

    let status_div = null;

    // If this goal has an explicit status, we use it
    if(goal.status_id in this.status_divs_by_id) {
      status_div = this.status_divs_by_id[goal.status_id];
    }
    else if(goal.target_date === null) {
      continue;
    }

    // Otherwise we deduce the goal's status by its target date
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

    if(this.next_goal_id === goal._id) {
      let bar_thing = document.createElement("hr");
      status_div.appendChild(bar_thing);
    }

    let goal_button = document.createElement("div");

    this.goal_buttons_by_id[goal._id] = goal_button;

    this.update_goal_button(goal);

    status_div.appendChild(goal_button);
  }

};

Home_Tab.prototype.goal_clicked = function(goal_id) {

  if(this.current_goal_id !== null) {

    if(this.current_goal_id in this.goal_buttons_by_id) {
  
      let current_goal = this.goal_id_map[this.current_goal_id];
      let goal_button = this.goal_buttons_by_id[this.current_goal_id];

      if(current_goal.is_active) {
        goal_button.className = "btn btn-success btn-lg btn-block no-gutters";
      }
      else if(!current_goal.is_organized) {
        goal_button.className = "btn btn-info btn-lg btn-block " +
          "no-gutters";
      }
      else {
        goal_button.className = "btn btn-outline-primary btn-lg btn-block " + 
          "no-gutters";
      }

      goal_button.setAttribute("aria-pressed", false);
    }
  }

  this.new_subgoal_button.classList.remove("invisible");
  this.set_organized_button.classList.remove("invisible");
  
  this.current_goal_id = goal_id;
  let current_goal = this.goal_id_map[goal_id];
  this.current_goal_name_field.value = current_goal.name;
  this.notes_field.value = current_goal.notes;
  this.cancel_delete_button.innerHTML = "Delete";

  $("#current_goal_status_select").val(
    current_goal.status_id).trigger("change");

  if(current_goal.target_date === null) {
    this.target_date_picker.setDate(null);
  }
  else {
    this.target_date_picker.setDate(current_goal.target_date);
  }

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
    this.set_active_button.innerHTML = "Set Inactive";
  }
  else {
    this.set_active_button.innerHTML = "Set Active";
  }

  if(current_goal.recurrence_rate === null) {
    this.recurrence_rate_field.value = null;
  }
  else {
    this.recurrence_rate_field.value = current_goal.recurrence_rate;
  }

  if(current_goal.is_organized) {
    this.set_organized_button.innerHTML = "Organize";
  }
  else {
    this.set_organized_button.innerHTML = "Set Organized";
  }

  if(current_goal.recurrence_time_unit === null) {
    $("#recurrence_time_unit_select").val(null).trigger("change");
  }
  else {
    $("#recurrence_time_unit_select").val(current_goal.recurrence_time_unit)
      .trigger("change");
  }

  $("#parent_goals_select").val(current_goal.parent_goal_ids).trigger("change");

  this.recurrence_fixed_checkbox.checked = current_goal.is_recurrence_fixed;

  let goal_button = this.goal_buttons_by_id[goal_id];
  goal_button.className = "btn btn-outline-primary btn-lg btn-block active " +
    "no-gutters";
  goal_button.setAttribute("aria-pressed", true);
  this.resize_goals_table();
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
  this.current_goal_name_field.value = "";
  this.notes_field.value = "";

  this.new_subgoal_button.classList.add("invisible");
  this.set_organized_button.classList.add("invisible");

  $("#current_goal_status_select").val(null).trigger("change");

  this.target_date_picker.setDate(null);
  this.completed_date_picker.setDate(null);

  this.cancel_delete_button.innerHTML = "Cancel";
  this.set_active_button.innerHTML = "Set Active";

  $("#parent_goals_select").val(null).trigger("change");
  this.recurrence_rate_field.value = null;

  $("#recurrence_time_unit_select").val(null).trigger("change");
};

Home_Tab.prototype.new_subgoal_clicked = function() {

  let parent_goal_id = this.current_goal_id;

  this.new_goal_clicked();

  if(parent_goal_id !== null) {

    $("#parent_goals_select").val([parent_goal_id]).trigger("change");
  }
};

Home_Tab.prototype.planning_mode_clicked = function() {

  let new_status_ids = [];
  let num_statuses_displayed = 0;

  if(this.in_planning_mode) {
    this.hide_recurrent_checkbox.checked = true;
    this.parent_goal_recursive_checkbox.checked = true;
    this.hide_non_leaf_checkbox.checked = true;
    this.hide_leaf_checkbox.checked = false;
  }
  else {
    this.hide_recurrent_checkbox.checked = false;
    this.parent_goal_recursive_checkbox.checked = false;
    this.hide_non_leaf_checkbox.checked = false;
    this.hide_leaf_checkbox.checked = false;
  }

  for(var status_index = 0; status_index < this.statuses.length;
    status_index++) {

    var status = this.statuses[status_index];

    if(this.in_planning_mode) {

      if(status.is_default && num_statuses_displayed < MAX_COLUMNS) {
        new_status_ids.push(status._id);
        num_statuses_displayed++;
      }

      this.planning_mode_button.innerHTML = "Switch to Planning Mode";
    }
    else {
      
      if(status.is_planning && num_statuses_displayed < MAX_COLUMNS) {
        new_status_ids.push(status._id);
        num_statuses_displayed++;
      }

      this.planning_mode_button.innerHTML = "Switch to Execution Mode"; 
    }
  }
  
  this.in_planning_mode = !this.in_planning_mode;

  $("#active_statuses_select").val(new_status_ids).trigger("change");
}

Home_Tab.prototype.filter_by_goal_clicked = function(parameter_1, parameter_2) {

  if(parameter_2 === undefined) {
    event = parameter_1;
    goal_id = this.current_goal_id;
  }
  else {
    event = parameter_2;
    goal_id = parameter_1;
  }

  event.stopPropagation();

  if(goal_id !== null) {

    this.filter_goal_ids = [goal_id];

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

  if(this.hide_leaf_checkbox.checked && !(goal._id in this.child_goal_id_lookup)) {
    return false;
  }

  if(ignore_depth === false && this.hide_non_leaf_checkbox.checked) {
    if(goal._id in this.parent_goal_id_set) {
      return false;
    }
  }

  if(this.hide_recurrent_checkbox.checked && goal.recurrence_rate !== null) {
    return false;
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

  let current_goal = this.goal_id_map[this.current_goal_id];

  var promise = Promise.resolve();

  if(current_goal.is_active) {
    promise = promise.then(function() {
      return this.set_active_clicked();
    }.bind(this));
  }

  this.completed_date_picker.setDate(new Date());

  return promise.then(function() {
    return this.save_clicked();
  }.bind(this))
  .then(function() {
    return this.new_goal_clicked();
  }.bind(this));
};

Home_Tab.prototype.abandon_clicked = function() {

  if(this.current_goal_id === null) {
    return;
  }
  
  let current_goal = this.goal_id_map[this.current_goal_id]; 

  var promise = Promise.resolve();

  if(current_goal.is_active) {
    promise = promise.then(function() {
      return this.set_active_clicked();
    }.bind(this));
  }

  this.abandoned_date_picker.setDate(new Date());

  return promise.then(function() {
    return this.save_clicked();
  }.bind(this))
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

Home_Tab.prototype.notes_button_clicked = function() {
  $("#notes_modal").modal("show");
};

Home_Tab.prototype.close_notes_button_clicked = function() {

  let current_goal = this.goal_id_map[this.current_goal_id];

  if(this.current_goal_id !== null) {
    this.notes_field.value = current_goal.notes;
  }
  else {
    this.notes_field.value = "";
  }

  $("#notes_modal").modal("hide");
};

Home_Tab.prototype.save_notes_clicked = function() {
  $("#notes_modal").modal("hide");
};

Home_Tab.prototype.set_organized_clicked = function() {

  if(this.current_goal_id === null) {
    return Promise.resolve();
  }

  let current_goal = this.goal_id_map[this.current_goal_id];

  var goals = [current_goal];
  goals.push(...this.get_child_goals(current_goal, 1));

  var is_organized = current_goal.is_organized;

  var promises = [];

  for(var goal_index = 0; goal_index < goals.length; goal_index++) {

    let goal = goals[goal_index];

    // Look for recurring goals; we don't organize these
    if(goal.parent_goal_ids.length === 1) {
      let parent_goal = this.datastore.get_goal_by_id(goal.parent_goal_ids[0]);

      if(parent_goal.recurrence_rate !== null) {
        continue;
      }
    }
      
    goal.is_organized = !is_organized;

    promises.push(
      this.datastore.update_goal(goal._id, goal)
      .then(function(goal) {
        return this.update_goal_button(goal);
      }.bind(this)));
  }

  return Promise.all(promises)
  .then(function() {
    if(is_organized) {
      this.set_organized_button.innerHTML = "Set Organized";
    }
    else {
      this.set_organized_button.innerHTML = "Organize";
    }
  }.bind(this));

};

Home_Tab.prototype.get_child_goals = function(goal, max_depth, depth) {

  var child_goals = [];

  if(depth === undefined) {
    depth = 1;
  }

  if(goal._id in this.child_goal_id_lookup) {

    for(var child_goal_index = 0; child_goal_index < this.child_goal_id_lookup[goal._id].length; child_goal_index++) {

      let child_goal_id = this.child_goal_id_lookup[goal._id][child_goal_index];
      let child_goal = this.goal_id_map[child_goal_id];
      
      if(child_goal.abandoned_on === null) {
        child_goals.push(child_goal);
      }

      if(max_depth === undefined || depth < max_depth) {
        child_goals.push(...this.get_child_goals(child_goal, max_depth, depth + 1));
      }
    }
  }

  return child_goals;
};
