// The Application

var itemPicture;
var picsArray = Array;

// Our overall **HomeView** is the top-level piece of UI.
app.Views.HomeView = app.Extensions.View.extend({

    /* Instead of generating a new element, bind to the existing skeleton of
     the App already present in the HTML.*/
    id: 'home-page',

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'keypress #new-mission': 'createOnEnter',
        'click #left-menu': 'toggleMenu'
    },

    // At initialization we bind to the relevant events on the `Missions`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting missions that might be saved in *localStorage*.
    initialize: function () {
        var that = this;
        
        this.animateIn = 'iosSlideInRight';
        this.animateOut = 'slideOutRight';

        this.template = _.template($('script[name=home-page]').html());

        this.$el.html(this.template());

        
        
        app.missionsPictures = new PicturesCollection();

        app.missionsPictures.fetch({
            success: function(model, response) {

                var pictureCollection = app.missionsPictures.where({'missionId': '-Jpl8awhl6acQXffUJs-'});

                var pictureId = pictureCollection[0].id;
                itemPicture = app.missionsPictures.get(pictureId);
                //alert(itemMap.get('origin'));

                picsArray = itemPicture.get('picsArray');

                that.displayImages();
            }
        });

        return this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    onRender: function () {


        return this;
    },
    
    displayImages: function(){
        this.$icons = this.$('.item-content');

      //  if(this.model.get('picsArray')){
      //  this.$icons.append('<img src="http://michaelgenty.com/test/' + picsArray[0] + '" style="width:200px"/>');
            for(var i=0; i < picsArray.length;i++) {
                this.$icons.append('<img src="http://michaelgenty.com/test/' + picsArray[i] + '" style="width:200px"/>');
            }
      //  }
        
    }

});