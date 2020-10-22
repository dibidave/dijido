function Login_Pane(parent_div, connector) {

  this.parent_div = parent_div;
  this.connector = connector;

  this.login_div = document.createElement("div");
  this.login_div.className = "col-sm-4";

  this.username_div = document.createElement("div");
  this.username_div.className = "form-group";

  this.username_label = document.createElement("label");
  this.username_label.innerHTML = "Username";
  this.username_div.appendChild(this.username_label);

  this.username_field = document.createElement("input");
  this.username_field.className = "form-control";
  this.username_div.appendChild(this.username_field);

  this.login_div.appendChild(this.username_div);

  this.password_div = document.createElement("div");
  this.password_div.className = "form-group";

  this.password_label = document.createElement("label");
  this.password_label.innerHTML = "Password";
  this.password_div.appendChild(this.password_label);

  this.password_field = document.createElement("input");
  this.password_field.className = "form-control";
  this.password_field.type = "password"
  this.password_field.autocomplete = "off";

  this.password_div.appendChild(this.password_field);

  this.login_div.appendChild(this.password_div);

  this.login_button = document.createElement("button");
  this.login_button.className = "btn btn-primary";
  this.login_button.innerHTML = "Login";
  this.login_button.addEventListener("click",
    this.login_button_clicked.bind(this));

  this.login_div.appendChild(this.login_button);

  this.parent_div.appendChild(this.login_div);
};

Login_Pane.prototype.login_button_clicked = function() {

  console.log("Login button clicked");

  this.connector.post_login(this.username_field.value,
    this.password_field.value)
  .then(function(response) {
    console.log(response);
    location.reload();
  });
};