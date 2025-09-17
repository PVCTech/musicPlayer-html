<!DOCTYPE html>

<head>
	<title>MLND - CD1 HỘI NGHỊ</title>	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        const rootFolder = '/music-player/';
    </script>
    <script src="functions/time.js?v=5"></script>
    <?php
        //chèn remote - Nếu chỉ html thuần có thể bỏ qua phần này và các lệnh filemtime
        include ($_SERVER['DOCUMENT_ROOT'].'/music-player/remote/contents_for_player/remoteForPlayer.php');
    ?>
    <link rel="stylesheet" href="index_files/style/style.css?v=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/style/style.css'); ?>">
</head>

<body style="background:#f2f2f2;">
    <link rel="styleSheet" href="index_files/track/style.css?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/track/style.css'); ?>">
    <script src="index_files/track/baihat.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/track/baihat.js'); ?>"></script>
    <script src="cds/nhacLe/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacLe/list.js'); ?>"></script>
    <script src="cds/MaiLinh/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/MaiLinh/list.js'); ?>"></script>
    <script src="cds/dangCongSan/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/dangCongSan/list.js'); ?>"></script>
    <script src="cds/nhacNen/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacNen/list.js'); ?>"></script>
    <script src="cds/nhacQueHuongCachMang/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/nhacQueHuongCachMang/list.js'); ?>"></script>
    <script src="cds/sinhNhat/list.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/sinhNhat/list.js'); ?>"></script>
    

    <script src="cds/listCD.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/cds/listCD.js'); ?>"></script>
    <link rel="styleSheet" href="index_files/player/style.css?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/style.css'); ?>">
    <script src="index_files/player/playingList.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/playingList.js'); ?>"></script>
    <script src="index_files/player/player.js?version=<?php echo filemtime($_SERVER['DOCUMENT_ROOT'].'/music-player/index_files/player/player.js'); ?>"></script>
    <center>
        <div class="container">
            <div id="playing_Div" style="height:15vh;padding-bottom:15px;background:white;width:100%;">
            </div>
            <script>
                document.getElementById('playing_Div').innerHTML = Player.renderPlayingTrack();
            </script>
            
            <div id="list_Container" class="list-container">
                
            </div>
            <script> 
                document.getElementById('list_Container').appendChild(Player.renderList());
            </script>

            <script>
                document.write(Player.renderControl());
            </script>
        </div>
    </center>
</body>


