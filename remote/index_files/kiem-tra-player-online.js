var soLanCheck = 0;
var dangMatKetNoi = 0;
var soLanMatKetNoiVoiPlayer = 0;
const checkPageRemote_Timeout_default = 1000;
const checkPageRemote_Timeout_Sleep = 5000;
const checkPageRemote_Timeout_Freeze = 300000;
const soPhutRemoteInactive = 10;
const soLanMatKetNoiCanCanhBao = 3; //Nếu kiểm tra 3 lần mà vẫn mất tín hiệu của player thì cảnh báo
var checkPageRemote_Timeout = checkPageRemote_Timeout_default;


//Nếu lâu không remote thì cũng dừng hoạt động remote
function inActive_Count()
{
    if (parseInt(document.getElementById('player-inactive-minute').value) < soPhutRemoteInactive)
    {
        document.getElementById('player-inactive-minute').value = parseInt(document.getElementById('player-inactive-minute').value) + 1;
    }
    
    if (parseInt(document.getElementById('player-inactive-minute').value) >= soPhutRemoteInactive)
    {
        checkPageRemote_Timeout = checkPageRemote_Timeout_Freeze;
        resetInterval();
        console.log("Frezze!!");
    }
    
    console.log("remote inactive: " + document.getElementById('player-inactive-minute').value + " minutes");
    setTimeout(function(){inActive_Count();},60000); //mỗi phút tăng 1 lần (nếu không send remote, nếu send remote thì set lại =0)
}

inActive_Count();


