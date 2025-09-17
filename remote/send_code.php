<?php
	include ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
	include($_SERVER['DOCUMENT_ROOT'] . '/music-player/security/onlyDomain.php');
	$data = json_decode(file_get_contents('php://input'),true);
	$sql1 = "UPDATE remote SET malenh='" . $data['maLenh'] . "',danhan=0 WHERE pageId=" . $data['pageId'];
	$query1 = mysqli_query($db,$sql1);
?>