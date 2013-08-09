var App = App || {};

(function(A) {

    "use strict";

    var Main = function() {
        this.view = new A.View({
            model : (new A.Model()),
            el : 'container',
            listEl : 'shoppingList'
        });
    };

    A.Main = Main;

})(App);
