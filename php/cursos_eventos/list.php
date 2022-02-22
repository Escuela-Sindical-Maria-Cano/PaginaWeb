<?php
//including the database connection file
include_once("../config/configbd.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$limit =5;
$offset = 0;
$neoLimit=  $_GET['limit'];
$neoOffset=  $_GET['ofsset'];
if ($neoLimit >0 && $neoLimit<5){
    $limit =$neoLimit;
} 

if ($neoOffset >0){
    $offset =$neoOffset;
}

$stmt = mysqli_prepare($mysqli, "SELECT * FROM cursos_eventos WHERE activo=true ORDER BY fecha DESC LIMIT $offset,$limit");
//mysqli_stmt_bind_param($stmt,'variable', $limit);

/* execute query */
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$return_arr = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $row_array['curso_evento_id'] = $row['curso_evento_id'];
    $row_array['titulo'] = $row['titulo'];
    $row_array['tipo_evento'] = $row['tipo_evento'];
    $row_array['fecha'] = $row['fecha'];
    $row_array['url_imagen'] = $row['url_imagen'];
    $row_array['descripcion'] = $row['descripcion'];
    $row_array['lugar'] = $row['lugar'];

    array_push($return_arr,$row_array);
}

echo json_encode($return_arr);
