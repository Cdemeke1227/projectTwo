//const AppointmentPicker = require("appointment-picker");

$(document).ready(function(){

  populateServiceOptions();

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

  //populate service options
  function populateServiceOptions (){
    //temp array of services until database is hooked in
    var tempArray = [
      { id: 1, duration: 30, description: "Men's Cut" }, 
      { id: 2, duration: 30, description: "Women's Cut" },
      { id: 3, duration: 60, description: "Women's Cut & Style" },
      { id: 4, duration: 120, description: "Full Color" },
      { id: 5, duration: 90, description: "Partial Highlights" }
    ]
    //get list of available services from database

    //for each available service 
    tempArray.forEach(element => {
     
      //create a checkbox div and 
      var checkDiv = $("<div>").addClass("form-check");
      var checkBox = $("<input>").addClass("form-check-input checkbox-service").data("time", element.duration).attr({
            type: "checkbox",
            value: "",
            id: "service" + element.id
        }).data({"service": element.id});
      var checkLabel = $("<label>").addClass("form-check-label").attr({"for": "service" + element.id}).text(element.description);
      checkDiv.append(checkBox).append(checkLabel);
       console.log(`element ${element.description} added`);
       
       //append to $("#services") element
      $("#services").append(checkDiv);
      console.log($("#services"));
    });
  }  

  function calculateApptDuration (){
    //loop through checkboxes in $("#services") element and calculate the total appointment time needed for checked boxes
    
    var duration = 0;

    var serviceList = "";
    $('input[type=checkbox]').each(function () {
     if(this.checked){
       var serviceTime = $(this).data("time");
       duration += serviceTime;
       console.log(`adding ${serviceTime} minutes to total service`);
     }

    });
    console.log("total appointment duration " + duration);
    return duration;
  }

  $(".checkbox-service").change( function (e){
    var timeNeeded = calculateApptDuration();
    //adjust the appointment interval on the appointment picker
    picker = $('#time').appointmentPicker({
      interval: timeNeeded
    });
  });

  $('#time').on("change", function() {

  });

});