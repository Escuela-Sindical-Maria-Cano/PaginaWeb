function irAPaginaInterna(url) {
    location.href = url;
}

function recortar(texto, size) {
    if (texto.length > size) {
        texto = texto.substring(0, size);
        texto = texto + "...";
    }
    return texto;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function parsearEvento(tipoEvento) {
    var resultado = "Evento";
    if (tipoEvento === "stream") {
        resultado = "Live";
    } else if (tipoEvento === "historia") {
        resultado = "Conmemoración";
    } else if (tipoEvento === "curso") {
        resultado = "Curso";
    } else if (tipoEvento === "prostesta") {
        resultado = "Protesta";
    }
    return resultado;
}

function parsearParrafos(parrafos) {
    return parrafos.replaceAll("\n", "<br/>");
}

function parsearYoutubeID(enlace) {
    var result = null,
        tmp = [];
    enlace
        .replaceAll("https://www.youtube.com/watch?", '')
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === "v") result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function parsearGenero(genero) {
    var resultado = "Canción Protesta";
    if (genero === "protesta") {
        resultado = "Canción Protesta";
    } else if (genero === "folclorica") {
        resultado = "Canción Folclórica";
    } else if (genero === "rock") {
        resultado = "Rock";
    } else if (genero === "rap") {
        resultado = "Rap y Reggae";
    }
    return resultado;
}

function calcularPaginacion(total, pagina_actual, href) {
    $("#paginacion").find("ul").html("");
    if (total > 5) {
        for (i = 1; i - 1 <= total / 5; i++) {
            if (i + '' === pagina_actual) {
                $("#paginacion").find("ul").append('<li class="page-item"><a href="#" class="page-link ">' + i + '</a></li>');
            } else {
                $("#paginacion").find("ul").append('<li class="page-item"><a href="' + href + 'pagina=' + i + '" class="page-link  bg-dark">' + i + '</a></li>');
            }

        }
        $("#paginacion").find(".pagination").removeClass("d-none");
    }
}