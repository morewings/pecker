$(document).ready(function(){
   //nav
    var OffCanvas ={

        init: function(){
            //OffCanvas.setHeight();
            OffCanvas.toggleMenu();

        },
        setHeight: function(){
            var height = $(window).height();
            console.log(height);
            $('.navmenu').css('height',height);
        },
        toggleMenu: function(){
            $('.custom-navbar-toggle').on('click', function(e){
                e.preventDefault();
                $('.navmenu').toggleClass('show-menu');
            })
        }

    };

    OffCanvas.init();



    //tab-drop
    $('#collapse-tabs').tabdrop({
        text:'<i class="glyph-menu"></i>'
    });

    //sticky menu
    var topMenu = $('.top-menu:not(.partners)');
    if (!Modernizr.touch){
        var navHeight = topMenu.outerHeight();
        topMenu.addClass('navbar-fixed-top');
        function scrollCheck(){
            ($(window).scrollTop() > navHeight) ? topMenu.addClass('sticky') : topMenu.removeClass('sticky');
        }
        scrollCheck();
        $(window).on('scroll', function() {
            scrollCheck();
        });
    }
    if (Modernizr.touch){
        topMenu.addClass('navbar-default');
    }


    //video load


    var VideoTabs ={
        playing:{},

        init: function(){
            VideoTabs.findVideo();
            VideoTabs.clickWatch();
        },

        build: function(targetVideo,targetTabName){
            targetVideo
                .attr({
                    'src': './video/'+ targetTabName.substring(1) + '/video.'+VideoTabs.browserComp(),
                    'type': 'video/webm; codecs="vp8, vorbis"',
                    'preload': 'auto'
                });

            //console.log('build triggered');
            VideoTabs.playVideo(targetVideo);

        },

        browserComp: function () {
            if(Modernizr.video.webm){
                return 'webm'
            }
            else{
                return 'mp4'
            }
        },

        playVideo: function(targetVideo){

            targetVideo
                .load()
                .on('canplaythrough', function(){
                    $(this).addClass('playing').get(0).play();

                });

            VideoTabs.playing = targetVideo;

            //console.log('playVideo triggered');
            //console.log(targetVideo);
            //console.log(VideoTabs.playing);
        },

        findVideo: function(){
            var targetTabName = $('#collapse-tabs').find('.active a').attr('href'),
                targetVideo = $(targetTabName).find('video');


            VideoTabs.build(targetVideo,targetTabName);

        },

        clickWatch: function(){
            $('#collapse-tabs').on('click', 'a', function(){
                var targetTabName = $(this).attr('href'),
                    targetVideo = $(targetTabName).find('video');
                VideoTabs.destroyVideo(VideoTabs.playing);
                VideoTabs.build(targetVideo,targetTabName);
            });
            //console.log('clickWatch triggered');
        },


        destroyVideo: function (targetVideo) {
            targetVideo.get(0).pause();
            targetVideo.attr({
                'src': ''
            });
            targetVideo.get(0).load();
            targetVideo.removeAttr('src');
            //console.log('destroy triggered');

        }
    };

    if(!Modernizr.touch){
        //VideoTabs.init();
    }


    //usb wifi test

    $('.link-wrap').on('click', 'a', function(e){
        e.preventDefault();
        var className = $(this).attr('class');
        $('.part-6 .highlight').removeClass('invisible');
        $('.part-6 .highlight span').addClass('hidden');
        $('.part-6 .highlight .'+className).removeClass('hidden');

    });

    //animation

    var SoundAnim = {
        init: function(){
            SoundAnim.clickWatcher();
        },
        clickWatcher: function () {
            $('.trigger').on('click', function(e){
                e.preventDefault();
                $(this).addClass('move');

                SoundAnim.transitionWatcher1(this);
                $('.animation .trigger').off('click');
            })
        },
        transitionWatcher1: function(target){
            $(target).on('transitionend webkitTransitionEnd MSTransitionEnd', function(){
                $(target).addClass('sound');
                $(target).off('transitionend webkitTransitionEnd MSTransitionEnd');
                SoundAnim.transitionWatcher2(target);
            })

        },
        transitionWatcher2: function(target){
            $(target).on('animationend MSAnimationEnd webkitAnimationEnd', function(){
                $(target).addClass('sound-end').removeClass('sound');
                $(target).off('animationend MSAnimationEnd webkitAnimationEnd');
            })
        }
    };
    if(!Modernizr.touch){
        SoundAnim.init();
    }

});
