Webflow.push(function() {
  const successMessage = $('#wf-form-Subscribe-Form-success');
  const failMessage = $('#wf-form-Subscribe-Form-fail');

  $('#wf-form-Subscribe-Form').submit(function(event) {
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
      })
      .fail(function(data) {
        failMessage.toggle();
      })
    event.preventDefault();
    return false;
  });
});
