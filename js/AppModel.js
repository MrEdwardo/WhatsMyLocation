// AppModel.js

var AppModel = Backbone.Model.extend({
    initialize: function () {
        // init and store our UserLocation in our app object
        this.userLocation = new userLocation();
    }
});