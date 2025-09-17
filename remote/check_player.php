<?php
	include ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $HourNow = (int)date('H', time());
    $MinuteNow = (int)date('i', time());
    $SecondNow = (int)date('s', time());
    
	$pageId = json_decode(file_get_contents("php://input"),true);
    
    $sql2 = "UPDATE remote SET gioRemote=" . $HourNow . ", phutRemote=" . $MinuteNow . ", giayRemote=" . $SecondNow .  " WHERE pageId=" . $pageId['pageId'];
	mysqli_query($db,$sql2);
	$trackInfor['dangOnline'] = 0;
	$sql1 = "SELECT pageId, gioOnline, phutOnline, giayOnline, trackStatus FROM remote WHERE pageId=" . $pageId['pageId'] . " LIMIT 1";
	$query1 = mysqli_query($db,$sql1);
	if ($query1)
	{
    	while ($Data = mysqli_fetch_array($query1))
    	{
    	    $trackInfor = json_decode($Data['trackStatus'],true);
    	    $trackInfor['dangOnline'] = 0;
    	    if ($Data['gioOnline'] == $HourNow)
            {
                if ($MinuteNow == $Data['phutOnline'])
                {
                    if ($SecondNow - $Data['giayOnline'] <= 10)
                    {
                        $trackInfor['dangOnline'] = 1;
                    }
                }
                else if ($MinuteNow == $Data['phutOnline'] +1)
                {
                    if ($SecondNow + 60 - $Data['giayOnline'] <= 10)
                    {
                        $trackInfor['dangOnline'] = 1;
                    }
                }
                else
                {
                    
                }
            }
            else
            {
                if ($MinuteNow == 0 && $SecondNow + 60 - $Data['giayOnline'] <= 10)
                {
                    $trackInfor['dangOnline'] = 1;
                }
                else
                {
                    
                }
            }
            break;
    	}
	}
	else
	{
	    $trackInfor = 
	    [
            'pageId' => "-",
            'timePlaying'=> 0,
            'totalTime' => 0,
            'realPT'    => 0,
            'm'         => '0',
            's'         => '0',
            'tongM'     => '0',
            'tongS'     => '0',
            'listIndex'    => -1,
            'trackId'   => -1,
            'imageName' => "",
            'volume'=> 0,
            'autoVolume'=> 1,
            'repeat'   => 0,
            'ngauNhien' => 0,
            'autoNextOn'=> 1,
            'trangThai' => 0,
            'dangOnline'=> 0
        ]; 
	}
	
	header("Content-Type:application/json");
	echo json_encode($trackInfor);
?>