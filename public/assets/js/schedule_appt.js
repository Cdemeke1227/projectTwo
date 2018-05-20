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
  var datesWorkedWithTimes;
  $('.scheduleLabels').tooltip();
  $("#serviceChoice").on("change", function () {

    $("#serviceChoice").prop('disabled', 'disabled');  
    $("#serviceSchedLabel").attr({
      id : 'serviceSchedLabel',
      class: 'scheduleLabels',
      for : "serviceChoice",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

  
    $("#providerChoice").prop('disabled','disabled').empty().append("<option selected> Any </option>");

    $("#providerSchedLabel").attr({
      id : 'providerSchedLabel',
      class: 'scheduleLabels',
      for : "providerChoice",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $("#date").prop('disabled', 'disabled');
    $("#dateSchedLabel").attr({
      id : 'dateSchedLabel',
      class: 'scheduleLabels',
      for : "date",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $("#time-2").prop('disabled', 'disabled');
    $("#timeSchedLabel").attr({
      id : 'timeSchedLabel',
      class: 'scheduleLabels',
      for : "time-2",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $('.appo-picker').detach();


    var serviceChosen = $(this).val().trim();
    serviceChosen = encodeURIComponent(serviceChosen.trim())


    var providerQuery = `api/retrieve/services/?all=no&specific=service&service_name=${serviceChosen}`; 



    $.ajax(providerQuery, {
      type: "GET",
      success: function (data) {
    
        for(var i = 0; i < data.length; i++){
          var option = $("<option>").attr({
            value : data[i].ProviderId
          }).html(data[i].Provider.firstName + " " + data[i].Provider.lastName);

          $("#providerChoice").append(option);
        };

        $("#providerChoice").prop('disabled', false);
        $("#serviceChoice").prop('disabled', false);
      },
      error: function (request, error) {
        alert("Request: " + JSON.stringify(request));
      }
    });


  })

  $("#providerChoice").change(function(){
    $("#serviceChoice").prop('disabled', 'disabled');  
    $("#serviceSchedLabel").attr({
      id : 'serviceSchedLabel',
      class: 'scheduleLabels',
      or : "serviceChoice",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });


    $("#providerChoice").prop('disabled','disabled');

    $("#providerSchedLabel").attr({
      id : 'providerSchedLabel',
      class: 'scheduleLabels',
      for : "providerChoice",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $("#date").prop('disabled', 'disabled');
    $("#dateSchedLabel").attr({
      id : 'dateSchedLabel',
      class: 'scheduleLabels',
      for : "date",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $("#time-2").prop('disabled', 'disabled');
    $("#timeSchedLabel").attr({
      id : 'timeSchedLabel',
      class: 'scheduleLabels',
      for : "time-2",
      'data-toggle' : "tooltip",
      'data-placement' :"left",
      title : "Information is currently loading"
    });

    $('.appo-picker').detach();   
    



    var provider_id = $('#providerChoice').val().trim();

    var queryURL = '/api/retrieve/schedule/?orderBy=start&provider_id=' + provider_id;

    $.ajax(queryURL,{
      type: 'GET',
      success: function(data){
        $("#datepicker").prop('disabled',false);
        var datesWorked = [];
        datesWorkedWithTimes = [];

        for(var i = 0; i < data.length; i++){
         
          var dateStart = data[i].startTime;
          var dateE = data[i].endTime;
          var date = dateStart.split('T');
          var dateEnd = dateE.split('T');
          var schedule = {};
          datesWorked.push(date[0]);
          var key = date[0];

          schedule = {
            id : data[i].id,
            date : date[0],
            startTime : date[1],
            endTime : dateEnd[1]
          }
          datesWorkedWithTimes.push(schedule);

          

          
        }


        $('#datepicker').datepicker({
          dateFormat: 'yy-mm-dd',
          beforeShowDay: function(dt){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', dt);
  
            return [ datesWorked.includes(string) ]
 
         }
          });



      }
    })

    
  })

  $('#datepicker').change(function(){


    var key = $(this).val().trim()


    var scheduleID;
    var indexDate;
    for(var i = 0; i < datesWorkedWithTimes.length; i++){
      if(datesWorkedWithTimes[i].date === $(this).val().trim()){
        scheduleID = datesWorkedWithTimes[i].id;
        indexDate = i;
      }
    }

    indexDate = datesWorkedWithTimes[indexDate];

 

    var queryURL = '/api/retrieve/schedule/?orderBy=start&schedule_id=' + scheduleID;


    $.ajax(queryURL, {
      type: "GET",
      success: function(data){

        var timesTaken = [];
        for(var i = 0; i < data[0].Appointments.length; i++){
          var startDateT = data[0].Appointments[i].appointStart;
          var startSplit = startDateT.split('T');
          var timeStart = startSplit[1];

          var convertedTime = timeStart.split(':');
          var convertedDuration = data[0].Appointments[i].duration.split(':');
          convertedDuration= convertedDuration[1] + ":" + convertedDuration[2];
          convertedTime = convertedTime[0] + ":" + convertedTime[1];
          var time = {
            start : convertedTime,
            duration : convertedDuration
          };

          timesTaken.push(time);


        }



        var disabledArr = [];


        var entry = indexDate.startTime.split(":");
        var leave = indexDate.endTime.split(':');

        for(var i = 0; i < timesTaken.length; i++){

          var thisAppArr = converter(timesTaken[i].start,timesTaken[i].duration);
          for (var j = 0; j < thisAppArr.length; j++){
            disabledArr.push(thisAppArr[j]);
          }
        };

        $("#time-2").prop('disabled', false);

        appPicker(disabledArr, Number(entry[0]), Number(leave[0]));

      }
    })
    })

  $(".").on('change', function(){
    console.log($(this).val());
    $('#submitAppointment').prop('disabled', false);


  })


  $("#appointmentForm").on('submit', function(event){
    event.preventDefault();
    $("#Review").modal('toggle');
    $("#Review").modal('show');
    
  });



  function appPicker(array, entry, leave){

    console.log(entry,leave);

  $.fn.appointmentPicker = function (options) {
    this.appointmentPicker = new AppointmentPicker(this[0], options);
    console.log(this);
    return this;
  };
  var $picker2 = $('#time-2').appointmentPicker({
    title: "Available Appointments",
    interval: 30,
    mode: '12h',
    static: true,
    minTime: 09,
    maxTime: 20,
    startTime: entry,
    endTime: leave,
    disabled: array,
    large: true
  });

  document.body.addEventListener('change.appo.picker', function (e) { 
    var time = e.time;

    $('#inputServiceChosen').val($('#serviceChoice').val());
    $('#inputServiceChosen').text($('#serviceChoice').text());

    $('#inputProviderChosen').val($('#providerChoice').val());
    $('#inputProviderChosen').text($('#providerChoice').text());

    $('#inputDayChosen').val($('#datepicker').val());
    $('#inputDayChosen').text($('#datepicker').text());
    
    $('#inputTimeChosen').val($('#time-2').val());
    $('#inputTimeChosen').text($('#time-2').text());

    $("#submitAppointment").prop('disabled', false);

  }, false);


  }



function converter(start, duration){
  // start format  hh:mm 
  // duration format hh:mm
  var arr = [start];

  var splitDur = duration.split(':');

  var count = 0;

  count += (parseInt(splitDur[0]) * 2);

  count += (parseInt(splitDur[0]) / 30);


  var newTime = start;
  for(var i = 1; i < Math.floor(count); i++){
 
    var startSplit = newTime.split(':');

    var newHr = startSplit[0];
    var newMin = (parseInt(startSplit[1]) + 30);
    if(newMin === 60){
      var newMin = '00';

      var newHr = (parseInt(startSplit[0]) + 1);

    }

    newTime = newHr + ":" + newMin;

    arr.push(newTime);
  }

  return arr;

}

  // $(document).on("click", ".dropdown-item", listServices);

});

