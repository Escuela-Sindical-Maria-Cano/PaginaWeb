$(document).ready(function () {
    $.ajax(
        {
            url: '/php/'+ $("main").attr('entidad')+'/list.php',
            data: { limit: 10, ofsset:0},
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