$(document).ready(function(){
    // Update header depending on user scroll location
    $(window).scroll(function() {

        if ($(window).scrollTop() >= 20) {
            $('#header').addClass("moved");
        } else {
            $('#header').removeClass("moved");
        }
    });
});