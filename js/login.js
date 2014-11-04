$(document).ready(function() {
    $('input#login-button').on('click', function() {
        makeLogin();
    });
    $('input[name="_username"]').val('merkazi');
    $('input[name="_password"]').val('foo');
    setTimeout(function() {
        makeLogin();
    }, 100);
    setTimeout(function() {
        chrome.app.window.current().close();
    }, (20*1000));
    function makeLogin() {
        $.ajax({
            type: "POST",
            url: 'http://tattoo-env-qkrjcm3ghq.elasticbeanstalk.com/admin/login_check',
            data: $("#form-login").serialize(), // serializes the form's elements.
            success: function(data,e)
            {
                console.log(data, e);
                //chrome.app.window.current().close();
            },
            error: function() {
                $('.error').show();
            }
        });
    }
});