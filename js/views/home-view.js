// The Application

var itemPicture;
var picsArray = Array;
var that;
var grid;
var loop; //if the video must loop or not
var navTo; //the point where the video must be played

// Our overall **HomeView** is the top-level piece of UI.
app.Views.HomeView = app.Extensions.View.extend({

    /* Instead of generating a new element, bind to the existing skeleton of
     the App already present in the HTML.*/
    id: 'home-page',

    headerTemplate: _.template($('#header-template').html()),
    menuTemplate: _.template($('#menu-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },

    // At initialization we bind to the relevant events on the `Missions`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting missions that might be saved in *localStorage*.
    initialize: function () {
        that = this;
        
        this.animateIn = 'iosSlideInRight';
        this.animateOut = 'slideOutRight';

        this.template = _.template($('script[name=home-page]').html());

        this.$el.html(this.template());


        this.$page = this.$('.pageContainer');
        this.$pageContent = this.$('.pageContent');

        


        return this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    onRender: function () {
        this.$page.prepend(this.headerTemplate());
        var $video = this.$('#vid')[0];
        loop = true;
        this.displayShapeHeader();
        this.initDotNavigation();


        //loop only the 3 seconds of video
        $video.addEventListener("timeupdate", function () {
            if ($video.currentTime > 3 && loop == true) {
                $video.currentTime = 0;
                $video.play();
            }
            if($video.currentTime >= navTo){
                navTo = -1;
                $video.playbackRate = 1;
            }
            
            //enable the dot assign to the moment in the video
            if($video.currentTime >= 0 && $video.currentTime < 1){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(1)").toggleClass('current');
            }
            if($video.currentTime >= 1 && $video.currentTime < 2){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(2)").toggleClass('current');
            }
            else if($video.currentTime >= 2 && $video.currentTime < 3){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(3)").toggleClass('current');
            }
            
            
        }, false);

        //on click on begin experience
        this.$(".experience .picto").click(function(){
            TweenMax.staggerTo(".experience", 0.5, {opacity:0, y:150, ease:Back.easeIn}, 0.1);
            $video.currentTime = 3;
            loop = false;
        });
        
        //experience div navigation
        TweenMax.staggerFrom(".experience", 2, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.2);


        this.$("#dotNavigation li").click(function(event){
            var target = $( event.target );
            navTo = target.attr('timeValue');
            alert(navTo);
            loop = false;
            $video.playbackRate = 6;
        });
      
        
        
        
        // init controller
      /*  var controller = new ScrollMagic.Controller();
       
        // build scene
        var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 400})
            .addTo(controller)
            .addIndicators() // add indicators (requires plugin)
            .on("update", function (e) {
                
                $video.currentTime = window.pageYOffset / 400;
                that.$("#scrollDirection").text(e.target.controller().info("scrollDirection"));
            });
        */
        
        
        return this;
    },

    //side navigation menu for the video
    initDotNavigation: function () {
        this.$(".dotstyle ul li a").click(function() {
            [].slice.call(document.querySelectorAll('.dotstyle > ul')).forEach(function (nav) {
                new DotNav(nav, {
                    callback: function (idx) {
                        //console.log( idx )
                    }
                });
            });
        });
    },
    
    displayShapeHeader: function(){
        var windowWidth = $(window).width();
        this.$('#header-shape').css('border-right',(windowWidth*2 + windowWidth/2)+'px solid transparent');

        window.onresize = function() {
            windowWidth = $(window).width();
            this.$('#header-shape').css('border-right',(windowWidth*2 + windowWidth/2)+'px solid transparent');
        };
    }

});