$(document).ready(function(){
   //nav
    var mainHeight=$('#main').height(),
        navMenu=$('.navmenu');
    console.log(mainHeight);
    $('.custom-navbar-toggle').on('click', function(e){
        e.preventDefault();
        navMenu.toggleClass('show-menu')
    })
});
