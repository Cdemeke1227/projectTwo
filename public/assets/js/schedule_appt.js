//const AppointmentPicker = require("appointment-picker");








// $(document).ready(function(){

//   $.fn.appointmentPicker = function (options) {
//     this.appointmentPicker = new AppointmentPicker(this[0], options);
//     console.log(this);
//     return this;
//   };

//   // var picker = new AppointmentPicker(document.getElementById('time'), {
//   //   interval: 30,
//   //   mode: '12h',
//   //   minTime: 09,
//   //   maxTime: 20,
//   //   startTime: 08,
//   //   endTime: 22,
//   //   disabled: ['16:30', '17:00'],
//   //   large: true
//   // });  

//   var $picker = $('#time').appointmentPicker({
//     title: "Available Appointments",
//     interval: 30,
//     mode: '12h',
//     static: true,
//     minTime: 09,
//     maxTime: 20,
//     startTime: 08,
//     endTime: 22,
//     disabled: ['16:30', '17:00'],
//     large: true
//   });

//   document.body.addEventListener('change.appo.picker', function (e) { var time = e.time; }, false);

// });