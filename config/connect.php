<?php
/* Database config */

$db_host		= 'localhost';
$db_user		= 'root';
$db_pass		= '';
$db_database	= 'test';

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$config = array(
    'host' => $server ,
    'user' => $username ,
    'pw' => $password,
    'db' => $db 
);
;
/* End config */

global $con;
$con = mysqli_connect($config["host"] || $db_host, $config["user"] || $db_user,$config["pw"] || $db_pass, $config["db"] || $db_database) or die('Unable to establish a DB connection');
mysqli_select_db($con,$db_database);

?>