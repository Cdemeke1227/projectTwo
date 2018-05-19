// const AppointmentPicker = require("appointment-picker");

// First user will select a service from dropdown menu
// Second user will select a stylist from dropdown menu
// Third user will select a day
// Fourth user will pick an appointment time

$(document).ready(function () {

  // user selects service  
  $("#serviceChoice").on("change", function () {
    var serviceChosen = $(this).val();
    console.log(serviceChosen);

    var providerQuery = `api/retrieve/providers/?all=no&specific=services&service_name=${serviceChosen}`;
    console.log(providerQuery);

    $.ajax(providerQuery, {
      // $.ajax(`api/retrieve/providers/`, {
      type: "GET",
      success: function (data) {
        console.log('Provider Data: ' + data);
      },
      error: function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    });


  })
  //for each available service 



  $.fn.appointmentPicker = function (options) {
    this.appointmentPicker = new AppointmentPicker(this[0], options);
    console.log(this);
    return this;
  };

  var picker = $('#time').appointmentPicker({
    title: "Available Appointments",
    interval: 30,
    mode: '12h',
    static: true,
    minTime: 09,
    maxTime: 20,
    startTime: 08,
    endTime: 22,
    disabled: ['16:30', '17:00'],
    large: true
  });

  document.body.addEventListener('change.appo.picker', function (e) { var time = e.time; }, false);






  // $(document).on("click", ".dropdown-item", listServices);


});

