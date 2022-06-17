$(document).ready(function() {
    $.ajax({
        url: '/php/cursos_eventos/list.php',
        data: { limit: 5, offset: (findGetParameter("pagina") - 1) * 5 },
        success: function(data) {
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    $('#lista_examinar > tbody').append(
                        '<tr><td>' + this.tipo_evento +
                        '</td><td>' +
                        this.titulo +
                        '</td><td>' +
                        this.fecha +
                        '</td><td>' +
                        this.lugar +
                        '</td><td>' +
                        recortar(this.descripcion, 200) +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-pen-to-square" onClick="editar(' + this.curso_evento_id + ')"></span>' +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-trash" onClick="eliminar(' + this.curso_evento_id + ')"></span>' +
                        '</td></tr>')
                });
            calcularPaginacion(json.total, findGetParameter("pagina"), '/admon/cursos_eventos_editar.html?');

        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

    $('#fecha_evento').datetimepicker();
    $('#descripcion_evento').summernote({
        placeholder: 'Describir el curso o evento',
        tabsize: 2,
        height: 200,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['view', ['codeview', 'help']]
        ],
        callbacks: {
            onPaste(e) {
                const bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                document.execCommand('insertText', false, bufferText);
            }
        }
    });

})

function editar(id) {
    $("#editar").addClass("d-none");
    $("#problema_creando_Evento").addClass("d-none");
    $.ajax({
        url: '/php/cursos_eventos/get.php',
        data: { id: id },
        success: function(data) {
            var json = $.parseJSON(data);
            $("#editar").attr("idCursoEvento", json.curso_evento_id);
            $("#tipo_evento").val(json.tipo_evento).change();
            $("#titulo_evento").val(json.titulo);
            $("#fecha_evento").val(json.fecha);
            $("#fecha_legible_evento").val(json.fecha_legible);
            $("#lugar_evento").val(json.lugar);
            $('#descripcion_evento').summernote('code', json.descripcion);
            $("#cursos-eventos-imagen-0").css("background-image", "url(" + json.url_imagen + ")");
            json.url_imagen = '';
            completarCursoEvento(json, 0);
            $("#editar").removeClass("d-none");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

}

function agregarNuevoCursoEvento() {
    $("#editar").addClass("d-none");
    $("#editar").attr("idCursoEvento", "");
    $("#tipo_evento").val("streaming").change();
    $("#titulo_evento").val("");
    $("#fecha_evento").val("");
    $("#fecha_legible_evento").val("");
    $("#lugar_evento").val("");
    $('#descripcion_evento').summernote('code', '');
    $("#imagen_evento").html('');
    $("#editar").removeClass("d-none");
    $("#problema_creando_Evento").addClass("d-none");
    var json = new Object();
    json.tipo_evento = "stream";
    json.titulo = "Título";
    json.fecha = 'fecha';
    json.fecha_legible = 'fecha';
    json.lugar = 'lugar';
    json.url_imagen = '';
    completarCursoEvento(json, 0);
    $("#cursos-eventos-imagen-0").css("background-image", "url(/assets/images/escuela/logoOvalletrasblancas.png)");
}

function guardarEvento() {
    var data = new FormData();
    data.append('imagen_evento', $('#image_file_evento').prop('files')[0]);
    data.append('tipo_evento', $("#tipo_evento").val());
    data.append('titulo_evento', $("#titulo_evento").val());
    data.append('fecha_evento', $("#fecha_evento").val());
    data.append('fecha_legible_evento', $("#fecha_legible_evento").val());
    data.append('lugar_evento', $("#lugar_evento").val());
    data.append('descripcion_evento', $("#descripcion_evento").val());
    data.append('id', $("#editar").attr("idCursoEvento"));

    $.ajax({
        url: '/php/cursos_eventos/post.php',
        method: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
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
        error: function() {
            $("#problema_creando_Evento").removeClass("d-none")
            console.log('There was some error performing the AJAX call!');
        }
    });
}

function eliminar(id) {
    $.ajax({
        url: '/php/cursos_eventos/delete.php',
        data: { id: id },
        success: function(data) {
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
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

}

function cambiarValorInput($this, id) {
    $("#" + id).html($($this).val());
}

function cambiarValorSelect($this, id) {
    var tipoEvento = parsearEvento($($this).val());
    $("#" + id).html(tipoEvento);
}

function cambiarValorImagen($this) {
    var files = !!$this.files ? $this.files : [];
    console.log(files.length);
    console.log(window.FileReader);
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
    console.log("2");
    if (/^image/.test(files[0].type)) { // only image file
        var reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file

        reader.onloadend = function() { // set image data as background of div
            //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
            $("#cursos-eventos-imagen-0").css("background-image", "url(" + this.result + ")");
        }
        console.log("3");
    }
}