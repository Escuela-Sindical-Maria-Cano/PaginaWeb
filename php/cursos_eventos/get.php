<?php
//including the database connection file
include_once("../config.php");
$limit = $_GET['limit'];

$fetch = mysqli_query($mysqli, "SELECT * FROM cursos_eventos ORDER BY fecha DESC LIMIT $limit"); // using mysqli_query instead

$return_arr = array();

while ($row = $fetch->fetch_array(MYSQLI_ASSOC)) {
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
?>