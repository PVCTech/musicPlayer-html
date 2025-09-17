function sendRemote(maLenh)
{
    clearInterval(setRemoteState_And_CheckPageState_Interval);
    var maLenh2 = maLenh;
    if (maLenh == "repeat1")
    {
        if (document.getElementById('Repeat1').value == "0")
        {
            document.getElementById("Repeat1_Img").style.opacity = "1";
            maLenh2 = "repeat11";
            document.getElementById('Repeat1').value = 1;
            
            document.getElementById("repeat136_Img").style.opacity = "0.3";
            document.getElementById('repeat136').value = 0;
        } 
        else 
        {
            document.getElementById("Repeat1_Img").style.opacity = "0.3";
            maLenh2 = "repeat10";
            document.getElementById('Repeat1').value = 0;
        }
    }
    else if (maLenh == "repeat136")
    {
        if (document.getElementById('repeat136').value == "0")
        {
            document.getElementById("repeat136_Img").style.opacity = "1";
            maLenh2 = "repeat1361";
            document.getElementById('repeat136').value = 1;
            
            document.getElementById("Repeat1_Img").style.opacity = "0.3";
            document.getElementById('Repeat1').value = 0;
        } 
        else 
        {
            document.getElementById("repeat136_Img").style.opacity = "0.3";
            maLenh2 = "repeat1360";
            document.getElementById('repeat136').value = 0;
        }
    }
    else if (maLenh == "playpause")
    {
        if (document.getElementById('playPause').value == "0")
        {
            document.getElementById("player_PlayPause_Img").src = "../index_files/img/pause.png";
            maLenh2 = "playpause1";
            document.getElementById('playPause').value = 1;
        } 
        else 
        {
            document.getElementById("player_PlayPause_Img").src = "../index_files/img/play.png";
            maLenh2 = "playpause0";
            document.getElementById('playPause').value = 0;
        }
        
    }
    else if (maLenh == "autonext")
    {
        if (document.getElementById('autoNext').value == "0")
        {
            document.getElementById("autoNext_Button").src = "../index_files/img/nextauto.png";
            maLenh2 = "autonext1";
            document.getElementById('autoNext').value = 1;
        }
        else 
        {
            document.getElementById("autoNext_Button").src = "../index_files/img/nextauto0.png";
            maLenh2 = "autonext0";
            document.getElementById('autoNext').value = 0;
        }
    }
    else if (maLenh == "autoVolume")
    {
        if (document.getElementById('autoVolume').value == "0")
        {
            document.getElementById("autoVolume_Text").style.opacity = "1";
            maLenh2 = "autoVolume1";
            document.getElementById('autoVolume').value = 1;
        }
        else 
        {
            document.getElementById("autoVolume_Text").style.opacity = "0.3";
            maLenh2 = "autoVolume0";
            document.getElementById('autoVolume').value = 0;
        }
    }
    else if (maLenh == "stop")
    {
        document.getElementById("player_PlayPause_Img").src = "../index_files/img/play.png";
        document.getElementById('playPause').value = 0;
    }
    
    
    document.getElementById('player-inactive-minute').value = -1;
    if (checkPageRemote_Timeout == checkPageRemote_Timeout_Freeze)
    {
        checkPageRemote_Timeout = checkPageRemote_Timeout_default;
    }
    
    let sendCodeData = {'pageId' : document.getElementById('pageId').value, 'maLenh' : maLenh2};
    fetch
    (
        'send_code.php',
        {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(sendCodeData)
        }
    )
    .then (()=>
    {
        document.getElementById('sent_Alert').style.display = 'block';
        setTimeout(function()
        {
            document.getElementById('sent_Alert').style.display = 'none';
        },200);
        
        setTimeout(function()
        {
            resetInterval();
        },1500);
    })
    .catch(er => {console.log('có lỗi sendRemote: ' + er.message);});
}