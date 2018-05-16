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


// In order launch sign up modal place targer #placeholde
var signupErr = $("#sign-up-error-msg").text().trim().length;
var loginErr = $("#login-error-msg").text().trim().length;;

console.log(signupErr);
if(signupErr > 1){
    $('#signupModal').modal('toggle');
    $('#signupModal').modal('show');
};
if(loginErr > 1){
    $('#loginModal').modal('toggle');
    $('#loginModal').modal('show');
};


// Changes what's being displayed in settingsModal as the user changes the value of the input
$('.settingsChild').keyup(function(){

    $(this).closest('.settingsParent').children('.childText').text($(this).val().trim());
});
});