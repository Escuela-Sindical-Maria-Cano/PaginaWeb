<?php
//including the database connection file
include_once("../config/configbd.php");
include_once("../utils/session_extended.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$limit = 5;
$offset = 0;
$neoLimit =  $_GET['limit'];
$neoOffset =  $_GET['offset'];
if ($neoLimit > 0 && $neoLimit < 5) {
    $limit = $neoLimit;
}

if ($neoOffset > 0) {
    $offset = $neoOffset;
}

$stmt = mysqli_prepare($mysqli, "SELECT * FROM material WHERE activo=true ORDER BY fecha DESC LIMIT $offset,$limit");
//mysqli_stmt_bind_param($stmt,'variable', $limit);

/* execute query */
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$return_arr = array();

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $row_array['material_id'] = $row['material_id'];
    $row_array['titulo'] = $row['titulo'];
    $row_array['tipo_material'] = $row['tipo_material'];
    $row_array['fecha'] = $row['fecha'];
    $row_array['descripcion'] = $row['descripcion'];

    array_push($return_arr, $row_array);
}

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM material WHERE activo=true");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = $result->fetch_assoc();

$final_resultado = array('resultados' => $return_arr, 'total' => $row['conteo']);

echo json_encode($final_resultado);
