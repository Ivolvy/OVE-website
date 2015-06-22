// The Application

var itemPicture;
var that;
var grid;
var usersImages = [];

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
        this.$grid = this.$('.grid');

		
		this.getUsersImages();
	      

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
    
	displayImagesOnGallery: function(){
			//append all pictures in the gallery
			for(var i=1;i < 43;i++){
				this.$grid.append('<div class="grid-item shadow"><img src="img/gallery/ombres/ombres_'+i+'.jpg"/></div>');

				if(i == 10) {
					this.$grid.append('<div class="grid-item text-gallery">"Elle est où la poulette ?"</div>');
				}
				else if(i == 6){
				
					this.$grid.append('<div class="grid-item text-gallery">"Je rigole pas, à la bouche d\'égout je pète une crise"</div>');
				}
				if(i == 8){
					for(y=0;y<usersImages.length;y++){
						this.$grid.append('<div class="grid-item"><img src="img/gallery/usersImg/'+usersImages[y]+'"/></div>');
				   }
				}

			}
		  /*  for(var i=1;i < 37;i++){
				this.$grid.append('<div class="grid-item high"><img src="img/gallery/vrac/reflect_'+i+'.jpg"/></div>');
			}*/
			
			//init the isotope gallery when document is ready
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
	
	},
	
    //display the images taken with the application
	getUsersImages: function(){
        var fileExt = {};
        fileExt[0]=".png";
        fileExt[1]=".jpg";
        fileExt[2]=".gif";
		var index = 0;
        $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: 'img/gallery/usersImg/',
            success: function (data) {
                //List all png or jpg or gif file names in the page
                $(data).find('a:contains(' + fileExt[0] + '),a:contains(' + fileExt[1] + '),a:contains(' + fileExt[2] + ')').each(function () {
                    var filename = this.href.substr(this.href.lastIndexOf('/') + 1);
					usersImages.push(filename);
                });
			
				that.displayImagesOnGallery();
            }
        });
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