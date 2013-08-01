var App = App || {};

(function(A) {

    var View = function(config) {

        A.accessories.mixin(this, A.accessories, 'publish', 'subscribe');

        this.model = config.model;

        this.el = document.getElementById(config.el);
        this.listEl = document.getElementById(config.listEl);

        this.model.subscribe('add', this.onAdd, this);
        this.model.subscribe('remove', this.onRemove, this);

    };

    View.prototype.onAdd = function(obj) {
        this.onAddedElement(obj)
    };

    View.prototype.onRemove = function(id) {
        var el = document.querySelector('li[data-id="' + id + '"]');
        this.listEl.removeChild(el);
    };

    View.prototype.onAddedElement = function(obj) {
        var el = document.createElement('li'),
            textN = document.createTextNode(obj.obj),
            textB = document.createTextNode('Remove'),
            btn = document.createElement('button'),
            domId;
        domId = obj.id;
        el.setAttribute('data-id', domId);
        btn.setAttribute('data-id', domId);
        el.appendChild(textN);
        btn.appendChild(textB);
        btn.setAttribute('type', 'delete');
        el.appendChild(btn);
        this.listEl.appendChild(el);
    };

    View.prototype.setupDomEvents = function() {
        this.el.addEventListener('click', this.onClick.bind(this));
    };

    View.prototype.onClick = function(ev) {
        var target = ev.target, id;

        ev.preventDefault();

        if (target.tagName.toLowerCase() !== 'button') {
            return false;
        }

        if (target.getAttribute('type') === 'submit') {
            this.addNewElement();
        } else {
            id = target.getAttribute('data-id');
            this.removeElement(id);
        }

        return false;
    };

    View.prototype.addNewElement = function() {
        var objName = document.getElementsByName('newItem')[0].value;
        this.model.add({
            obj : objName
        })
    };

    View.prototype.removeElement = function(id) {
        this.model.remove(id);
    };

    View.prototype.init = function() {
        var list = this.model.getList(),
            len = this.model.getCount(), i = 0, listEl;

        this.listEl.style.display = 'block';

        for (; i < len ; i++) {
            this.onAddedElement(list[i]);
        }

        this.setupDomEvents();

    };

    A.View = View;

})(App);