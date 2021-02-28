let parallax_level = $("#page").children().length - 1;
update_parallax_pos();

$(function() {
    $('#page').fullpage({
        navigation: true,
        css3: false,
        fadingEffect: true,
        anchors:['header', 'projects', 'focus', 'about'],
        scrollingSpeed: 1000,
        verticalCentered: false,

        onLeave: (origin, destination, direction) => {

            // Update the position of the parallax elements in the background
            parallax_level += origin.index - destination.index;
            update_parallax_pos();
        
        },
    });
});

function update_parallax_pos() {
    // get all parallax elements and move them
    let elements = document.getElementsByClassName('parallax_element');

    for (let e of elements) {
        let speed = e.getAttribute('speed');
        e.style.marginBottom = -parallax_level * speed * 4 + 'vh';
    }
}