<?php include ($_SERVER['DOCUMENT_ROOT'].'/music-player/remote/contents_for_player/pageid_create.php'); ?>

<div style="position:fixed;top:0px;left:0px;width:100vw;height:100vh;z-index:100;display:none;background:rgba(0,0,0,0.3);" id="remote_Div_DivChe"></div>
<div style="position:fixed;top:100px;left:0px;width:100%;z-index:103;display:none;" id="remote_Div">
    <center>
    <input id="Page_Id" type="text" value="0" style="display:none;">
    <div style="background:white;width:300px;">
        <div style="background:green;padding:10px;border-radius:3px;text-align:center;border:1px solid green;" id="quetMa_Click_Caption">
            <font color="orange">Sẵn sàng cho remote</font>
        </div>
        <script>
        	function showQuetMa()
        	{
        		if (document.getElementById('remote_Enable').value == '0')
        		{
        			document.getElementById('remote_Div_DivChe').style.display = 'block';
        			document.getElementById('remote_Div').style.display = 'block';
        			document.getElementById('remote_Enable').value = '1';
        			document.getElementById('quetMa_Click_Caption').innerHTML = '<font color="orange">Sẵn sàng cho remote</font>';
        			document.getElementById('showQuetMa_Button').style.opacity = 1;
        			setOnlineState_And_CheckRemoteState();
        		}
        		else
        		{
        			document.getElementById('remote_Div_DivChe').style.display = 'none';
        			document.getElementById('remote_Div').style.display = 'none';
        			document.getElementById('remote_Enable').value = '0';
        			document.getElementById("showQuetMa_Button").style.opacity = 0.3;
        		}
        	}
        </script>
        
        <center>
        <input type="text" id="remote_Enable" value="0" style="display:none;">
        
        <div id="Remote_QuetMa" style="box-shadow: 1px 1px 3px #888888;"><center>
            <a href="remote/index.php?pageId=<?php echo $Page_Id; ?>" target="_blank">
                <img src="https://baohiem.pvcgo.net/functions/qrcode/getqr.php?text=https://mlnd.pvcgo.net/music-player/remote/index.php?idpage=<?php echo $Page_Id; ?>">
            </a>
              <br>
            <div style="background:white;padding:3px;border-radius:3px;text-align:center;">
                Scan to remote<br>
                ID: <?php echo $Page_Id; ?>  <div id="Get" style="display:none;"></div>
            </div>
            <div id="remote_Div_DaKetNoi" style="background:green;padding:3px;border-radius:3px;text-align:center;color:white;display:none;">
                ĐÃ KẾT NỐI
            </div>
            <div id="remote_Div_DaKetNoi" onclick="document.getElementById('remote_Div_DivChe').style.display='none';document.getElementById('remote_Div').style.display='none';" style="padding-top:12px;background:white;height:30px;border-radius:3px;text-align:center;color:rgba(0,0,0,0.3);box-shadow: 1px 1px 3px #888888;">
                Click to close
            </div>
            <input type="text" id="timeoutCheckOnline" value="5000" style="display:none;">
            <script>
                function setOnlineState_And_CheckRemoteState()
                {
                    if (document.getElementById('remote_Enable').value == '1')
            	    {
            	        var m2 = 0;
            	        var tongM2 =0; 
            	        var s2 =0;
            	        var tongS2 =0;

						var playingList = Player.playingList.list;
						var playedList 	= Player.playingList.playedList;

                        var dataSend = {
                            'pageId' : "-",
                            'timePlaying': 0,
                            'totalTime' : 0,
                            'realPT'    : 0,
                            'm'         : '0',
                            's'         : '0',
                            'tongM'     : '0',
                            'tongS'     : '0',
                            'listIndex'    : -1,
                            'trackId'   : -1,
                            'imageName' : "",
                            'volume': 0,
                            'autoVolume': 1,
                            'repeat'   : 0,
                            'ngauNhien' : 0,
                            'autoNextOn': 1,
                            'trangThai' : 0
                        };

                        
                        dataSend['pageId'] = "<?php echo $Page_Id; ?>";
                        
                        if (Player.listIndex > -1 && Player.trackId > -1)
                        {
                            var currentMedia = Player.list[Player.trackId].media();
                            
                            dataSend['timePlaying'] = parseInt(currentMedia.currentTime);
                            dataSend['totalTime'] = parseInt(currentMedia.duration);
                            
                            dataSend['imageName']  = Player.list[Player.trackId].imageName;
                            dataSend['trangThai']  = Player.list[Player.trackId].trangThai;
                            
                            if (dataSend['totalTime'] < 1)
                            {
                                
                            }
                            else
                            {
                                var tongM2 = parseInt(dataSend['totalTime']/60);
                                    dataSend['tongM'] = tongM2;
                                var tongS2 = dataSend['totalTime'] - tongM2*60;
                                if (tongS2 <10) {dataSend['tongS'] = '0' + tongS2; } else { dataSend['tongS'] = tongS2;}
                                
                                var m2 = parseInt(dataSend['timePlaying']/60);
                                    dataSend['m'] = m2;
                                var s2 = dataSend['timePlaying'] - m2*60;
                                if (s2 <10) {dataSend['s'] = '0' + s2; } else { dataSend['s'] = s2;}
                                dataSend['realPT'] = parseInt(dataSend['timePlaying']/dataSend['totalTime'] * 100);
                            }
                            
                            dataSend['listIndex'] = Player.listIndex;
                            dataSend['trackId'] = Player.trackId;
                            
                            dataSend['autoNextOn'] = Player.autoNextOn;
                            dataSend['volume']  = Player.volume;
                            dataSend['autoVolume']  = Player.autoVolume;
                            dataSend['repeat']  = Player.repeat;
                            dataSend['ngauNhien']  = Player.ngauNhien;
                            
                        }
                        
                        
                        fetch 
                        (
                            'remote/contents_for_player/check_remote_online.php',
                            {
                                method: 'POST',
                                headers: {'Content-Type' : 'application/json'},
                                body: JSON.stringify(dataSend)
                            }
                        )
                        .then (response=>response.text())
                        .then (data=>{
                            if (data == '1') {document.getElementById("showQuetMa_Button").style.opacity = 1;}
                            else {document.getElementById("showQuetMa_Button").style.opacity = 0.3;}
                        })
                        .catch(er => 
                            {
                                console.log("có lỗi fetch" + er.message);
                            });
                    }
            		
                }
                
                setInterval(function(){setOnlineState_And_CheckRemoteState();},2000);
                
                
                function getRemote()
        	    {
        	        if (document.getElementById('remote_Enable').value == '1')
            	    {
						fetch
						(
							'remote/contents_for_player/get_code.php',
							{
								method: 'POST',
								headers: {'Content-Type': 'application/json'},
								body: JSON.stringify({pageId: '<?php echo $Page_Id; ?>'})
							}				
						)
						.then (response => response.json())
						.then
						(data=>
							{
                			    if (parseInt(data['daNhan']) == 0)
                			    {
                			        var maLenh = data['maLenh'];
                			        switch (maLenh)
                			        {
                    			        case 'hideScan':
                    			            document.getElementById('remote_Div_DaKetNoi').style.display = 'block';
                    			            setTimeout(function()
                    			            {
                    			                document.getElementById('remote_Div_DivChe').style.display = 'none';
                    			                document.getElementById('remote_Div').style.display = 'none';
                    			            },1000);
                    			            break;
                    			        case 'repeat10':
                    			            Player.repeat1 = 1;
                    			            Player.changeRepeat1();
                    			            break;
                    			        case 'repeat11':
                    			            Player.repeat1 = 0;
                    			            Player.changeRepeat1();
                    			            break;
                    			        case 'stop':
                    			            Player.stop();
                    			            break;
                    			        case 'prev':
                    			            Player.prev();
                    			            break;
                    			        case 'playpause0':
                    			            Player.pause(-100,-100);
                    			            break;
                    			        case 'playpause1':
                    			            Player.play(-100,-100);
                    			            break;
                    			        case 'next':
                    			            Player.next();
                    			            break;
                    			        case 'repeat1360':
                    			            Player.repeat136 = 1;
                    			            Player.changeRepeat136();
                    			            break;
                    			        case 'repeat1361':
                    			            Player.repeat136 = 0;
                    			            Player.changeRepeat136();
                    			            break;
                    			        case 'autoVolume0':
                    			            Player.autoVolume = 1;
                    			            Player.changeAutoVolume();
                    			            break;
                    			        case 'autoVolume1':
                    			            Player.autoVolume = 0;
                    			            Player.changeAutoVolume();
                    			            break;
                    			        case 'autonext1':
                    			            Player.autoNextOn = 0;
                    			            Player.changeAutoNext();
                    			            break;
                    			        case 'autonext0':
                    			            Player.autoNextOn = 1;
                    			            Player.changeAutoNext();
                    			            break;
                    			        default:
                    			            if (maLenh.substr(0,2) == 'vl') 
                            			    {
                            			        var lLevel = parseInt(maLenh.substr(2));
                            			        Player.setVolume(lLevel);
                            			        Player.autoVolume = 1;
                            			        Player.changeAutoVolume();
                            			    }
                            			    else if (maLenh.substr(0,4) == 'play') 
                            			    {
                            			        var tachMaLenh = maLenh.split('_');
                            			        Player.play(tachMaLenh[1], tachMaLenh[2]);
                            			    }
                    			            break;
                    			        setOnlineState_And_CheckRemoteState();
                			        }
                                }
							}
						);
            	    }
            		setTimeout(function(){getRemote();},500);
        	    }
        	    
        	    getRemote();
        	    
            </script>
        </div>
    </div>
    </center>
</div>
