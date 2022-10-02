var url = 'https://script.google.com/macros/s/AKfycby3a04eEi3uQhH9NZYqo667Zg17TCJp09EMRRkXbJ0AquUMBxrArhpNMPh2x02ltDtS/exec'

$(document).ready(function () {
    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));
        is_valid_invitation_id(data);
        $.post(url, data)
                .done(function (data) {
                    if (data.result === 'error') {
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
    });
});

function is_valid_invitation_id(data)
{
    $.get(url, data)
        .done(function(data) {
            return data.isValid
          });
}

// alert_markup
function alert_markup(alert_type, msg) {
    return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
}