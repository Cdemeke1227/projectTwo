$(document).ready(function (){

    $.ajax("/api/retrieve/providers", {
        type: "GET",
        success: function (data) {
            console.log('Data: ' + data);

            // Reload the page to get the updated list
            
            for (var i = 0; i < 2; i++)
            {
                var name = `${data[i].firstName} ${data[i].lastName}`;
                var title = data[i].title;
                var bio = data[i].notes;
                var email = data[i].email;
                var phone = data[i].phone;
                var pic = data[i].photoLink;

                $("#service" + i + "_name").text(name);
                $("#service" + i + "_title").text(title);
                $("#service" + i + "_bio").text(bio);
                $("#service" + i + "_email").text(email);
                $("#service" + i + "_phone").text(phone);

                $("#service" + i + "_pic").attr({'src': pic });
            }
            
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
});