$(document).ready(function () {
    
    jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000;  // 2 seconds


    $.ajax("/api/services", {
        type: "GET",
        success: function (data) {
            console.log('Data: ' + data[0].category);

            // Reload the page to get the updated list
            var table = $("<tbody>");
            data.forEach(element => {
                var row = $("<tr>");
                var th = $("<th>").text(element.category);
                var tdService = $("<td>").text(element.description);
                var tdPrice = $("<td>").text(element.price);
                row.append(th).append(tdService).append(tdPrice);
                table.append(row);
            });
            $("#serviceTable").append(table);
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });


});

