$(document).ready(function() {
    $.ajax({
        url: '/php/material/list.php',
        data: { limit: 5, offset: (findGetParameter("pagina") - 1) * 5 },
        success: function(data) {
            var json = $.parseJSON(data);
            $(json.resultados).each(
                function() {
                    $('#lista_examinar > tbody').append(
                        '<tr><td>' + this.tipo_material +
                        '</td><td>' +
                        this.titulo +
                        '</td><td>' +
                        this.fecha +
                        '</td><td>' +
                        recortar(this.descripcion, 200) +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-pen-to-square" onClick="editar(' + this.curso_evento_id + ')"></span>' +
                        '</td><td class="text-center">' +
                        '<span class="clickeable fa-solid fa-trash" onClick="eliminar(' + this.curso_evento_id + ')"></span>' +
                        '</td></tr>')
                });
            calcularPaginacion(json.total, findGetParameter("pagina"), '/admon/materiales_editar.html?');

        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

    $('#fecha_material').datetimepicker();
    $('#descripcion_material').summernote({
        placeholder: 'Descripción corta de qué se trata el material o guía. Resumen.',
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
    $("#problema_creando_material").addClass("d-none");
    $.ajax({
        url: '/php/material/get.php',
        data: { id: id },
        success: function(data) {
            var json = $.parseJSON(data);
            $("#editar").attr("idMaterial", json.material_id);
            $("#tipo_material").val(json.tipo_material).change();
            $("#titulo_material").val(json.titulo);
            $("#fecha_material").val(json.fecha);
            $('#descripcion_material').summernote('code', json.descripcion);
            $("#editar").removeClass("d-none");
        },
        error: function() {
            console.log('There was some error performing the AJAX call!');
        }
    });

}

function agregarNuevoMaterial() {
    $("#editar").addClass("d-none");
    $("#editar").attr("idMaterial", "");
    $("#tipo_material").val("pdf").change();
    $("#titulo_material").val("");
    $("#fecha_material").val("");
    $('#descripcion_material').summernote('code', '');
    $("#editar").removeClass("d-none");
    $("#problema_creando_material").addClass("d-none");
    var json = new Object();
    json.tipo_material = "pdf";
    json.titulo = "Título";
    json.fecha = 'fecha';
}

function guardarMaterial() {
    var data = new FormData();
    data.append('tipo_material', $("#tipo_material").val());
    data.append('titulo_material', $("#titulo_material").val());
    data.append('fecha_material', $("#fecha_material").val());
    data.append('descripcion_material', $("#descripcion_material").val());
    data.append('id', $("#editar").attr("idMaterial"));

    $.ajax({
        url: '/php/material/post.php',
        method: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data === "ok") {
                $("#enlace-material")[0].click();
            } else if (data.includes("location")) {
                var json = $.parseJSON(data);
                if (json.location) {
                    window.location.href = json.location;
                };
            } else {
                $("#problema_creando_material").removeClass("d-none");
                console.log(data);
            }
        },
        error: function() {
            $("#problema_creando_material").removeClass("d-none")
            console.log('There was some error performing the AJAX call!');
        }
    });
}

function eliminar(id) {
    $.ajax({
        url: '/php/material/delete.php',
        data: { id: id },
        success: function(data) {
            if (data === "ok") {
                $("#enlace-material")[0].click();
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
    $("#" + id).html($($this).val());
}

