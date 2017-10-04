var url = "https://raw.githubusercontent.com/lmmediate/server/master/crawler/out/sales.json";

var addContent = function(data) {
  var template = Handlebars.compile(document.getElementById("discounts-template").innerHTML);
  document.getElementsByClassName("content")[0].innerHTML = template(data);
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url);
xmlhttp.onload = function() {
  if (xmlhttp.status === 200) {
    var data = JSON.parse(xmlhttp.responseText);
    var pagecount = Math.floor(data.length / 50) + 1;
    addContent(data);
  } else {
    console.log("Loading error.");
  }
};
xmlhttp.send();
