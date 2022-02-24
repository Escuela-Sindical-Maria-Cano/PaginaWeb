$(document).ready(function () {
    $.ajax(
        {
            url: '/php/cursos_eventos/get.php',
            data: { id: findGetParameter("id") },
            success: function (data) {
                var json = $.parseJSON(data);
                $("#actual_curso_evento").html(json.titulo);
                $("#curso_evento_logo").attr("src", seleccionarIcono(json.tipo_evento));
                $("#titulo_evento").html(json.titulo);
                $("#horario_evento").html(json.fecha);
                $("#imagen_evento").attr("src", json.url_imagen);
                $("#descripcion_evento").html(parsearParrafos(json.descripcion));
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );
}
)

function seleccionarIcono(tipoEvento) {
    var resultado = "/iconos/stream.png";
    if (tipoEvento === "stream") {
        resultado = "/iconos/stream.png";
    } else if (tipoEvento === "historia") {
        resultado = "/iconos/historia.png";
    } else if (tipoEvento === "curso") {
        resultado = "/iconos/charla.png";
    } else if (tipoEvento === "prostesta") {
        resultado = "/iconos/protesta.png";
    }
    return resultado;
}