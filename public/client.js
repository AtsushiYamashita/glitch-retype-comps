// client-side js
// run by the browser each time your view template is loaded

$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var firstName = $('input#firstName').val();
    var lastName = $('input#lastName').val();
    $.post('/users?' + $.param({firstName:firstName, lastName:lastName}), function() {
      $('<li></li>').text(firstName + " " + lastName).appendTo('ul#users');
      $('input#firstName').val('');
      $('input#lastName').val('');
      $('input').focus();
    });
  });
});
