$(document).ready(function () {
    $.ajax(
        {
            url: '/php/cursos_eventos/list.php',
            data: { limit: 10, ofsset: 0 },
            success: function (data) {
                var json = $.parseJSON(data);
                $(json).each(
                    function () {
                        $('#lista_examinar > tbody').append(
                            '<tr><td>' + this.tipo_evento
                            + '</td><td>'
                            + this.titulo
                            + '</td><td>'
                            + this.fecha
                            + '</td><td>'
                            + this.lugar
                            + '</td><td>'
                            + recortar(this.descripcion, 200)
                            + '</td><td class="text-center">'
                            + '<span class="clickeable fa-solid fa-pen-to-square" onClick="editar(' + this.curso_evento_id + ')"></span>'
                            + '</td><td class="text-center">'
                            + '<span class="clickeable fa-solid fa-trash" onClick="eliminar(' + this.curso_evento_id + ')"></span>'
                            + '</td></tr>')
                    });
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );

    $('#fecha_evento').datetimepicker();

})

function editar(id) {
    $("#editar").addClass("d-none");
    $("#problema_creando_Evento").addClass("d-none");
    $.ajax(
        {
            url: '/php/cursos_eventos/get.php',
            data: { id: id },
            success: function (data) {
                var json = $.parseJSON(data);
                $("#editar").attr("idCursoEvento", json.curso_evento_id);
                $("#tipo_evento").val(json.tipo_evento).change();
                $("#titulo_evento").val(json.titulo);
                $("#fecha_evento").val(json.fecha);
                $("#lugar_evento").val(json.lugar);
                $("#descripcion_evento").val(json.descripcion);
                $("#imagen_evento").html('<img src="' + json.url_imagen + '" class="img-fluid">');
                $("#editar").removeClass("d-none");
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );

}

function agregarNuevoCursoEvento() {
    $("#editar").addClass("d-none");
    $("#editar").removeAttr("idCursoEvento");
    $("#tipo_evento").val("streaming").change();
    $("#titulo_evento").val("");
    $("#fecha_evento").val("");
    $("#lugar_evento").val("");
    $("#descripcion_evento").val("");
    $("#imagen_evento").html('');
    $("#editar").removeClass("d-none");
    $("#problema_creando_Evento").addClass("d-none");
}

function guardarEvento() {
    var data = new FormData();
    data.append('imagen_evento', $('#image_file_evento').prop('files')[0]);
    data.append('tipo_evento', $("#tipo_evento").val());
    data.append('titulo_evento', $("#titulo_evento").val());
    data.append('fecha_evento', $("#fecha_evento").val());
    data.append('lugar_evento', $("#lugar_evento").val());
    data.append('descripcion_evento', $("#descripcion_evento").val());
    data.append('id', $("#editar").attr("idCursoEvento"));

    $.ajax(
        {
            url: '/php/cursos_eventos/post.php',
            method: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data === "ok") {
                    $("#enlace-cursos-eventos")[0].click(); 
                } else if (data.includes("location")) {
                    var json = $.parseJSON(data);
                    if (json.location) {
                        window.location.href = json.location;
                    };
                } else {
                    $("#problema_creando_Evento").removeClass("d-none");
                    console.log(data);
                }
            },
            error: function () {
                $("#problema_creando_Evento").removeClass("d-none")
                console.log('There was some error performing the AJAX call!');
            }
        }
    );
}

function eliminar(id) {
    $.ajax(
        {
            url: '/php/cursos_eventos/delete.php',
            data: { id: id },
            success: function (data) {
                if (data === "ok") {
                    $("#enlace-cursos-eventos")[0].click(); 
                } else if (data.includes("location")) {
                    var json = $.parseJSON(data);
                    if (json.location) {
                        window.location.href = json.location;
                    };
                } else {
                    console.log('There was some error deleting entity');
                    console.log(data);
                }
            },
            error: function () {
                console.log('There was some error performing the AJAX call!');
            }
        }
    );

}