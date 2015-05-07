$(document).ready(function(){
   //nav
    var navMenu=$('.navmenu');
    $('.custom-navbar-toggle').on('click', function(e){
        e.preventDefault();
        navMenu.toggleClass('show-menu')
    })
});
