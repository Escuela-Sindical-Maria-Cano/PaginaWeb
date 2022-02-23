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