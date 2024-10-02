/**
 * @file myItemList.js
 * @author William Robert
 * @version 1.00
 * @date 2024/10/02
 * @brief déclaration de la liste d'items
 */


var Item = require('./item');
var ItemList = require('./itemList');
var item1 = new Item(1, "item1", 10);
var item2 = new Item(2, "item2", 20);
var itemList = new ItemList();
itemList.add(item1);
itemList.add(item2);
module.exports = itemList;