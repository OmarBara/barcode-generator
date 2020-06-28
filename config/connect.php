<?php
/* Database config */

$db_host		= 'localhost';
$db_user		= 'root';
$db_pass		= '';
$db_database	= 'test';

/* End config */

global $con;
$con = mysqli_connect($db_host, $db_user, $db_pass,$db_database) or die('Unable to establish a DB connection');
mysqli_select_db($con,$db_database);

?>