<?php

include_once '../config/configbd.php';
include_once '../config/configparameters.php';
include_once "../utils/session_required.php";
include_once "../utils/session_extended.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    $titulo =  $_POST['titulo_material'];
    $fecha =  $_POST['fecha_material'];
    $tipo_material =  $_POST['tipo_material'];
    $descripcion =  $_POST['descripcion_material'];
    $id =  $_POST['id'];

    if (empty($id)) {
        $stmt = mysqli_prepare($mysqli, "INSERT INTO material (titulo, fecha, tipo_material, descripcion) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $titulo, $fecha, $tipo_material, $descripcion);
    } else {
        $stmt = mysqli_prepare($mysqli, "UPDATE material SET titulo=? , fecha= ?, tipo_material = ?, descripcion = ?  WHERE material_id = ?");
        mysqli_stmt_bind_param($stmt, "ssssi", $titulo, $fecha, $tipo_material, $descripcion,  $id);
    }
    /* execute query */
    mysqli_stmt_execute($stmt);

    echo 'ok';