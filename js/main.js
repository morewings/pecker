$(document).ready(function(){
   //nav
    var navMenu=$('.navmenu');
    $('.navmenu .btn-wrap a').on('click', function(e){
        e.preventDefault();
        //navMenu.toggleClass('show-menu')
        $('.navmenu').offcanvas('toggle')
    });
/*    $('body')
        .on('show.bs.offcanvas', function(){
            $('#navbar-scroll').addClass('hide');
    })
        .on('hidden.bs.offcanvas', function(){
            $('#navbar-scroll').removeClass('hide');
    });*/

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
});
