$(document).ready(function() {
    $.ajax({
        url: '/php/grupos_artistas/get.php',
        data: { id: findGetParameter("id") },
        success: function(data) {
            var json = $.parseJSON(data);
            $(".embed-container").html('<iframe src="https://www.youtube.com/embed/' + parsearYoutubeID(json.url_playlist_youtube) + '" frameborder = "0"> </iframe>');
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
})