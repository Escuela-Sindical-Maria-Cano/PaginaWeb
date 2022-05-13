<?php

include_once '../config/configbd.php';
include_once '../config/configparameters.php';
include_once "../utils/session_required.php";
include_once "../utils/session_extended.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);


$genero =  $_POST['genero'];
$nombre =  $_POST['nombre'];
$nacionalidad =  $_POST['nacionalidad'];
$pagina_web =  $_POST['pagina_web'];
$descripcion =  $_POST['descripcion'];
$url_playlist_youtube =  $_POST['url_playlist_youtube'];
$id =  $_POST['id'];

//Subir datos
if (empty($id)) {
    $stmt = mysqli_prepare($mysqli, "INSERT INTO grupos_artistas (genero, nombre,nacionalidad, pagina_web, descripcion, url_playlist_youtube) VALUES (?, ?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, "ssssss", $genero, $nombre, $nacionalidad, $pagina_web, $descripcion, $url_playlist_youtube);
} else {
    $stmt = mysqli_prepare($mysqli, "UPDATE grupos_artistas SET genero=? , nombre= ?, nacionalidad =?, pagina_web = ?, descripcion = ?, url_playlist_youtube = ? WHERE grupos_artistas_id  = ?");
    mysqli_stmt_bind_param($stmt, "ssssssi", $genero, $nombre, $nacionalidad, $pagina_web, $descripcion, $url_playlist_youtube, $id);
}

/* execute query */
mysqli_stmt_execute($stmt);

echo 'ok';
