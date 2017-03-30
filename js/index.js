import '../scss/index.scss';

console.log(111)


(function($) {

    var custom = {
        init : function(){
            this.binding();
            this.resizeCheck();
        },

        binding : function() {
            var that = this;
            that.goTo();
            that.commonSlider();
            this.fixblock();
            this.bgCover();
            this.touchDeviceHover();
            this.naviconClick();
            this.showTab();

            if(isIe8) {
                console.log('custom.binding: run for ie8-');
                that.backStretch();
            }
        },

        resizeCheck: function() {
            var that = this;
            $(window).resize(function() {
                //call you function or just write here
            });

        },

        scrollPageTo: function (scrollEnd) {
            $("html,body").stop().animate({scrollTop: scrollEnd}, 1000);
        },

        stopScroll: function () {
            $("html,body").stop(true, false); // Stops and dequeue's animations
        },

        /**
         * Smoothly jump to an inside section
         * @howtouse: <a href="#target" class="scroll-to"></a>
         * @return
         */
        goTo: function () {

            var that = this;

            $(".scroll-to").click(function(e){
                e.preventDefault();
                var id          = $(this).attr("href"),
                    topOffset   = 0,
                    duration    = 1200;

                var scrollEnd = $(id).offset().top-topOffset;
                that.scrollPageTo(scrollEnd);
            });

            function stopScroll() {
                $("html,body").stop(true, false); // Stops and dequeue's animations
            }

            if(window.addEventListener) document.addEventListener('DOMMouseScroll', stopScroll, false);
                document.onmousewheel = stopScroll;
        },

        fixblock: function() {
            var $fixblock   = $(".fix-block");
            if($fixblock.length <= 0) return;
            var $window    = $(window),
                offset     = $fixblock.offset(),
                topPadding = 0;

            $window.scroll(function() {
                if ($window.scrollTop() > offset.top) {
                    $fixblock.stop().css({ "position": "fixed"});
                } else {
                    $fixblock.stop().css({ "position": "static"});
                }
            });
        },

        //you can add attribute to ul.bxslider element
        commonSlider: function() {
            //optional attribute:
            //@setBackground
            //@pager
            //@controls
            //@autoStart: If slides automatically
            $('.kiwi-slider').each(function() {
                var self = this,
                    $this = $(this);
                var options = {};
                options.setBackground = typeof $(this).attr('setBackground') != 'undefined';
                options.pager = typeof $this.attr('pager') != 'undefined';
                options.controls = typeof $this.attr('controls') != 'undefined';
                options.autoStart = typeof $this.attr('autoStart') != 'undefined';
                if(options && options.setBackground) {
                    $this.find('li').each(function(i, el) {
                        var $el = $(el),
                            $img = $el.find('img'),
                            img = $img.attr('src');
                        $el.css({'background-image': 'url('+img+')'});
                    });
                }
                custom.callSlider($this, options);
            });
        },

        callSlider: function($el, options) {
            var oneSlider = ($('#slider').children().length < 2);
            var hasPager = options && options.pager && !oneSlider,
                hasControls = options && options.controls,
                autoStart = options && options.autoStart && !oneSlider;

            $el.bxSlider({
                speed: 600,
                pager: hasPager,
                auto: autoStart,
                autoStart: autoStart,
                autoHover: true,
                controls: hasControls,
                prevText: '',
                nextText: '',
            });
        },

        //assign background-image to div.bg: get src from image tag near it
        bgCover: function() {
            $('.bg').each(function(i, ele) {
                var $ele = $(ele),
                    $img = $ele.next('img').eq(0);
                if($img.length > 0) {
                    $ele.css({'background-image': 'url(' + $img.attr('src') + ')'});
                }
                else {
                    console.warn('fail to get src for bg');
                }

            });
        },

        fancyboxCall: function() {
            $('.fancybox').fancybox({
                padding: 0,
                closeBtn: false,
                openEffect  : 'elastic',
                nextEffect: 'fade',
                prevEffect: 'fade',
            });
        },

        backStretch : function () {
            //Classes need to run backstretch. Get url from css - background-image
            var setBgClasses = ['.bg'];
            var len = setBgClasses.length, i,
                $currentCollection = null, bgImage, imgSrc, $elem;
            for(i = 0; i < len; i++) {
                $currentCollection = $(setBgClasses[i]);

                $currentCollection.each(function(index, elem) {
                    $elem = $(elem);
                    bgImage = $elem.css('background-image');
                    if(typeof bgImage != 'undefined') {
                        imgSrc = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                        $elem.backstretch(imgSrc);
                    }
                    else {
                        console.warn('backstretch fail to find the image src');
                    }
                });
            }
        },


        showTab : function(){

            jQuery('.tab-container').each(function() {

            /*category buttons, hide and show, opacity change*/
                var tabContent = jQuery(this).find('.tab-content'),
                    tabBtn = jQuery(this).find('.tab-nav li'),
                    currentIndex = 0,
                    newIndex=0;

                tabContent.hide();
                tabContent.first().show();
                tabBtn.eq(currentIndex).addClass("active");

                /*category click*/
                tabBtn.click(function(e){

                    e.preventDefault();
                    e.stopPropagation();

                    tabContent.stop(true,true).fadeOut();
                    newIndex = tabBtn.index(this);
                    tabContent.stop(true,true).eq(newIndex).fadeIn(0);

                    var selectedIndex = tabBtn.index(this);

                    if(selectedIndex != currentIndex){
                        /*clear selected tab*/
                        tabBtn.eq(currentIndex).removeClass("active");
                        /*update currentIndex to clicked on tab's index*/
                        currentIndex = selectedIndex;
                        /*set selected tab*/
                        tabBtn.eq(currentIndex).addClass("active");
                    }
                });

            });

        },

        touchDeviceHover: function() {
            var $touchTarget = $('.hover-block').not('.m-no-hover');

            $touchTarget.on('touchstart', function(ev) {
                var $this = $(this);

                if(!$this.hasClass('visible')) {
                    $touchTarget.removeClass('visible');
                    $this.addClass('visible');
                    return false;
                }
                else {

                }
            });
        },

        naviconClick: function() {
            $('#navicon').on('click', function() {
                $(this).toggleClass('open');
            });
        },


    }

    $(document).ready(function($){
        custom.init();
    });


})(jQuery);
