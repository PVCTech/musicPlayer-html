<?php $host = '/music-player/'; ?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<style>
		.Button:active {position:relative;top:2px;left:2px;}
	</style> 
	<script>
        const rootFolder = '/music-player/';
    </script>
	<script src="../functions/time.js?v=5"></script>
	<link rel="stylesheet" href="/music-player/index_files/style/style.css?v=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/style/style.css'); ?>">
	<?php
    	require_once($_SERVER['DOCUMENT_ROOT'] . $host . 'remote/index_files/connect.php');
    	if ($Page ==0)
    	{
    	    ?>
    	    <title><?php echo $pageId; ?> remote</title>
</head>
<body>
            <?php
    	    echo '<font color="orange">'.$ThongBaoLoi.'</font><p>';
    	    echo '<table><tr><td>Nhập id trang tại đây để remote:</td></tr><tr><td><input type="text" style="border:1px solid green;border-radius:5px;padding:10px;font-weight:bold;" value="'.$pageId.'" id="pageId_Input"></td>'; ?>
    	             <td><div style="border:1px solid green;border-radius:5px;padding:8px;font-weight:bold;" onclick="window.location.href='index.php?pageId=' + document.getElementById('pageId_Input').value;">REMOTE</div></td>
    	        </tr></table> <?php
    	}
    	else
    	{
    	    if ($DaKetNoi ==0)
    	    {
    	        $TrinhDuyetFaceBook = 'facebookexternalhit/1.1';
    	        if (substr($browserAgent,0,strlen($TrinhDuyetFaceBook))== $TrinhDuyetFaceBook){$browserAgent ='';$user_ip='';}
        	    $Sql = "UPDATE remote SET daKetNoi=1,ip='".$user_ip."',browser='".$browserAgent."' WHERE pageId=".$pageId;
        	    mysqli_query($db,$Sql);
    	    }
    ?>
    <title><?php echo $pageId; ?> remote</title>
</head>
<body> 
    <link rel="styleSheet" href="/music-player/index_files/track/style.css?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/track/style.css'); ?>">
    <script src="/music-player/index_files/track/baihat.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/track/baihat.js'); ?>"></script>
    <script src="/music-player/cds/nhacLe/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacLe/list.js'); ?>"></script>
    <script src="/music-player/cds/MaiLinh/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/MaiLinh/list.js'); ?>"></script>
    <script src="/music-player/cds/dangCongSan/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/dangCongSan/list.js'); ?>"></script>
    <script src="/music-player/cds/nhacNen/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacNen/list.js'); ?>"></script>
    <script src="/music-player/cds/nhacQueHuongCachMang/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacQueHuongCachMang/list.js'); ?>"></script>
    <script src="/music-player/cds/sinhNhat/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/sinhNhat/list.js'); ?>"></script>
    

    <script src="/music-player/cds/listCD.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/listCD.js'); ?>"></script>
    <link rel="styleSheet" href="/music-player/index_files/player/style.css?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/style.css'); ?>">
    <script src="/music-player/index_files/player/playingList.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/playingList.js'); ?>"></script>
    <script src="/music-player/index_files/player/player.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/player.js'); ?>"></script>
    
    
    <input type="number" value="-1" id="player-inactive-minute" style="display:none;">
    <script src='/music-player/remote/index_files/kiem-tra-player-online.js?v=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'] . '/music-player/remote/index_files/kiem-tra-player-online.js'); ?>'></script>
    
    <div id="sent_Alert" style="position:fixed;top:2px;left:5px;width:95%;height:95%;text-align:center;z-index:200;border-radius:5px;border:5px solid orange;display:none;"><center>
        <div style="background:#f2f2f2;padding:20px;text-align:center;width:300px;border-radius:5px;border:1.5px solid orange;display:none;">
            <font color="orange">Đã gửi lệnh remote!</font>
        </div></center>
    </div>
    <div id='matKetNoi_Div' onclick="activeRemote();" style="position:fixed;top:0px;left:0px;width:100%;height:100%;text-align:center;z-index:201;display:none;background:rgba(0,0,0,0.5);"><center>
        <div style="border-radius:5px;background:white;color:#cc0000;font-weight:bold;width:80%;margin-top:150px;padding:50px 10px 50px 10px;text-align:center;">
            MẤT KẾT NỐI!
        </div>
    </div>
    
    <?php
        echo '<input type="text" value="'.$pageId.'" id="pageId" style="display:none;">';
    ?>
	<script src="/music-player/remote/index_files/send-remote.js?v=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'] . '/music-player/remote/index_files/send-remote.js'); ?>"></script>
    <script>
        document.addEventListener('DOMContentLoaded',function()
            {
                setTimeout(function() {sendRemote('hideScan');},1000);
            }
        );
    </script>	
	
	<center>
        <div class="container">
            <div id="playing_Div" style="height:15vh;padding-bottom:15px;background:white;width:100%;">
            </div>
            <script>
                document.getElementById('playing_Div').innerHTML = Player.renderPlayingTrackToRemote();
            </script>
            
            <div id="list_Container" class="list-container">
                
            </div>
            <script> 
                document.getElementById('list_Container').appendChild(Player.renderListToRemote());
            </script>

            <script>
                document.write(Player.renderControlToRemote());
            </script>
        </div>
    </center>
    <script>
        function sendVolume()
        {
            document.getElementById('volume_Text').innerText = document.getElementById('volume').value;
            sendRemote('vl' + document.getElementById('volume').value);
        }
    </script>
</body>
<?php 
    }
    
?>