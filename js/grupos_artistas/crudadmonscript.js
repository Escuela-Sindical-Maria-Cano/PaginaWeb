$(document).ready(function() {
    $.ajax({
        url: '/php/grupos_artistas/list.php',
        data: { limit: 5, offset: (findGetParameter("pagina") - 1) * 5 },
        success: function(data) {
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    $('#lista_examinar > tbody').append(
                        '<tr><td>' + this.genero +
                        '</td><td>' +
                        this.nombre +
                        '</td><td>' +
                        this.nacionalidad +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-pen-to-square" onClick="editar(' + this.grupos_artistas_id + ')"></span>' +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-trash" onClick="eliminar(' + this.grupos_artistas_id + ')"></span>' +
                        '</td></tr>')
                });
            calcularPaginacion(json.total, findGetParameter("pagina"), '/admon/cultura_editar.html?');
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

    $('#descripcion_artista').summernote({
        placeholder: 'Describir el grupo o artista',
        tabsize: 2,
        height: 200,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['view', ['codeview', 'help']],
            ['insert', ['link', 'picture', 'video']],
        ],
        callbacks: {
            onPaste(e) {
                const bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                document.execCommand('insertText', false, bufferText);
            }
        }
    });

    $('#descripcion_artista').on('summernote.blur', function() {
        cambiarValorDescripcion(this)
    });

})

function editar(id) {
    $("#editar").addClass("d-none");
    $("#problema_creando_artista").addClass("d-none");
    $.ajax({
        url: '/php/grupos_artistas/get.php',
        data: { id: id },
        success: function(data) {
            var json = $.parseJSON(data);
            $("#editar").attr("idGrupoArtista", json.grupos_artistas_id);
            $("#genero_artista").val(json.genero).change();
            $("#nombre_artista").val(json.nombre);
            $("#nacionalidad_artista").val(json.nacionalidad);
            $("#pagina_web_artista").val(json.pagina_web);
            $("#playlist_artista").val(json.url_playlist_youtube);
            $('#descripcion_artista').summernote('code', json.descripcion);
            //completarCursoEvento(json, 0);
            $("#editar").removeClass("d-none");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

}

function agregarNuevoArtista() {
    $("#editar").addClass("d-none");
    $("#editar").attr("idGrupoArtista", "");
    $("#nombre_artista").val("");
    $("#nacionalidad_artista").val("");
    $("#pagina_web_artista").val("");
    $("#playlist_artista").val("");
    $('#descripcion_artista').summernote('code', '');
    $("#editar").removeClass("d-none");
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

function guardarGrupoArtista() {
    var data = {
        'genero': $("#genero_artista").val(),
        'nombre': $("#nombre_artista").val(),
        'nacionalidad': $("#nacionalidad_artista").val(),
        'pagina_web': $("#pagina_web_artista").val(),
        'descripcion': $("#descripcion_artista").val(),
        'url_playlist_youtube': $("#playlist_artista").val(),
        'id': $("#editar").attr("idGrupoArtista")
    }

    $.ajax({
        url: '/php/grupos_artistas/post.php',
        method: 'POST',
        data: data,
        success: function(data) {
            if (data === "ok") {
                $("#enlace_cultura_musica")[0].click();
            } else if (data.includes("location")) {
                var json = $.parseJSON(data);
                if (json.location) {
                    window.location.href = json.location;
                };
            } else {
                $("#problema_creando_artista").removeClass("d-none");
                console.log(data);
            }
        },
        error: function() {
            $("#problema_creando_artista").removeClass("d-none")
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
    var tipoEvento = parsearGenero($($this).val());
    $("#" + id).html(tipoEvento);
}

function cambiarValorDescripcion($this) {
    $("#descripcion").html(recortar($($this).val(), 300));
}

function cambiarVideoYoutube($this) {
    $(".embed-container").html('<iframe src=https://www.youtube.com/embed/' + parsearYoutubeID($($this).val()) + ' frameborder = "0"> </iframe>');

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