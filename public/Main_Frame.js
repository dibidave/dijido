function Main_Frame(parent_div, datastore) {

  this.parent_div = parent_div;
  this.datastore = datastore;

  this.nav_bar = document.createElement("ul");
  this.nav_bar.className = "nav nav-tabs";
  this.nav_bar.id = "navbar";

  this.tab_content = document.createElement("div");
  this.tab_content.setAttribute("id", "tab_content");
  this.tab_content.className = "tab-content row";

  this.home_tab = new Home_Tab(this.nav_bar, this.tab_content,
    this.datastore);

  this.notes_tab = new Notes_Tab(this.nav_bar, this.tab_content,
    this.datastore);

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
