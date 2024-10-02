/**
 * @file socketio.js
 * @author William Robert
 * @version 1.00
 * @date 2024/10/02
 * @brief Fichier de socket.io
 */


var io = require('socket.io')();
var socketapi = {
    io: io
};
var Item = require('./item');
var ItemList = require('./itemList');
const itemList = require('./myItemList');
var myItemList = require('./myItemList');
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://172.17.15.180:1883');
client.on('connect', function () {
    client.subscribe('ITEM/#');
    console.log("MQTT connected");
});
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log("A user connected");
    socket.on('message', function (message) {
        switch (message.id) {
            case "ajouter":
                if(message.data.nom.length && message.data.prix.length && !isNaN(parseFloat(message.data.prix)))
                {
                    var item = new Item(myItemList.getLength() ? myItemList.getLastItemId() + 1 : 1, message.data.nom, parseFloat(message.data.prix));
                    myItemList.add(item);
                    client.publish('ITEM/WEB/NEW', JSON.stringify(item));
                }
                break;
            case "suppId":
                if (myItemList.tab.findIndex((item) => item.id === parseInt(message.data.id)) !== -1)
                {
                    myItemList.removeItemByID(parseInt(message.data.id));
                    client.publish('ITEM/WEB/DELETE/ID', JSON.stringify(message.data.id));
                }
                break;
            case "suppNom":
                if (myItemList.tab.findIndex((item) => item.nom === message.data.nom) !== -1)
                {
                    myItemList.removeItemByName(message.data.nom);
                    client.publish('ITEM/WEB/DELETE/NOM', JSON.stringify(message.data.nom));
                }
                break;
            default:
                break;
        }
        io.emit('refresh', {itemList: myItemList});
        console.table(myItemList.tab);
        
    });

});

client.on('message', function (topic, message) {
    var valeurItem = JSON.parse(message);
    switch (topic) {
        case 'ITEM/MODULE/NEW':
            if(valeurItem.nom.length && valeurItem.prix.length && !isNaN(parseFloat(valeurItem.prix)))
            {
                var item = new Item(myItemList.getLength() ? myItemList.getLastItemId() + 1 : 1, valeurItem.nom, parseFloat(valeurItem.prix));
                myItemList.add(item);
            }
            break;
        case 'ITEM/MODULE/DELETE/ID':
            if(myItemList.tab.findIndex((item) => item.id === parseInt(valeurItem.id)) !== -1)
                myItemList.removeItemByID(valeurItem.id);
            break;
        case 'ITEM/MODULE/DELETE/NOM':
            if(myItemList.tab.findIndex((item) => item.nom === valeurItem.nom) !== -1)
                myItemList.removeItemByName(valeurItem.nom);
            break;
        default:
            break;
    }
    
    io.emit('refresh', {itemList: myItemList});
    console.table(myItemList.tab);
});
// end of socket.io logic

module.exports = socketapi;