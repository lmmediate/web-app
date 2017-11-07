var url = "http://localhost:8080/api/sales";

var addContent = function(data) {
  var template = Handlebars.templates.discounts;
  document.getElementsByClassName("content")[0].innerHTML = template(data);
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url);
xmlhttp.onload = function() {
  if (xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.responseText);
    addContent(data);
  } else {
    console.log("Loading error.");
  }
};
xmlhttp.send();