//Gửi trạng thái Remote và ktra trạng thái Player:
function setRemoteState_And_CheckPageState()
{
    let data1 = {'pageId' : document.getElementById('pageId').value};
    fetch
    (
        '/music-player/remote/check_player.php',
        {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data1)
        }
    )
    .then(response=>response.json())
    .then(data => {
        
        console.log(data);

        //1. AutoNext:
	    if (data['autoNextOn'] == '1')
        {
            document.getElementById('changeAutoNext_Button').src = '../index_files/img/nextauto.png';
        }
        else 
        {
            document.getElementById('changeAutoNext_Button').src = '../index_files/img/nextauto0.png';
        }        
        Player.autoNextOn = data['autoNextOn'];

        //2. Repeat:
	    Player.repeat = data['repeat'];
	    if (data['repeat'] == '0')
        {
            document.getElementById(Player.repeat_ButtonId).src = '/music-player/index_files/img/repeatall.png';
            document.getElementById(Player.repeat_ButtonId).style.opacity = '0.3';
        }
        else if (data['repeat'] == '1')
        {
            document.getElementById(Player.repeat_ButtonId).src = '/music-player/index_files/img/repeat1.png';
            document.getElementById(Player.repeat_ButtonId).style.opacity = '1';
        }
        else
        {
            document.getElementById(Player.repeat_ButtonId).src = '/music-player/index_files/img/repeatall.png';
            document.getElementById(Player.repeat_ButtonId).style.opacity = '1';
        }
        
        //3. Ngẫu nhiên:
        if (data['ngauNhien'] == '1')
        {
            document.getElementById(Player.ngauNhien_ButtonId).style.opacity = '1';Player.ngauNhien = 1;
        }
        else 
        {
            document.getElementById(Player.ngauNhien_ButtonId).style.opacity = '0.3';
        }
        Player.ngauNhien = data['ngauNhien'];
    
    
	    //4. Volume:
	    document.getElementById(Player.volumeId).value = data['volume'];
        Player.volume = data['volume'];
	    document.getElementById(Player.volumeText).innerText = data['volume'];
	    
	    if (data['autoVolume'] == '1')
        {
            document.getElementById(Player.autoVolume_ButtonId).style.opacity = '1';
        }
        else 
        {
            document.getElementById(Player.autoVolume_ButtonId).style.opacity = '0.3';
        }
        Player.autoVolume = data['autoVolume'];
	    
        //5. Thời gian playing:
	    document.getElementById('timePlaying').innerText = secondsToMMSS(data['timePlaying']) + '/' + secondsToMMSS(data['totalTime']);
	    var RealPT = parseInt(parseInt(data['timePlaying']) / parseInt(data['totalTime']) * 100);
        document.getElementById(Player.playing_ProccessId).value = RealPT;

        //6. Tên bài đang hát: /////chưa xong: load cd, load playinglist, load playedlist, laod thông tin bài hát
        if (data['listIndex'] !== Player.listIndex)
        {
            Player.listIndex = data['listIndex'];
            Player.loadCD(Player.listIndex);
        }

        
        Player.trackId = data['trackId'];
        if (data['listIndex'] > -1 && data['trackId'] > -1 && (data['listIndex'] !== Player.listIndex || data['trackId'] !== Player.trackId))
        {
		    document.getElementById('player_TenBaiDangHat').innerText = Player.list[data['listIndex']].data[data['trackId']].tenHienThi;
		    document.getElementById('cd_Image').src = '/music-player/index_files/disc_image/' + data['imageName'] + '.png?version=2';
		    
		    var baiHatTrs2 = document.querySelectorAll('.rm_baiHatTr');
            baiHatTrs2.forEach(bh=>bh.classList.remove('track_playing'));
            document.getElementById('rm_tr_' + data['listIndex'] + "_" + data['trackId']).classList.add('track_playing');
        }
        
        //7. Trạng thái của Control:
        if (data['trangThai'] == '1')
        {
            document.getElementById('player_PlayPause_Img').src = '/music-player/index_files/img/pause.png';
        }
        else 
        {
            document.getElementById('player_PlayPause_Img').src = '/music-player/index_files/img/play.png';
        }
        Player.list[this.trackId].trangThai = data['trangThai'];


	    //8. Trạng thái Online của Player:
	    if (data['dangOnline'] == 0)
	    {
	        let thoiGianPlayerMatKetNoi_ChuyenSleep = 60; //giây
	        if (soLanMatKetNoiVoiPlayer * checkPageRemote_Timeout/1000 >= thoiGianPlayerMatKetNoi_ChuyenSleep)
	        {
	            checkPageRemote_Timeout = checkPageRemote_Timeout_Sleep;
	            resetInterval();
	            console.log("Sleep!");
	        }
	        else
	        {
	            if (soLanMatKetNoiVoiPlayer * checkPageRemote_Timeout/1000 <= thoiGianPlayerMatKetNoi_ChuyenSleep) //tránh tràn bộ nhớ
	            {
	                soLanMatKetNoiVoiPlayer ++;
	                console.log("số lần mất kết nối: " + soLanMatKetNoiVoiPlayer);
	            }
	        }
	        
	        
	        if (soLanCheck < soLanMatKetNoiCanCanhBao) //tránh tràn bộ nhớ
	        {
	            soLanCheck++;
	            //console.log(soLanCheck);
	        }
	        
	        if (soLanCheck >= soLanMatKetNoiCanCanhBao) 
	        {
	            if (dangMatKetNoi == 0)
	            {
		            document.getElementById('matKetNoi_Div').style.display = 'block';
		            dangMatKetNoi =1;
	            }
	        }
	    }
	    else
	    {
	        soLanCheck = 0;
	        soLanMatKetNoiVoiPlayer = 0;
	        document.getElementById('matKetNoi_Div').style.display = 'none';
	        
	        if (dangMatKetNoi == 1)
	        {
	            checkPageRemote_Timeout = checkPageRemote_Timeout_default;
                resetInterval();
	        }
	        dangMatKetNoi = 0;
	    }
    })
    .catch(er => {console.log('Lấy trạng thái Player lỗi: ' + er.message);});
}

var setRemoteState_And_CheckPageState_Interval = setInterval(function()
{
    setRemoteState_And_CheckPageState();
}, checkPageRemote_Timeout);


function activeRemote()
{
    document.getElementById('player-inactive-minute').value = -1;
    soLanMatKetNoiVoiPlayer = 0;
    soLanCheck = 0;
    checkPageRemote_Timeout = checkPageRemote_Timeout_default;
    resetInterval();
}


function resetInterval()
{
    clearInterval(setRemoteState_And_CheckPageState_Interval);
    setRemoteState_And_CheckPageState_Interval = setInterval(function()
    {
        setRemoteState_And_CheckPageState();
    }, checkPageRemote_Timeout);
}
