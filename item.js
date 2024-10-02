/**
 * @file item.js
 * @author William Robert
 * @version 1.00
 * @date 2024/10/02
 * @brief Classe Item
 */


class Item {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        var date = new Date();
        this.dateCreation = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
    }
}
module.exports = Item;