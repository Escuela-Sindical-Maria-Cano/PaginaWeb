function irAPaginaInterna(url) {
    location.href = url;
}

function recortar(texto, size){
    if (texto.length>size){
        texto=texto.substring(0, size);
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
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function parsearParrafos(parrafos){
    return parrafos.replaceAll("\n", "<br/>");
}