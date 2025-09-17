<?php 
$servername = "localhost"; 
$username = "pvcgonet_mlnd_cd"; 
$password = "Phamvancuong@12345"; 
$dbname = "pvcgonet_mlnd_cd"; 
$db = mysqli_connect($servername,$username,$password,$dbname);
 
if(!$db){
   die('Ket noi that bai:'.mysqli_connect_error()); 
}else{ 
    //echo"Ket noi thanh cong"; 
} 
?>