<?php
//including the database connection file
include_once("../config/configbd.php");
include_once("../utils/session_extended.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$limit = 5;
$offset = 0;
$neoLimit =  $_GET['limit'];
$neoOffset =  $_GET['ofsset'];
if ($neoLimit > 0 && $neoLimit < 5) {
    $limit = $neoLimit;
}

if ($neoOffset > 0) {
    $offset = $neoOffset;
}

$stmt = mysqli_prepare($mysqli, "SELECT * FROM grupos_artistas WHERE activo=true ORDER BY grupos_artistas_id DESC LIMIT $offset,$limit");

/* execute query */
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$return_arr = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $row_array['grupos_artistas_id'] = $row['grupos_artistas_id'];
    $row_array['genero'] = $row['genero'];
    $row_array['nombre'] = $row['nombre'];
    $row_array['nacionalidad'] = $row['nacionalidad'];
    $row_array['pagina_web'] = $row['pagina_web'];
    $row_array['descripcion'] = $row['descripcion'];
    $row_array['url_playlist_youtube'] = $row['url_playlist_youtube'];

    array_push($return_arr, $row_array);
}

echo json_encode($return_arr);
