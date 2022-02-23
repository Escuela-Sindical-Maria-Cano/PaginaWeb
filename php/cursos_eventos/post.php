<?php

include_once '../config/configbd.php';
include_once '../config/configparameters.php';
include_once "../utils/session_required.php";
include_once "../utils/session_extended.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if (0 < $_FILES['imagen_evento']['error']) {
    echo 'Error: ' . $_FILES['imagen_evento']['error'] . '<br>';
} else {
    $titulo =  $_POST['titulo_evento'];
    $fecha =  $_POST['fecha_evento'];
    $tipo_evento =  $_POST['tipo_evento'];
    $descripcion =  $_POST['descripcion_evento'];
    $lugar =  $_POST['lugar_evento'];
    $id =  $_POST['id'];   
    
    if (empty( $_FILES['imagen_evento']['name'])) {
        //Subir datos
        if (empty($id)) {
            $stmt = mysqli_prepare($mysqli, "INSERT INTO cursos_eventos (titulo, fecha, tipo_evento, descripcion, lugar) VALUES (?, ?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "sssss", $titulo, $fecha, $tipo_evento, $descripcion, $lugar);
        } else {
            $stmt = mysqli_prepare($mysqli, "UPDATE cursos_eventos SET titulo=? , fecha= ?, tipo_evento = ?, descripcion = ?, lugar = ? WHERE curso_evento_id = ?");
            mysqli_stmt_bind_param($stmt, "sssssi", $titulo, $fecha, $tipo_evento, $descripcion, $lugar, $id);
        }
    } else {
        //Subir archivo
        $test = explode('.', $_FILES['imagen_evento']['name']);
        $extension = end($test);
        $name = str_replace(' ', '_', $titulo) . rand(100, 999) . '.' . $extension;
        $location = 'upload/' . $name;
        move_uploaded_file($_FILES['imagen_evento']['tmp_name'], $location);
        $location = $path_cursos_eventos . $location;

        //Subir datos
        if (empty($id)) {
            $stmt = mysqli_prepare($mysqli, "INSERT INTO cursos_eventos (titulo, fecha, url_imagen, tipo_evento, descripcion, lugar) VALUES (?, ?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "ssssss", $titulo, $fecha, $location, $tipo_evento, $descripcion, $lugar);
        } else {
            $stmt = mysqli_prepare($mysqli, "UPDATE cursos_eventos SET titulo=? , fecha= ?, url_imagen = ?,tipo_evento = ?, descripcion = ?, lugar = ? WHERE curso_evento_id = ?");
            mysqli_stmt_bind_param($stmt, "ssssssi", $titulo, $fecha, $location, $tipo_evento, $descripcion, $lugar, $id);
        }
    }
    /* execute query */
    mysqli_stmt_execute($stmt);
    
    echo 'ok';
}
