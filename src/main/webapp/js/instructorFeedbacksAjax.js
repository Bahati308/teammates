$(document).ready(function(){
    var ajaxRequest = function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            cache: false,
            url: $(this).attr('action') + '?' + formData,
            beforeSend: function() {
                $('#sessionList').html('<img height="75" width="75" class="margin-center-horizontal" src="/images/ajax-preload.gif"/>');
            },
            error: function() {
                $('#sessionList').html('');
                var msg = 'Failed to load sessions. Please <a href="#" onclick="loadSessionsByAjax()">click here</a> to retry.';
                setStatusMessage(msg, true);
            },
            success: function(data) {
                clearStatusMessage();
                var appendedModalBody = $(data).find('#copySessionsBody').html();
                var appendedSessionTable = $(data).find('#sessionList').html();

                $('#button_copy').text('Copy from previous feedback sessions');
                $('#copySessionsBody').html(appendedModalBody);
                $('#sessionList').removeClass('align-center')
                                 .html(appendedSessionTable);
                bindEventsAfterAjax();
            }
        });
    };
    $('#ajaxForSessions').submit(ajaxRequest);
});