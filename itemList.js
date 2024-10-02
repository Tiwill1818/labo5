/**
 * @file itemList.js
 * @author William Robert
 * @version 1.00
 * @date 2024/10/02
 * @brief Classe ItemList
 */


class ItemList{
    constructor(){
        this.tab = [];
    }

    add(item){
        this.tab.push(item);
    }

    getLength(){
        return this.tab.length;
    }

    removeItemByID(id) {
        return this.tab.findIndex((item, index) => {
            if (item.id === id) {
                this.tab.splice(index, 1);
                return true;
            }
        });
    }

    removeItemByName(nom) {
        return this.tab.findIndex((item, index) => {
            if (item.nom === nom) {
                this.tab.splice(index, 1);
                return true;
            }
        });
    }

    getLastItemId() {
        return this.tab[this.tab.length - 1].id;
    }
}

module.exports = ItemList;