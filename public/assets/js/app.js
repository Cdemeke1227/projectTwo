$(function () {



var offset = 120;

$('#navPageLinks ul li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});




});