// The Application

var itemPicture;
var picsArray = Array;
var that;
var grid;
var loop; //if the video must loop or not
var navTo; //the point where the video must be played
var enableMouseEvent;

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
        
        this.$timer = this.$("#timer");
        
		pageIsDisplayed = true;
		
        return this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    onRender: function () {
        this.$page.prepend(this.headerTemplate());
        that.$navDots = this.$("#dotNavigation");
        that.$header = this.$("#header-shape");
        var $video = this.$('#vid')[0];
        enableMouseEvent = false;
        loop = true;
        this.displayShapeHeader();
        this.initDotNavigation();
        
        //launch the timer
        this.timer();
        
        //loop only the 3 seconds of video
        $video.addEventListener("timeupdate", function () {
            if ($video.currentTime > 2.8 && loop == true) {
                $video.currentTime = 0;
                $video.play();
            }
            if($video.currentTime >= navTo){
                navTo = -1;
                $video.playbackRate = 1;
            }
            

            //enable the dot assign to the moment in the video - a little crap
            if($video.currentTime >= 0 && $video.currentTime < 2.8){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(1)").toggleClass('current');
            }
            else if($video.currentTime >= 3 && $video.currentTime < 5){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(2)").toggleClass('current');
            }
            else if($video.currentTime >= 5 && $video.currentTime < 11){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(3)").toggleClass('current');
            }
            else if($video.currentTime >= 11 && $video.currentTime < 16){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(4)").toggleClass('current');
            }
            else if($video.currentTime >= 16 && $video.currentTime < 20){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(5)").toggleClass('current');
            }
            else if($video.currentTime >= 20 && $video.currentTime < 25){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(6)").toggleClass('current');
            }
            else if($video.currentTime >= 25 && $video.currentTime < 31){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(7)").toggleClass('current');
            }
            else if($video.currentTime >= 31 && $video.currentTime < 38){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(8)").toggleClass('current');
            }
            else if($video.currentTime >= 38 && $video.currentTime < 43){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(9)").toggleClass('current');
            }
            else if($video.currentTime >= 43 && $video.currentTime < 49){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(10)").toggleClass('current');
            }
            else if($video.currentTime >= 49 && $video.currentTime < 54){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(11)").toggleClass('current');
            }
            else if($video.currentTime >= 54){
                that.$("#dotNavigation li").removeClass('current');
                that.$("#dotNavigation li:nth-child(12)").toggleClass('current');
                that.displayHeader();
                enableMouseEvent = false;
            }
            
            //console.log($video.currentTime);
            
        }, false);

        //on click on begin experience - hide the panel
        this.$(".experience .picto").click(function(){
            TweenMax.staggerTo(".experience", 0.5, {opacity:0, y:150, ease:Back.easeIn}, 0.1);
            $video.currentTime = 3;
            loop = false; //stop the loop of the video
            that.$navDots.removeClass('hideOpacity'); //display the dots navigation
            that.hideHeader();
            enableMouseEvent = true; //enable the mouse event y position
        });

        //on click on the dots, navigate to the correspondent time in the video
        this.$("#dotNavigation li").click(function(event){
            var target = $( event.target );
            navTo = target.attr('timeValue');
            loop = false;
            $video.playbackRate = 6;
        });


        //test if the mouse is over the place of the header, and display it
        $(document).on( "mousemove", function( event ) {
            if(enableMouseEvent) {
                if (event.pageY < 60) {
                    that.displayHeader();
                }
                else {
                    that.hideHeader();
                }
            }
        });

        //go to gallery on click
        this.$("#header-shape .gallery").click(function(event){
            that.goToGallery();
        });


        return this;
    },


        //counter before next experience
        timer: function() {
            var date1 = new Date();
            var date2 = new Date("Oct 1 00:00:00 2020");
            var sec = (date2 - date1) / 1000;
            var n = 24 * 3600;

            if (sec > 0) {
                var j = Math.floor(sec / n);
                var h = Math.floor((sec - (j * n)) / 3600);
                var mn = Math.floor((sec - ((j * n + h * 3600))) / 60);
                sec = Math.floor(sec - ((j * n + h * 3600 + mn * 60)));
                if(sec < 10) {
                    that.$timer.html("L'experience sera actualisée dans 00:" + mn + ":0" + sec);
                }
                else{
                    that.$timer.html("L'experience sera actualisée dans 00:" + mn + ":" + sec);
                }
            }
			if(homeIsDisplayed == true){
				var tRebour = setTimeout("that.timer();", 1000);
			}
        },
    
    displayHeader: function(){
        that.$('#header-shape').css({
            top: '0px'
        });
        that.$('#header-shape .logo').css({
            top: '0px'
        });
        that.$('#header-shape .content').css({
            top: '0px'
        });
        that.$('.header-shadow').css({
            top: '0px'
        });
    },
    hideHeader: function(){
        that.$('#header-shape').css({
            top: '-65px'
        });
        that.$('#header-shape .logo').css({
            top: '-65px'
        });
        that.$('#header-shape .content').css({
            top: '-65px'
        });
        that.$('.header-shadow').css({
            top: '-65px'
        });
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
            that.$('#header-shape').css('border-right',(windowWidth*2 + windowWidth/2)+'px solid transparent');
        };
    },

    //go to the gallery
    goToGallery: function () {
        enableMouseEvent = false;
        Backbone.history.navigate('#/gallery', true);
    }

});