function Main_Frame(parent_div, connector) {

  this.parent_div = parent_div;
  this.connector = connector;

  this.nav_bar = document.createElement("ul");
  this.nav_bar.className = "nav nav-tabs";

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "tab_content");
  this.tab_content.className = "tab-content";

  this.home_tab = new Home_Tab(this.nav_bar, this.tab_content,
    this.connector);

  this.logout_tab = document.createElement("li");
  this.logout_tab.className = "nav-item";
  this.logout_tab_link = document.createElement("a");
  this.logout_tab_link.className = "nav-link show";
  
  this.logout_tab_link.setAttribute("href", "/logout");
  this.logout_tab_link.innerHTML = "Logout";
  this.logout_tab.appendChild(this.logout_tab_link);

  this.nav_bar.appendChild(this.logout_tab);

  this.parent_div.appendChild(this.nav_bar);
  this.parent_div.appendChild(this.tab_content);
};