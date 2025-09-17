<?php
	include ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
	date_default_timezone_set('Asia/Ho_Chi_Minh');
    $HourNow = (int)date('H', time());
    $MinuteNow = (int)date('i', time());
    $SecondNow = (int)date('s', time());
    
    $data = json_decode(file_get_contents("php://input"), true);
    //$data2 = file_get_contents("php://input");
    
    
    //Nếu có lệnh remote thì nhận remote (đã có phần nhận riêng), nếu không có remote thì Update trạng thái hiện tại của player:
    $sql1 = "SELECT gioRemote, phutRemote, giayRemote, daNhan FROM remote WHERE pageId=" . $data['pageId'] . " LIMIT 1";
	$query1 = mysqli_query($db,$sql1);
	while ($Data = mysqli_fetch_array($query1))
	{
	    if ($Data['daNhan'] == 1)
	    {
	        $sql2 = "UPDATE remote SET gioOnline=".$HourNow.",phutOnline=".$MinuteNow.",giayOnline=".$SecondNow.",trackinfor='" . json_encode($data) . "' WHERE pageId=".$data['pageId'];
	        mysqli_query($db,$sql2);
	    }
	    
	    if ($Data['gioRemote'] == $HourNow)
        {
            if ($MinuteNow == $Data['phutRemote'])
            {
                if ($SecondNow - $Data['giayRemote'] > 10)
                {
                    echo '0';
                    
                } 
                else 
                {
                    echo '1';
                }
            }
            else if ($MinuteNow > $Data['phutRemote'])
            {
                if ($SecondNow + 60 - $Data['giayRemote'] > 10)
                {
                    echo '0';
                } 
                else 
                {
                    echo '1';
                }
            }
            else
            {
                echo '0';
            }
        }
        else
        {
            if ($MinuteNow == 0 && $SecondNow + 60 - $Data['giayRemote'] <= 10)
            {
                echo '1';
            }
            else
            {
                echo '0';
            }
        }
	}
	
	
	
	//Xoá All dữ liệu hết hạn:
	$sql1 = "SELECT pageId,gioOnline,phutOnline,gioRemote,phutRemote,giayRemote FROM remote WHERE 1";
	$query1 = mysqli_query($db,$sql1);
	while ($Data = mysqli_fetch_array($query1))
	{
	    $Gio = $Data['gioOnline'];
	    $Phut = $Data['phutOnline'];
	    $PhutNow  = $MinuteNow + $HourNow*60;
	    $PhutOnline = (int)$Phut + (int)$Gio*60;
        if ($PhutNow - $PhutOnline > 15 || $PhutNow - $PhutOnline < -15)
        {
            $Sql3 = "DELETE FROM remote WHERE pageId=".$Data['pageId'];
            mysqli_query($db,$Sql3);
        }
	}
	
?>