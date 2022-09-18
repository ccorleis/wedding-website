/********************** RSVP **********************/
$('#rsvp-form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();

    $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

    if (MD5($('#invite_code').val()) !== 'b0e53b10c1f55ede516b240036b88f40'
        && MD5($('#invite_code').val()) !== '2ac7f43695eb0479d5846bb38eec59cc') {
        $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
    } else {
        $.post('https://script.google.com/macros/s/AKfycbwdE8YuoBVVUglGoIUQeA7Z98OtkJZZ3GRtJuzJhPy4Qpv-hXaMSAr9YSbRlj_ET5Q3/exec', data)
            .done(function (data) {
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html('');
                    $('#rsvp-modal').modal('show');
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
            });
    }
});
