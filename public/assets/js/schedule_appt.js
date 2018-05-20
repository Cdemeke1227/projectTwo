
// const AppointmentPicker = require("appointment-picker");

// First user will select a service from dropdown menu
// Second user will select a stylist from dropdown menu
// Third user will select a day
// Fourth user will pick an appointment time
// READ READ READ READ READ READ READ READ READ READ READ READ
//
//  The idea behind all the logic in this js file is that the user should only be able to make 1 selection at a time. 
//    Since we have AJAX calls after every selection, inputs should be disabled until the ajax call is done and the information 
//  for the next input is there.
//  
//
$(document).ready(function () {

  $("#providerPick").hide();
  $("#datePick").hide();
  // $("#appointmentPick").hide();

  // Service selector 
  $("#serviceChoice").on("change", function () {
    // AT ANY TIME THE USER CHANGES THE SERVICE CHOICE MAKE SURE THE APPOINTMENT PICKER IS DISABLED AND DATE SELECTOR IS RESET ALONG WITH THE PROVIDER SELECTOR
    //Prior to this the provider selector shouldb be disable as well, simply saying please select a service. At any point if this event occurs again disable both selectors
    //When they user selectes their service disable the select to prevent the user from unknowingly create multiple ajax calls
    $(this).prop('disable', 'true');  //Add the property disable to the select
    var serviceSelection = $(this).val().trim(); // Get the current value of the select
    // Then we need to make sure all white spaces are relpaced with %20
    var serviceChosen = serviceSelection.replace(/ /g, '%20')
    // console.log(serviceChosen);
    var providerQuery = `/api/retrieve/providers/?all=no&specific=services&service_name=${serviceChosen}`; //Build the query and console.log it to make sure the query runs smoothly
    // console.log(providerQuery);

    //Make the ajax call
    $.ajax(providerQuery, {
      type: "GET",
      success: function (data) {
        // once we get the data create the elements and append them into the the selector for selecting the provider
        //Before that we can re-enable the service choice button as well as enable the provider selector button
        //Because we enabled the selector the event listener for the providerChoice would be able to work now
        // console.log('Provider Data: ' + data[0].provider.firstName);

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
    $("#providerPick").show();
  });

  //for each available service 
  //Provider selector
  $("#providerChoice").change(function () {
    // AT ANY TIME IF THE USE CHANGES THE DESIRED PROVIDER MAKE SURE YOU DISABLE THE APPOINTMENT PICKER AND DATE SELECTOR
    //Get the value of the selector
    //Disable all selectors to prevent user from making multiple ajax calls at one time
    // begin building your AJAX queryURL
    $(this).prop('disable', 'true');  //Add the property disable to the select
    var providerSelection = $(this).val().trim(); // Get the current value of the select
    // Then we need to make sure all white spaces are relpaced with %20
    var providerChosen = providerSelection.replace(/ /g, '%20')
    // console.log(providerChosen);
    var dateQueryURL = `/api/retrieve/schedule/?orderBy=start&direction=DESC&provider_id=${providerChosen}`;
    // console.log(dateQueryURL);

    $.ajax(dateQueryURL, {
      type: 'GET',
      success: function (data) {
        //From here you can re-enable the selectors because the AJAX call is over

        //You can now enable the buttons that allow users to select a time depending on the data recieve 
        //Get the data from the provider's schedule and allow users to select which date and time they wish to select
        // All of those buttons will have an event listener below 
        // console.log('Date Data: ' + data[0].startTime);

        for (var i = 0; i < data.length; i++) {
          var providerDays = data[i].startTime;
          var dateFormat = "MM/DD/YYYY";
          var date = moment(providerDays).format(dateFormat);
          console.log('Provider Data: ' + providerDays);
          // console.log('New Date:' + date);

          var daysList = $("#dateChoice");
          var optionDays = $("<option>");
          optionDays.text(date);
          optionDays.val(providerDays);
          daysList.append(optionDays);
        }

      }
    })

    $("#datePick").show();
  })
  //Date selections
  $('#dateChoice').change(function (e) {
    //Upon selection of the date disable everything
    // Create begin creating you AJAX call given the schedule ID that matches the date
    $(this).prop('disable', 'true');  //Add the property disable to the select
    var DaySelection = $(this).val().trim(); // Get the current value of the select
    // Then we need to make sure all white spaces are relpaced with %20
    var DayChosen = DaySelection.replace(/ /g, '%20')
    console.log(DayChosen);

    var queryURL;
    //This call should be looking for 1 specific schedule that matches the provider ID you got from the previous call and the schedule ID you just got from the logic above
    // joined with the appointments for the schedule
    $.ajax(queryURL, {
      type: "GET",
      success: function (data) {
        //Upong getting the all appointments for that specific schedule do the logic that begins to enable the appointment picker buttons
        // After that is done you may reable everything
        //Now the timeSelection event listener will now work
      }
    })
    $("#appointmentPick").show();
  })

  $("#reviewChoices").on('click', function () {
    //Once a user selects a time enable the submit button for the form to create the appointment
    $('#inputServiceChosen').val($('#serviceChoice').val());
    $('#inputServiceChosen').text($('#serviceChoice').text());

    $('#inputProviderChosen').val($('#providerChoice').val());
    $('#inputProviderChosen').text($('#providerChoice').text());

    $('#inputDayChosen').val($('#dateChoice').val());
    $('#inputDayChosen').text($('#dateChoice').text());
    
    $('#inputTimeChosen').val($('#time-2').val());
    $('#inputTimeChosen').text($('#time-2').text());
  })


  $("#appointmentCreator").on('submit', function (e) {
    e.preventDefault();

    //DISABLE USER INPUTS
    // TOGGLE A MODAL CONTAINING ALL THE INFORMATION THE USER JUST SELECTED FOR THEIR APPOINTMENT
    // THAT MODAL SHOULD CONTAIN ANOTHER FORM BUT ALL INPUTS SHOULD BE DISABLED THAT IS SIMPLY SO USER CAN CONFIRM IT

    //The modal on the form should direct straight to the post route and redirect accordingly... Done :D
  });


  $.fn.appointmentPicker = function (options) {
    this.appointmentPicker = new AppointmentPicker(this[0], options);
    console.log(this);

    return this;
  };

  var $picker2 = $('#time-2').appointmentPicker({
    title: "Available Appointments",
    interval: 30,
    mode: '12h',
    static: false,
    minTime: 09,
    maxTime: 20,
    startTime: 08,
    endTime: 22,
    disabled: ['16:30', '17:00'],
    large: true
  });

  document.body.addEventListener('change.appo.picker', function (e) { var time = e.time; }, false);




});

