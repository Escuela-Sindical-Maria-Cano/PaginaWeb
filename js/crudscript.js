$(document).ready(function () {
    $.ajax(
        {
            url: '/php/oauth/get.php',
            success: function (data) {
                var json = $.parseJSON(data);
                $("#login").attr("href", json.href);
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
                var json = $.parseJSON(data);
                var evento1 = json[0];
                var evento2 = json[1];
                var evento3 = json[2];
                completarCursoEvento(evento3, 1);
                completarCursoEvento(evento2, 2);
                completarCursoEvento(evento1, 3);
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );
})

function completarCursoEvento(evento, indice) {
    var tipoEvento = parsearEvento(evento["tipo_evento"]);
    $("#cursos-eventos-tipo-" + indice).html(tipoEvento);
    $("#cursos-eventos-imagen-" + indice).attr("src", evento["url_imagen"]);
    $("#cursos-eventos-titulo-" + indice).html(evento["titulo"]);
    $("#cursos-eventos-lugar-" + indice).html(evento["lugar"]);
    $("#cursos-eventos-horario-" + indice).html(evento["fecha_legible"]);
    $("#cursos-eventos-masinfo-" + indice).attr("href", "cursos_y_eventos/obtener.html?id=" + evento["curso_evento_id"]);

    $("#cursos-evento-skeleton-" + indice).addClass("d-none");
    $("#cursos-evento-card-" + indice).removeClass("d-none");
    $("#cursos-evento-card-"+indice).attr("onclick", "irAPaginaInterna('cursos_y_eventos/obtener.html?id=" + evento["curso_evento_id"]+"')");
}