<?php
/* Database config */
global $con;


// $db_host		= 'localhost';
// $db_user		= 'root';
// $db_pass		= '';
// $db_database	= 'test';

// $con = mysqli_connect($db_host , $db_user ,$db_pass , $db_database) or die('Unable to establish a DB connection');


/* Heroku ClearDB Configuration */ 
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

$con = mysqli_connect($config["host"] , $config["user"] ,$config["pw"] , $config["db"] ) or die('Unable to establish a DB connection');


mysqli_select_db($con,$db_database);

/* End config */
?>