Webflow.push(function() {
  const successMessage = $('#wf-form-Contact-Form-success');
  const failMessage = $('#wf-form-Contact-Form-fail');

  $('#wf-form-Contact-Form').submit(function(event) {
    var formData = {
      "email": $('input[name=Email]').val(),
      "topic": $('input[name=Topic]').val(),
      "message": $('textarea[name=Message]').val(),
    };
    $.ajax({
      type: 'POST',
      url: '/contact',
      data: formData,
      dataType: 'json',
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
