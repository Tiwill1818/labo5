var Item = require('../item');
var ItemList = require('../itemList');
var express = require('express');
var router = express.Router();
var myItemList = require('../myItemList');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', itemList: myItemList });
});



module.exports = router;


