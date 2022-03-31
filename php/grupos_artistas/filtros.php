<?php
//including the database connection file
include_once("../config/configbd.php");
include_once("../utils/session_extended.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM grupos_artistas WHERE activo=true and genero='protesta'");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row1 = $result->fetch_assoc();

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM grupos_artistas WHERE activo=true and genero='folclorica'");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row2 = $result->fetch_assoc();

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM grupos_artistas WHERE activo=true and genero='rap'");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row3 = $result->fetch_assoc();

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM grupos_artistas WHERE activo=true and genero='rock'");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row4 = $result->fetch_assoc();

$stmt = mysqli_prepare($mysqli, "SELECT count(*) as conteo FROM grupos_artistas WHERE activo=true and genero='salsa'");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row5 = $result->fetch_assoc();

$arr = array('protesta' => $row1['conteo'],'folclorica' => $row2['conteo'], 'rap' => $row3['conteo'], 'rock' => $row4['conteo'], 'salsa' => $row5['conteo']);

echo json_encode($arr);
