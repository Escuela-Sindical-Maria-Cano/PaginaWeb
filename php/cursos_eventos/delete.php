<?php

include_once '../config/configbd.php';
include_once "../utils/session_required.php";
include_once "../utils/session_extended.php";

$id =  $_GET['id'];

if (!empty($id)) {
    $stmt = mysqli_prepare($mysqli, "UPDATE cursos_eventos set activo = false where curso_evento_id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);

    /* execute query */
    mysqli_stmt_execute($stmt);

    echo 'ok';
}
