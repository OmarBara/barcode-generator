<?php
//fetch.php
require_once 'config/connect.php';

$output = '';
if(isset($_POST["query"]))
{
    //  $search = mysqli_real_escape_string($connect, $_POST["query"]);
    $sql = "SELECT * FROM `sequence` where id = '".$_POST["query"]."'";
    $result = mysqli_fetch_assoc(mysqli_query($con,$sql)); 
    //add 1 and convert to string 6 digits
    echo $result["value"];
    // echo $_POST["query"].":query";
}

if(isset($_POST["data"])){

    $data = json_decode(stripslashes($_POST['data']));
    $sql2 = "INSERT INTO `sequence` (`id`, `value`) VALUES  ($data[0], $data[1]) ON DUPLICATE KEY UPDATE    
    value = $data[1]";
    $result = mysqli_query($con, $sql2);

    echo $result; 
    // foreach($data as $d){
    //    echo $d;
    // }
}

?>