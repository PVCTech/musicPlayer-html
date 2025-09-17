<?php
	include ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
	
    $Random = 0;
    $Ok =0;
    for ($i=0;$i<100;$i++)
    {
        $Random = rand(10000, 99999);
        $SqlPageId = "SELECT pageId FROM remote WHERE pageId=".$Random;
        $QueryPageId = mysqli_query($db,$SqlPageId);
        if (!$QueryPageId)
        {
            $Ok =1;
            break;
        }
        else if (mysqli_num_rows($QueryPageId) ==0)
        {
            $Ok =1;
            break;
        }
    }
    
    if ($Ok ==0)
    {
        $SqlPageId = "SELECT MAX(pageId) FROM remote";
        $QueryPageId = mysqli_query($db,$SqlPageId);
        $row = mysqli_fetch_row($QueryPageId);
        $Random = $row[0];
        $Random = $Random + 100;
    }
    
    date_default_timezone_set('Asia/Ho_Chi_Minh');
    $HourNow = (int)date('H', time());
    $MinuteNow = (int)date('i', time());
    $SecondNow = (int)date('s', time());
    $SqlPageId = "INSERT INTO `remote` (`pageId`,`activeMinute`, `gioOnline`, `phutOnline`,`giayOnline`) VALUES (".$Random.",0,".$HourNow.",".$MinuteNow.",".$SecondNow.")";

    mysqli_query($db,$SqlPageId);
    $Page_Id = $Random;
    //echo $Random;
?>