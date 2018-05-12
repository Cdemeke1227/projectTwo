$(document).ready(function(){




    // Registration Validation
        // Handlers for validation
    var nameInput = $("#name");
    var userInput = $("#username");
    var emailInput = $("#email");
    var passwordInput = $("#password");
    var password2Input = $("#password2");

    var nameAlert = $("#name-alert");
    var usernameAlert = $("#username-alert");
    var emailAlert = $("#email-alert");

    var pCapitalAlert = $("#capital");
    var pLowerAlert = $("#lower");
    var pNumAlert = $("#number");
    var pSpecAlert = $("#special");
    var plength = $("#length");

    var pMatches = $("#pass-match");


    // When user is focused on the inputs
    $('.sign-up-input').focus(function(){

        $("#sign-up-message").css("display","block");
    });


    //For Name alert
    $(nameInput).keyup(function(){
        var reg = /^(?=.*[a-zA-Z])[a-zA-Z\s']{1,}$/;
        if($(nameInput).val().match(reg)){
            $(nameAlert).removeClass('invalid');
            $(nameAlert).addClass("valid");
        }else{
            $(nameAlert).removeClass('valid');
            $(nameAlert).addClass("invalid");
        }
    });

    //For Username Input
    $(userInput).keyup(function(){
        var reg = /^[a-zA-Z0-9]{6,13}$/;
        if($(userInput).val().match(reg)){
            $(usernameAlert).removeClass('invalid');
            $(usernameAlert).addClass("valid");
        }else{
            $(usernameAlert).removeClass('valid');
            $(usernameAlert).addClass("invalid");
        }
    });

    //For Username Input
    $(emailInput).keyup(function(){
        var input = $(emailInput).val();
        var validated = validateEmail(input);

        if(validated){
           
            $(emailAlert).removeClass('invalid');
            $(emailAlert).addClass("valid");
        }else{
            $(emailAlert).removeClass('valid');
            $(emailAlert).addClass("invalid");
        }
    });

    //For password Input
    $(passwordInput).keyup(function(){
        //For Length 
        if($(passwordInput).val().length >= 6){
            $(plength).removeClass('invalid');
            $(plength).addClass('valid');
        }else {
            $(plength).removeClass('valid');
            $(plength).addClass('invalid');
        };
   
        // For lowercase letter
        var lowerCaseLetters = /[a-z]/g;
        if($(passwordInput).val().match(lowerCaseLetters)){
            $(pLowerAlert).removeClass('invalid');
            $(pLowerAlert).addClass('valid');
        }else {
            $(pLowerAlert).removeClass('valid');
            $(pLowerAlert).addClass('invalid');
        };

        // For uppercase
        var upperCaseLetters = /[A-Z]/g;
        if($(passwordInput).val().match(upperCaseLetters)){
            $(pCapitalAlert).removeClass('invalid');
            $(pCapitalAlert).addClass('valid');
        }else {
            $(pCapitalAlert).removeClass('valid');
            $(pCapitalAlert).addClass('invalid');
        };

        // For numbers

        var numbers = /[0-9]/g;
        if($(passwordInput).val().match(numbers)){
            $(pNumAlert).removeClass('invalid');
            $(pNumAlert).addClass('valid');
        }else {
            $(pNumAlert).removeClass('valid');
            $(pNumAlert).addClass('invalid');
        };

        var specChar = /[!@#$%^&*]/g;
        if($(passwordInput).val().match(specChar)){
            $(pSpecAlert).removeClass('invalid');
            $(pSpecAlert).addClass('valid');
        }else {
            $(pSpecAlert).removeClass('valid');
            $(pSpecAlert).addClass('invalid');
        };
    })
    
    $(password2Input).keyup(function(){
        var p1 = $(passwordInput).val().trim();

        if(p1 === $(this).val()){
            $(pMatches).removeClass('invalid');
            $(pMatches).addClass('valid');
        }else {
            $(pMatches).removeClass('invalid');
            $(pMatches).addClass('valid');
        }
    })

    // $("#newUser").submit(function(event){
    //     event.preventDefault();
    //     var newUser = {
    //         name: nameInput.val().trim(),
    //         username: userInput.val().trim(),
    //         email: emailInput.val().trim(),
    //         password: passwordInput.val().trim()
    //     };
    //         console.log(newUser)
    //     $.post('/users/register', newUser, function(response){
    //         console.log
    //     })
    // })


function validateEmail(email) {
    console.log(email)
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        return false;
    }else {
        return true;
    }
}

})