var App = App || {};

(function(A) {

    var Model = function() {

        A.accessories.mixin(this, A.accessories, 'publish', 'subscribe', 'uuid');

        this.shoppingList = [
            {
                id : '1',
                obj : 'carrot'
            },
            {
                id : '88',
                obj : 'pears'
            },
            {
                id: '2',
                obj : 'milk'
            },
            {
                id : '3',
                obj : 'bread'
            },
            {
                id : 'o',
                obj : 'fish'
            }
        ];
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