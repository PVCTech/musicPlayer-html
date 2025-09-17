<?php
	include ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
	$st = json_encode($_POST['string']);
	$st = substr($st,0,-1);
	$st = substr($st,1);
	
    
    $sql2 = "UPDATE remote SET ip='',browser='',daketnoi=0 WHERE idpage=".$st;
	mysqli_query($db,$sql2);
?>