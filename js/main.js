var App = App || {};

(function(A) {

    var Main = function() {
        this.view = new A.View({
            model : (new A.Model()),
            el : 'container',
            listEl : 'shoppingList'
        });
        this.view.init();
    };

    App.Main = Main;

})(App);