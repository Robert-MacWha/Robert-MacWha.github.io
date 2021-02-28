function filterSelection(c,active) {
    // hide all the elements
    $(".all").hide();

    // show just the ones with the class 'c'
    $('.' + c).show();

    // update the active button
    $('.active').removeClass('active');
    $(active).addClass('active');
}

function deleteProject(id, name) {
    // make sure the user really wants to delete the project
    let r = confirm('Are you sure you want to delete the project "' + name + '"?');

    if (r) {

        const endpoint = `/portfolio/${id}`

        fetch(endpoint, { method: 'DELETE' })
        .then(() => { location.reload(); })
        .catch((err) => { console.log(err); })
    }
}

function previewImage (event) {
    // preview a selected image in the HTML
    const reader = new FileReader();
    reader.onload = function(){
        $('.preview').attr("src", reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
}