$(document).ready(function () {
    $.ajax(
        {
            url: '/php/cursos_eventos/get.php',
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