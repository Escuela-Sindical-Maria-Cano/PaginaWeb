$(document).ready(function() {
    $.ajax({
        url: '/php/grupos_artistas/get.php',
        data: { id: findGetParameter("id") },
        success: function(data) {
            var json = $.parseJSON(data);
            $(".nombre").html(json.nombre);
            $("#nacionalidad").html(json.nacionalidad);
            $("#descripcion").html(json.descripcion);
            $(".embed-container").html('<iframe src="https://www.youtube.com/embed/' + parsearYoutubeID(json.url_playlist_youtube) + '" frameborder = "0"> </iframe>');
            $("#pagina_web").html("<a target='_blank' href='" + json.pagina_web + "'>" + json.pagina_web + "</a>");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
})