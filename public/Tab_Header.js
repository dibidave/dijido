function Tab_Header(name, link, nav_bar, is_active) {

  this.tab_header = document.createElement("li");
  this.tab_header.className = "nav-item";
  this.tab_header_link = document.createElement("a");
  this.tab_header_link.className = "nav-link show";

  if(is_active) {
    this.tab_header_link.className += " active";
  }
  
  this.tab_header_link.setAttribute("data-toggle", "tab");
  this.tab_header_link.setAttribute("href", link);
  this.tab_header_link.innerHTML = name;
  this.tab_header.appendChild(this.tab_header_link);

  nav_bar.appendChild(this.tab_header);
}