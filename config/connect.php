<?php
ob_start();
function get_con()
{
    $host = "localhost";
    $user = "root";
    $password = "";
    $dbname = "scorify";
    $connect = mysqli_connect($host, $user, $password, $dbname);

    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    // echo "Connected successfully";

    return $connect;
}
$status = "online";
ob_end_flush();
?>
<!DOCTYPE html>