$(document).ready(function() {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: {
            offset: (findGetParameter("pagina") - 1) * 5,
            limit: 5,
            filtro: findGetParameter("filtro")
        },
        success: function(data) {
            var json = $.parseJSON(data);
            $("#todos_grupos_artistas").html("");
            $(json.resultados).each(
                function() {
                    agregarGrupoArtista(this);
                });
            calcularPaginacion(json.total, findGetParameter("pagina"), '/info/musica/index.html?');
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
    $.ajax({
        url: '/php/grupos_artistas/filtrosCategoria.php',
        success: function(data) {
            var json = $.parseJSON(data);
            $("#count_protesta").html("(" + json.protesta + ")");
            $("#count_folclorica").html("(" + json.folclorica + ")");
            $("#count_rock").html("(" + json.rock + ")");
            $("#count_salsa").html("(" + json.salsa + ")");
            $("#count_rap").html("(" + json.rap + ")");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
    $.ajax({
        url: '/php/grupos_artistas/filtrosPais.php',
        success: function(data) {
            var json = $.parseJSON(data);
            for (var name in json) {
                $("#filtro_paises").append('<li><a href="#" class="d-flex" onclick="seleccionarPais(this, \'' + name + '\')"><p class="text-secondary">' + name + '</p><p>(' + json[name] + ')</p></a><a href="#" class="d-none eliminar" onclick="eliminarFiltro()"><p class="ml-auto p-2">X</p></a></li>');

            }

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
    div_artista.find(".enlace").attr("href", "/info/musica/obtener.php?id=" + $this.grupos_artistas_id);
    $("#todos_grupos_artistas ").append(div_artista);
}


function seleccionarCategoria($this, filtro) {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: { limit: 10, offset: 0, filtro: filtro },
        success: function(data) {
            $("#todos_grupos_artistas").html("");
            eliminarTodosLosFiltros();
            $($this).closest("li").addClass("btn btn-sm btn-primary");
            $($this).closest("li").find(".d-none").removeClass("d-none");
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    agregarGrupoArtista(this);
                });
            calcularPaginacion(json.total, 1, '/info/musica/index.html?filtro=' + filtro + "&");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
}

function seleccionarPais($this, filtro) {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: { limit: 10, offset: 0, filtro: filtro },
        success: function(data) {
            $("#todos_grupos_artistas").html("");
            eliminarTodosLosFiltros();
            $($this).closest("li").addClass("btn btn-sm btn-primary");
            $($this).closest("li").find(".d-none").removeClass("d-none");
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    agregarGrupoArtista(this);
                });
            calcularPaginacion(json.total, 1, '/info/musica/index.html?filtro=' + filtro + "&");
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
        data: { limit: 10, offset: 0 },
        success: function(data) {
            $("#todos_grupos_artistas").html("");
            eliminarTodosLosFiltros();
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    agregarGrupoArtista(this);
                });
            calcularPaginacion(json.total, 1, '/info/musica/index.html?');
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });
}