<?php
//including the database connection file
include_once("../config/configbd.php");
include_once("../utils/session_extended.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$stmt = mysqli_prepare($mysqli, "SELECT * FROM grupos_artistas WHERE grupos_artistas_id = ?");
mysqli_stmt_bind_param($stmt, 's', $_GET['id']);

/* execute query */
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

echo json_encode($row);
