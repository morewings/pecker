$(document).ready(function(){
   //nav
    var OffCanvas ={
        init: function(){

        },
        setHeight: function(){

        },
        showMenu: function(){

        },
        hideMenu: function(){

        }

    };

    var navMenu=$('.navmenu');
    $('.navmenu .btn-wrap a').on('click', function(e){
        e.preventDefault();
        $('.navmenu').offcanvas('toggle')
    });


    //tab-drop
    $('#collapse-tabs').tabdrop({
        text:'<i class="glyph-menu"></i>'
    });

    //sticky menu
    if (!Modernizr.touch){
        var topMenu = $('.top-menu'),
            navHeight = topMenu.outerHeight();
        function scrollCheck(){
            ($(window).scrollTop() > navHeight) ? topMenu.addClass('sticky') : topMenu.removeClass('sticky');
        }
        scrollCheck();
        $(window).on('scroll', function() {
            scrollCheck();
        });
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





});
