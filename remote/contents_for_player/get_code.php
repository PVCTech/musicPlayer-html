<?php
	include ($_SERVER['DOCUMENT_ROOT']. '/music-player/ketnoidb.php');
	$data = json_decode(file_get_contents('php://input'), true);
    
	$sql1 = "SELECT * FROM remote WHERE pageId=" . $data['pageId'];
	$query1 = mysqli_query($db,$sql1);
	$return = ['daNhan' => 1, 'maLenh' => ''];
	while ($Data = mysqli_fetch_array($query1))
	{
	    if ($Data['danhan'] ==0) 
	    {
	        $return['daNhan'] = 0;
	        $return['maLenh'] = $Data['maLenh'];
	        $sql2 = "UPDATE remote SET daNhan=1 WHERE pageId=" . $data['pageId'];
	        mysqli_query($db,$sql2);
	    }
	    else 
	    {
	        $return['daNhan'] = 1;
	        $return['maLenh'] = '-10';
	    }
	}
	
	header('Content-Type:applicaition/json');
	echo json_encode($return);
?>