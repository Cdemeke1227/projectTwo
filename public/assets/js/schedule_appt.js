var AppointmentPicker = require ('appointment-picker');

// To use appointmentPicker as jQuery plugin
$.fn.appointmentPicker = function (options) {
  appointmentPicker = new AppointmentPicker(this[0], options);
  return this;
};