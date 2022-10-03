var url = 'https://script.google.com/macros/s/AKfycby3a04eEi3uQhH9NZYqo667Zg17TCJp09EMRRkXbJ0AquUMBxrArhpNMPh2x02ltDtS/exec'

$(document).ready(function () {
    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        Swal.showLoading();
        var data = $(this).serialize();
        $.post(url, data)
                .done(function (data) {
                    Swal.hideLoading()
                    if (data.result === 'error') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
                .fail(function (data) {
                    console.log(data);
                    alert_markup();
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
