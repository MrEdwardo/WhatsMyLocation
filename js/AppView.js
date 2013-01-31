// AppView.js - the main application view

var AppView = Backbone.View.extend({
    initialize: function () {

    },


    events: {
        // any user events (clicks etc) we want to respond to
    },



    // grab and populate our main template
    render: function () {
        // once again this is using ICanHaz.js, but you can use whatever
        this.el = ich.app(this.model.toJSON());

        // store a reference to our movie list
        this.userLocation = this.$('#userLocation');

        return this;
    },

});