var App = App || {};

(function(A){

    "use strict";

    A.accessories = {
        mixin : function() {
            if (arguments.length < 3) {
                throw Error("This mixin expect at least 3 arguments, receiver, augmentator and a method name");
            }

            var args = Array.prototype.slice.apply(arguments),
                target = args.shift(),
                source = args.shift(),
                methodNames = args,
                len = methodNames.length - 1;

            while(len >= 0) {
                target[methodNames[len]] = source[methodNames[len]];
                len--;
            }
        },
        uuid : function(seed) {
            var s = seed || 's';
            return s +
                (Math.random() * 1000).toString().substr(0,4) +
                (new Date().valueOf().toString().substr(8));
        },
        publish : function(event, args) {
            var callbacks = this.listeners[event],
                len = callbacks? callbacks.length : 0,
                l, scope;
            this.listeners = this.listeners || {};
            callbacks = this.listeners[event];

            if (!callbacks || !len) {
                return;
            }
            l = len-1;
            while (l >= 0) {
                scope = callbacks[l].scope || this;
                callbacks[l].callback.call(scope, args);
                l--;
            }
        },
        subscribe : function(event, callback, scope) {
            var listeners,
                token = A.accessories.uuid('event');

            this.listeners = this.listeners || {};

            listeners = this.listeners;
            listeners[event] = listeners[event] || [];

            listeners[event].push({
                callback : callback,
                scope : scope,
                token : token
            });
            return token;
        },

        unsubscribeAll : function(event) {
            if (event) {
                delete this.listeners[event];
            } else {
                delete this.listeners;
            }
        },

        unsubscribe : function(event, token) {

            var listeners,
                len;

            this.listeners = this.listeners || {};
            listeners = this.listeners;

            listeners[event] = listeners[event] || [];
            len = listeners[event].length;
            while (len >= 0) {
                if (listeners[event][len].token === token) {
                    listeners[event].splice(len,1);
                    return;
                }
            }

        }
    }
}(App));
