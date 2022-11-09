var url = 'https://script.google.com/macros/s/AKfycbwHGbRaykdqehcxCMiSr2c2FGQIVLEhuebuRyNQdNoSRusQ-1CeUB2yYHMprOVmsCCX/exec';
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
                        }, 4000);
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
        if (window.location.href.indexOf("standesamt") > -1) {
            var tag = "trauung"
        }
        else if (window.location.href.indexOf("party") > -1) {
            var tag = "party"
        }
        var data = $(this).serialize() + '&tag=' + tag;
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

var $grid = $('#main-row').imagesLoaded( function() {
    $grid.masonry({
        "percentPosition": true
    });
});