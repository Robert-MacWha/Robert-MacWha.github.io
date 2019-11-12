//Load particle effect from particles.js library with propper config + canvas
particlesJS.load('particles-js', 'particles.json', function() {
    console.log("Particles.json loaded");
});
//Jquery loading
$(function() {
    //Load effects if the page is being loaded for the first time
    $(".showcase .main").delay(0).fadeIn(1000);
    $("header").delay(500).fadeIn(1000);
    $(".showcase a").delay(500).fadeIn(1000);
    // Add smooth scrolling to all links with scroll_link ID
    let scrollSpeed = 800;
    $("#scroll_link").on('click', function(event) {
        //Hide the link
        $(this).fadeOut(scrollSpeed);
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, scrollSpeed, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        } // End if
    });
});