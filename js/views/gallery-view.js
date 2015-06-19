// The Application

var itemPicture;
var picsArray = Array;
var that;
var grid;

// Our overall **HomeView** is the top-level piece of UI.
app.Views.GalleryView = app.Extensions.View.extend({

    /* Instead of generating a new element, bind to the existing skeleton of
     the App already present in the HTML.*/
    id: 'gallery-page',

    headerTemplate: _.template($('#header-template').html()),
    menuTemplate: _.template($('#menu-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click .left-menu': 'toggleMenu',
        'click .close-menu': 'toggleMenu'
    },

    // At initialization we bind to the relevant events on the `Missions`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting missions that might be saved in *localStorage*.
    initialize: function () {
        that = this;
        
        this.animateIn = 'iosSlideInRight';
        this.animateOut = 'slideOutRight';

        this.template = _.template($('script[name=gallery-page]').html());

        this.$el.html(this.template());

        this.$leftMenu = this.$('.left-menu');
        this.$page = this.$('.pageContainer');
        this.$pageContent = this.$('.pageContent');

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
        
        $(document).ready( function() {
            // init Masonry
                grid = that.$('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                // layout mode options
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
            // layout Isotope after each image loads
            grid.imagesLoaded().progress( function() {
                grid.isotope();
            });

        });

        return this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    onRender: function () {
        this.$page.prepend(this.headerTemplate());
        this.$pageContent.append(this.menuTemplate());
        this.displayShapeHeader();

        //add background color on clicked elements - city ul
        this.$(".city").click(function( event ) {
            var target = $( event.target );
            if (target.is( "li" ) && !target.is(".city li:last")) {
                $(".city li").removeClass('select');
                target.toggleClass('select');
            }
        });
        //add background color on clicked elements - mission ul
        this.$(".mission").click(function( event ) {
            var target = $( event.target );
            if (target.is( "li" ) && !target.is(".mission li:last")) {
                $(".mission li").removeClass('select');
                target.toggleClass('select');

                //filter the pictures
                var value = target.attr('value');
                grid.isotope({ filter: '.'+value });
            }
        });


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
    },
    
    displayShapeHeader: function(){
        var windowWidth = $(window).width();
        this.$('#header-shape').css('border-right',(windowWidth*2 + windowWidth/2)+'px solid transparent');

        window.onresize = function() {
            windowWidth = $(window).width();
            this.$('#header-shape').css('border-right',(windowWidth*2 + windowWidth/2)+'px solid transparent');
        };
    },
    //display or not the panel menu
    toggleMenu: function (e) {
        this.$pageContent.toggleClass('sml-open');
        this.$leftMenu.toggleClass('hide');
    }

});