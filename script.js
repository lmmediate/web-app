var addNewItem = function(ob) {
  var itemList = document.getElementsByClassName("item-list");
  var item = document.createElement("div");
  item.className = "item";
  item.innerHTML = 
    `<div class="item-name">${ob.name}</div>
     <div class="item-img"><img src="${ob.img_url}"/></div>
     <div class="item-cat">${ob.category}</div>
     <div class="item-old-price">${ob.old_price}</div>
     <div class="item-new-price">${ob.new_price}</div>
     <div class="item-discount">${ob.discount}</div>
     <div class="item-date">${ob.date}</div>
     <div class="item-cond">${ob.condition}</div>`;
  itemList[0].appendChild(item);
}


// var jsonString = '{"name":"Груша зеленая 1кг","category":"Овощи и фрукты","old_price":"69.50","new_price":"600$","discount":"-40%","date":"11.09-18.09"}';
// var data = JSON.parse(jsonString);
// addNewItem(data);

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    for (i in data) {
      addNewItem(data[i]);
    }
    // console.log(data);
  }
};
xmlhttp.open("GET", "../server/dixy_items.json", true);
xmlhttp.send();


