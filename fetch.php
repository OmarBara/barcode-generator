<?php
//fetch.php
require_once 'config/connect.php';

$output = '';
if(isset($_POST["query"]))
{
    //  $search = mysqli_real_escape_string($connect, $_POST["query"]);
    $sql = "SELECT * FROM `sequence` where id = '".$_POST["query"]."'";
    $result = mysqli_fetch_assoc(mysqli_query($con,$sql)); 

    echo $result["value"]; 
    // echo $_POST["query"].":query";
}

if(isset($_POST["queryAdd"])){

}

?>