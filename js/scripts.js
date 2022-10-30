var url = 'https://script.google.com/macros/s/AKfycbwQDZnJqC5LgB26nPj5jGsC7wR79MPkpJC_gNMsap18RNbJUxPizjWcF9J5zBxZdE_l/exec';
var messageCodeCheck = "Dein Code wird überprüft.";
var messageWrongInvitationCode = "Code leider nicht korrekt. 🙁";
var messageServerError = "Leider ist ein Fehler aufgetreten. 🙁";

$(document).ready(function () {
    /********************** RSVP **********************/
    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('.rsvp--status').text(messageCodeCheck)
        $.post(url, data)
                .done(function (data) {
                    if (data.result === 'error') {
                        $('.rsvp--status').text(messageWrongInvitationCode);
                        setTimeout(function(){
                            $('.rsvp--status').html("</br>");
                        }, 4000);
                    } else {
                        $('.rsvp--status').text("Deine Daten wurden übertragen.");
                        setTimeout(function(){
                            $('.rsvp--status').html("</br>");
                        }, 2000);
                    }
                })
                .fail(function (data) {
                    $('.rsvp--status').text(messageServerError);
                        setTimeout(function(){
                            $('.rsvp--status').html("</br>");
                        }, 4000);
                });
    });

    $('#drive-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $('.google-drive--status').text(messageCodeCheck)
        $.get(url, data)
                .done(function (data) {
                    if (data.result === 'error') {
                        $('.google-drive--status').text(messageWrongInvitationCode);
                        setTimeout(function(){
                            $('.google-drive--status').html("</br>");
                        }, 4000);
                    } else {
                        $('.google-drive--status').html('<a href="' + data.driveURL + '" target="_blank" class="google-drive--link">Zu Google Drive</a>');
                    }
                })
                .fail(function (data) {
                    $('.google-drive--status').text(messageServerError);
                        setTimeout(function(){
                            $('.google-drive--status').html("</br>");
                        }, 4000);
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
