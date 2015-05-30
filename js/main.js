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
        VideoTabs.init();
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
            $('.discovery, .part-3 .text').addClass('opacity-enabled');
            $('.trigger').addClass('attention');
        },
        clickWatcher: function () {
            $('.trigger').on('click', function(e){
                e.preventDefault();
                $(this).addClass('move').removeClass('attention');

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
                $('.discovery, .part-3 .text').removeClass('opacity-enabled').addClass('opacity-disabled');
            })
        }
    };
    if(!Modernizr.touch){
        SoundAnim.init();
    }

    //usb/ios switch bydlocode edition

    $('#ios-switch').on('click', function(){
        $('.ios-images').removeClass('hidden');
        $('.usb-images').addClass('hidden');
    });
    $('#usb-switch').on('click', function(){
        $('.usb-images').removeClass('hidden');
        $('.ios-images').addClass('hidden');
    });

    //remote video
    var RemoteVideo = {
        init: function(){
            RemoteVideo.clickWatch();
        },
        clickWatch: function(){
            $('#remoteVideoButton').on('click', function(e){
                e.preventDefault();
                var video = $(this).next().find('video');
                $(this).hide();
                RemoteVideo.playVideo(video);
            });
        },
        playVideo: function(targetVideo){

            targetVideo.get(0).play();


        }
    };

    if(!Modernizr.touch){
        RemoteVideo.init();
    }

    // GA events
    $('a.custom-navbar-toggle').not('.close').on('click', function(e){
        ga('send', 'event', 'menu', 'opened');
    });
    $('a.custom-navbar-toggle.close').on('click', function(e){
        ga('send', 'event', 'menu', 'closed');
    });
    $('a.custom-navbar-toggle.close').on('click', function(e){
        ga('send', 'event', 'menu', 'closed');
    });
    $('#modal-1').on('shown.bs.modal', function(e){
        ga('send', 'event', 'streaming-player-popup', 'opened');
    });
    $('#modal-1').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'streaming-player-popup', 'closed');
    });
    $('#modal-2').on('shown.bs.modal', function(e){
        ga('send', 'event', 'transform-to-play-popup', 'opened');
    });
    $('#modal-2').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'transform-to-play-popup', 'closed');
    });
    $('#modal-3').on('shown.bs.modal', function(e){
        ga('send', 'event', 'content-tip-popup', 'opened');
    });
    $('#modal-3').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'content-tip-popup', 'closed');
    });
    $('#modal-4').on('shown.bs.modal', function(e){
        ga('send', 'event', 'tv-for-kids-popup', 'opened');
    });
    $('#modal-4').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'tv-for-kids-popup', 'closed');
    });
    $('#modal-5').on('shown.bs.modal', function(e){
        ga('send', 'event', 'how-it-works-popup', 'opened');
    });
    $('#modal-5').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'how-it-works-popup', 'closed');
    });
    $('#modal-6').on('shown.bs.modal', function(e){
        ga('send', 'event', 'preorder-popup', 'opened');
    });
    $('#modal-6').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'preorder-popup', 'closed');
    });
    $('#modal-7').on('shown.bs.modal', function(e){
        ga('send', 'event', 'video-popup', 'opened');
    });
    $('#modal-7').on('hidden.bs.modal', function(e){
        ga('send', 'event', 'video-popup', 'closed');
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var tabName = e.target.href.split("#")[1];
        ga('send', 'event', 'tab-'+tabName, 'shown');
    })
    $('.trigger').on('click', function(e){
        ga('send', 'event', 'voice-search-animation', 'run');
    });
    $('#remoteVideoButton').on('click', function(e){
        ga('send', 'event', 'game-mode-animation', 'run');
    });
    $('a.eth').on('click', function(e){
        ga('send', 'event', 'ethernet-hint', 'shown');
    });
    $('a.wifi').on('click', function(e){
        ga('send', 'event', 'wifi-hint', 'shown');
    });

    $('.part-2 a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $('html, body').animate({
            scrollTop: $(".glyph-mouse").offset().top
        }, 1000);
    })

});