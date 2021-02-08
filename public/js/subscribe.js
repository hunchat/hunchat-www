Webflow.push(function() {
  const successMessage = $('#wf-form-Subscribe-Form-success');
  const failMessage = $('#wf-form-Subscribe-Form-fail');

  $('#wf-form-Subscribe-Form').submit(function(event) {
    var btn = $('input[type="submit"]');
    var label = btn.attr('value')
    btn.prop('disabled', true); // disable submit button
    var wait = btn.attr('data-wait')
    btn.val(wait) // set button value to "Please wait..."

    var formData = {
      'email': $('input[name=email]').val(),
    };
    $.ajax({
      type: 'POST',
      url: 'https://hunchat-api.herokuapp.com/api/invitations/',
      data: formData,
      dataType: 'json',
      encode: true
    })
      .done(function(data) {
        successMessage.toggle();

        // Reset submit button
        btn.prop('disabled', false); // enable submit button
        btn.val(label) // set button value to "Gain access"
      })
      .fail(function(data) {
        failMessage.toggle();

        // Reset submit button
        btn.prop('disabled', false); // enable submit button
        btn.val(label) // set button value to "Gain access"
      })

    event.preventDefault();
    return false;
  });
});
