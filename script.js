var addNewItem = function(ob) {
  var itemList = document.getElementsByClassName("item-list");
  var item = document.createElement("div");
  item.className = "item";
  item.innerHTML = 
    `<div class="item-name">${ob.name}</div>
     <div class="item-img"><img src="https://dixy.ru/upload/iblock/445/%D0%A6%D0%A20027448.jpg"/></div>
     <div class="item-cat">${ob.cat}</div>
     <div class="item-old-price">${ob.old_price}</div>
     <div class="item-new-price">${ob.new_price}</div>
     <div class="item-discount">${ob.discount}</div>
     <div class="item-date">${ob.date}</div>
     <div class="item-cond">Условие</div>`;
  itemList[0].appendChild(item);
}


var jsonString = '{"name":"Груша зеленая 1кг","cat":"Овощи и фрукты","old_price":"69.50","new_price":"600$","discount":"-40%","date":"11.09-18.09"}';
var data = JSON.parse(jsonString);
console.log(data);
addNewItem(data);
addNewItem(data);
addNewItem(data);
addNewItem(data);
addNewItem(data);
addNewItem(data);
addNewItem(data);



// // http://95.129.137.5/project/dixy_items.json

