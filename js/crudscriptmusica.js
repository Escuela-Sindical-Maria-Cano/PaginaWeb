$(document).ready(function() {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: {
            offset: findGetParameter("pagina") * 5,
            limit: 5
        },
        success: function(data) {
            var json = $.parseJSON(data);
            $(json).each(
                function() {
                    agregarGrupoArtista(this);
                });
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
    $.ajax({
        url: '/php/grupos_artistas/filtros.php',
        success: function(data) {
            var json = $.parseJSON(data);
            $("#count_protesta").html("(" + json.protesta + ")");
            $("#count_folclorica").html("(" + json.folclorica + ")");
            $("#count_rock").html("(" + json.rock + ")");
            $("#count_rap").html("(" + json.rap + ")");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
})

function agregarGrupoArtista($this) {
    var div_artista = $("#artista_example").clone();
    div_artista.removeAttr("id");
    div_artista.removeClass("d-none");
    div_artista.find(".nombre").html($this.nombre);
    div_artista.find(".nacionalidad").html($this.nacionalidad);
    div_artista.find(".genero").html(parsearGenero($this.genero));
    div_artista.find(".descripcion").html(recortar($this.descripcion, 300));
    div_artista.find(".embed-container").html('<iframe src=https://www.youtube.com/embed/' + parsearYoutubeID($this.url_playlist_youtube) + ' frameborder = "0"> </iframe>');
    div_artista.find(".enlace").attr("href", "/info/musica/obtener.html?id=" + $this.grupos_artistas_id);
    $("#todos_grupos_artistas ").append(div_artista);
}


function seleccionarCategoria($this, filtro) {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: { limit: 10, ofsset: 0, filtro: filtro },
        success: function(data) {
            $("#todos_grupos_artistas").html("");
            eliminarTodosLosFiltros();
            $($this).closest("li").addClass("btn btn-sm btn-primary");
            $($this).closest("li").find(".d-none").removeClass("d-none");
            var json = $.parseJSON(data);
            $(json).each(
                function() {
                    agregarGrupoArtista(this);
                });
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
}

function eliminarTodosLosFiltros() {
    $(".cat-list").find(".btn-primary").removeClass("btn btn-sm btn-primary");
    $(".cat-list").find(".eliminar").addClass("d-none");
}

function eliminarFiltro() {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: { limit: 10, ofsset: 0 },
        success: function(data) {
            $("#todos_grupos_artistas").html("");
            eliminarTodosLosFiltros();
            var json = $.parseJSON(data);
            $(json).each(
                function() {
                    agregarGrupoArtista(this);
                });
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
}