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
var loginErr = $("#login-error-msg").text().trim().length;
var settingsErr = $("#settings-error-msg").text().trim().length;

console.log(signupErr);
if(signupErr > 1){
    $('#signupModal').modal('toggle');
    $('#signupModal').modal('show');
};
if(loginErr > 1){
    $('#loginModal').modal('toggle');
    $('#loginModal').modal('show');
};

if(settingsErr > 1){
    $("#userSettingsModal").modal('toggle');
    $("#userSettingsModal").modal('show');
}


// Changes what's being displayed in settingsModal as the user changes the value of the input
$('.settingsChild').keyup(function(){

    $(this).closest('.settingsParent').children('.childText').text($(this).val().trim());
});


var providerQuery = `/api/retrieve/providers/?all=yes`; 
    console.log(providerQuery);
    //Make the ajax call
    $.ajax(providerQuery, {
      type: "GET",
      success: function (data) {

        for (var i = 0; i < data.length; i++) {
          var providerFirstName = data[i].provider.firstName;
          var providerID = data[i].provider.id;
          // console.log('Provider Data: ' + providerFirstName);

          var providerList = $("#providerChoice");
          var optionProvider = $("<option>");
          optionProvider.text(providerFirstName);
          optionProvider.val(providerID);
          providerList.append(optionProvider);
        }
      },
      error: function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    });



});