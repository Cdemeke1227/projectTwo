$(function () {



var offset = 120;

$('#navPageLinks ul li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});



// SignUp modeal open
function signupModal () {
    event.preventDefault();
    $('#signupModal').modal('toggle');
    $('#signupModal').modal('show');
console.log("hello");
}


// In order launch sign up modal place targer #placeholder
$(document).on('click', '#placeholder',  signupModal);


});