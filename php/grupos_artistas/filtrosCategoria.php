<?php
//including the database connection file
include_once("../config/configbd.php");
include_once("../utils/session_extended.php");
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$stmt = mysqli_prepare($mysqli, "SELECT genero, count(*) as conteo FROM grupos_artistas WHERE activo=true group by genero");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $row_array[$row['genero']] = $row['conteo'];
}

echo json_encode($row_array);
