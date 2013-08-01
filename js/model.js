var App = App || {};

(function(A) {

    "use strict";

    var Model = function() {

        A.accessories.mixin(this, A.accessories, 'publish', 'subscribe', 'uuid');
        this.loadData(this.onData.bind(this), this.onFailure.bind(this));
        this.shoppingList = [];
    };

    Model.prototype.loadData = function(success, failure) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                req.status === 200 ?
                    success(req.response) : failure(req.status);
            }
        };
        req.open("GET", "data/products.json", true);
        req.send();
    };

    Model.prototype.onData = function(rawData) {
        var data = JSON.parse(rawData),
            l = data.products.length - 1;
        while (l >= 0) {
            this.shoppingList.push(data.products[l]);
            l--;
        }
        this.publish('onData');
    };

    Model.prototype.onFailure = function(status) {
        console.warn('cannot load data, status is ', status);
    };

    Model.prototype.add = function(obj) {
        if (obj.id === undefined || obj.id === null) {
            obj.id = this.uuid();
        }
        this.shoppingList.push(obj);
        this.publish('add', obj);
    };

    Model.prototype.remove = function(id) {
        var i = this.getCount() - 1,
            list = this.shoppingList,
            obj;
        while(i >= 0) {
            if (list[i].id === id) {
                obj = this.shoppingList.splice(i, 1)[0];
                this.publish('remove', obj.id);
                return;
            }
            i--;
        }
    };

    Model.prototype.getCount = function() {
        return this.shoppingList.length;
    };

    Model.prototype.getList = function() {
        return this.shoppingList;
    };

    A.Model = Model;

})(App);