function History_Tab(tab_header_div, tab_content_div, datastore) {

  this.tab_header = Tab_Header("History", "#history", tab_header_div, false);

  this.tab_content_div = tab_content_div;
  this.datastore = datastore;

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "history");
  this.tab_content.className = "tab-pane fade show";

  this.history_table_div = document.createElement("div");
  this.history_table_div.className = "col-sm-12 pt-2";
  this.tab_content.appendChild(this.history_table_div);

  this.tab_content_div.appendChild(this.tab_content);

  this.update_history();

  this.logs = [];
};

History_Tab.prototype.update_history = function() {

  this.logs = [];

  return this.datastore.load_logs()
  .then(function() {
    return this.datastore.get_logs(10)
  }.bind(this)
  ).then(function(logs) {

    this.logs = logs;

    return this.update_history_table();

  }.bind(this)
  ).then(function() {
    setTimeout(this.update_history.bind(this), 60000);
  }.bind(this));
};

History_Tab.prototype.update_history_table = function() {

  while(this.history_table_div.firstChild) {
    this.history_table_div.removeChild(
      this.history_table_div.firstChild);
  }

  if(this.logs.length === 0) {
    return;
  }

  this.history_table = document.createElement("table");
  this.history_table.className = "table-condensed table-striped table-bordered";

  this.history_table_header = document.createElement("thead");

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
  cell.innerHTML = "Type";
  header_row.appendChild(cell);

  this.history_table_header.appendChild(header_row);
  this.history_table.appendChild(this.history_table_header);

  this.history_table_body = document.createElement("tbody");

  for(var log_index = 0; log_index < this.logs.length; log_index++) {

    var log = this.logs[log_index];

    var row = document.createElement("tr");
    row.className = "table-active";

    var cell = document.createElement("td");
    cell.innerHTML = new Date(log.date).toLocaleString();
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = log.text;
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.innerHTML = log.type;
    row.appendChild(cell);

    this.history_table_body.appendChild(row);
  }

  this.history_table.appendChild(this.history_table_body);
  this.history_table_div.appendChild(this.history_table);
};
