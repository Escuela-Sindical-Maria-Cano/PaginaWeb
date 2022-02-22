$(document).ready(function () {
    $.ajax(
        {
            url: '/php/oauth/get.php',
            data: { limit: 3 },
            success: function (data) {
                var json = $.parseJSON(data);
               $("#login").attr("href", json.href)
               console.log('Data from the server' + json.href);
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );
    $.ajax(
        {
            url: '/php/cursos_eventos/list.php',
            data: { limit: 3 },
            success: function (data) {
                console.log('AJAX call was successful!');
                console.log('Data from the server' + data);
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );
})