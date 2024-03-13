<?php

include_once '../config/configbd.php';
include_once '../config/configparameters.php';
include_once "../utils/session_required.php";
include_once "../utils/session_extended.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

if (0 < $_FILES['archivo_material']['error']) {
    echo 'Error: ' . $_FILES['archivo_material']['error'] . '<br>';
} else {
    $titulo =  $_POST['titulo_material'];
    $fecha =  $_POST['fecha_material'];
    $tipo_material =  $_POST['tipo_material'];
    $descripcion =  $_POST['descripcion_material'];
    $id =  $_POST['id'];
    if (empty($_FILES['archivo_material']['name'])) {
        //Subir datos
    if (empty($id)) {
        $stmt = mysqli_prepare($mysqli, "INSERT INTO material (titulo, fecha, tipo_material, descripcion) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $titulo, $fecha, $tipo_material, $descripcion);
    } else {
        $stmt = mysqli_prepare($mysqli, "UPDATE material SET titulo=? , fecha= ?, tipo_material = ?, descripcion = ?  WHERE material_id = ?");
        mysqli_stmt_bind_param($stmt, "ssssi", $titulo, $fecha, $tipo_material, $descripcion,  $id);
    }
    }else {
        //Subir archivo
        $test = explode('.', $_FILES['archivo_material']['name']);
        $extension = end($test);
        $name = str_replace(' ', '_', $titulo) . rand(100, 999) . '.' . $extension;
        $location = 'upload/' . $name;
        move_uploaded_file($_FILES['archivo_material']['tmp_name'], $location);
        $location = $path_materiales . $location;

        if (empty($id)) {
            $stmt = mysqli_prepare($mysqli, "INSERT INTO material (titulo, fecha, tipo_material, descripcion, url_material) VALUES (?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "sssss", $titulo, $fecha, $tipo_material, $descripcion, $location);
        } else {
            $stmt = mysqli_prepare($mysqli, "UPDATE material SET titulo=? , fecha= ?, tipo_material = ?, descripcion = ?, url_material=?  WHERE material_id = ?");
            mysqli_stmt_bind_param($stmt, "sssssi", $titulo, $fecha, $tipo_material, $descripcion, $location,  $id);
        }
    }
    /* execute query */
    mysqli_stmt_execute($stmt);

    echo 'ok';
}