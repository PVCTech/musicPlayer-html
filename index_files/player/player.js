var countTimer = setInterval(function () 
{ 
}, 1000000);

var delayPlay_Timeout  = setTimeout(function(){},0);
var countdown_Timeout = setInterval(function(){},0);
var countdownPlay = 0;
clearInterval(countTimer);
class Player_Class
{
    constructor({rootFolder, listIndex, list, playMode, playingList,trackId, 
        autoNextOn, volume, autoVolume, repeat, ngauNhien , lock})
    {
        this.rootFolder = rootFolder;
        this.listIndex = listIndex;
        this.list = list;
        this.playMode = playMode;
        this.playingList = playingList;
        
        this.trackId = trackId;
        this.autoNextOn = autoNextOn;

        this.volume = volume;
        this.autoVolume = autoVolume;
        this.volumeText = "volume_Text";
        this.volumeId = "player_Volume";
        this.autoVolume_ButtonId = "autoVolume_Button";

        this.repeat = repeat;
        this.ngauNhien = ngauNhien;
        this.repeat_ButtonId = "player_Repeat_Img";
        this.ngauNhien_ButtonId = "player_NgauNhien_Img";
        
        this.playColor = '#ccffcc';
        this.pauseColor = '#ddff99';
 
        this.playing_ProccessId = "playing_Proccess";
        
        this.lock = lock;
    }

    changeCD = () =>
    {
        if (this.lock == 0)
        {
            let soLuongCD = allCD.length;
            this.listIndex = (this.listIndex + 1) % soLuongCD;
            this.loadCD(this.listIndex);
        }
    }

    loadCD = (listIndex) =>
    {
        this.stop();
        this.listIndex = listIndex;
        this.list = allCD[this.listIndex];
        document.getElementById('list_Container').innerHTML = '';
        document.getElementById('list_Container').appendChild(this.renderList());
        this.trackId = -1;
        this.playingList.reset();
        document.getElementById('playing_Div').innerHTML = this.renderPlayingTrack();
        ganSuKienChoBaiHat();
    }

    
    changeAutoNext = () =>
    {
        if (this.autoNextOn == 0)
        {
            this.autoNextOn = 1;
            document.getElementById('changeAutoNext_Button').src = this.rootFolder + `index_files/img/nextauto.png`;
        }
        else
        {
            this.autoNextOn = 0;
            document.getElementById('changeAutoNext_Button').src = this.rootFolder + `index_files/img/nextauto0.png`;
        }
        
    }
    
    scrollToProccess = () =>
    {
        if (this.lock == 0)
        {
            if (this.trackId > -1)
            {
                var proc = document.getElementById(this.playing_ProccessId);
                var currentMedia = this.list[this.trackId].media();
                var totalTime = parseInt(currentMedia.duration);
                currentMedia.currentTime = parseInt(parseInt(proc.value)/100 * totalTime);
            }
        }
    }
    
    prev = () =>
    {
        var pre_TrackId = -1;

        if (this.repeat == 1)
        {
            if (this.trackId > -1)
            {
                this.list[this.trackId].stop();
                this.list[this.trackId].play();
            }        
        }
        else if (this.repeat == 2 || this.repeat == 0)
        {
            if (this.playingList.list.length == 0) 
            //Nếu không có List tự chọn (Playinglist) thì quay về bài có id giảm 1.
            // Nếu đang bài đầu thì play lại bài đầu từ 0s
            {
                if (this.trackId < 0)
                {
                    pre_TrackId = this.list.length - 1;
                }
                else
                {
                    if (this.trackId == 0)
                    {
                        pre_TrackId = 0;
                        this.list[this.trackId].stop();
                    }
                    else
                    {
                        pre_TrackId = this.trackId - 1;
                    }
                }
            }
            else //Có list tùy chỉnh: 
            //Nếu bài đang play không trong list thì Quay lại bài cuối Playing list
            //Nếu trong playinglist thì lùi 1 index trong playing list
            {
                let ViTrHienTaiTrongPlayingList = this.playingList.list.map(Number).indexOf(Number(this.trackId));
                if (ViTrHienTaiTrongPlayingList == -1 || this.trackId < 0 || ViTrHienTaiTrongPlayingList ==0)
                {
                    pre_TrackId = this.playingList.list[this.playingList.list.length - 1];
                }
                else
                {
                    pre_TrackId = this.playingList.list[ViTrHienTaiTrongPlayingList - 1];             
                }
                //console.log('pre_TrackId:', {list: this.playingList.list, track:pre_TrackId});
            }
            this.play(pre_TrackId);
        }
    }
    
    play(trackId)
    {
        //Kiểm tra volume mặc định của bài và vulumne hiện tại của player, setVolume trước khi play
        if (trackId > -1)
        {
            //console.log(trackId);
            if (this.list[trackId].trangThai ==1) //đang play thì giữ nguyên
            {
                
            }
            else //nếu đang stop hoặc pause thì play lên:
            {
                if (this.trackId !== trackId)
                {
                    this.stop();
                    this.trackId = trackId;
                }
                
                this.list[trackId].play();
                clearInterval(countTimer);
                countTimer = setInterval(function ()
                { 
                    startTimeLine();
                }, 1000);
                
                document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/pause.png`;
                document.getElementById("player_Stop_Img").style.opacity = "1";
                document.getElementById('player_Container').style.background = this.playColor;
            }
            this.list[trackId].trangThai = 1;
            document.getElementById('playingListDisplay').style.display = 'block';
            if (this.playingList.list.length >0)
            {
                document.getElementById('playingListDisplay').innerText = this.playingList.playedList.length + '/' + this.playingList.list.length;
            }
            else
            {
                document.getElementById('playingListDisplay').innerText = this.playingList.playedList.length + '/' + this.list.length;
            }
        }
        
        
        if (trackId == -100)
        {
            if (this.trackId > -1)
            {
            }
            else
            {
                this.trackId = 0;
            }
            
            if (this.list[trackId].trangThai ==1) //đang play
            {
                
            }
            else
            {
                this.list[trackId].play();
                clearInterval(countTimer);
                countTimer = setInterval(function ()
                { 
                    startTimeLine();
                }, 1000);
                
                document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/pause.png`;
                document.getElementById("player_Stop_Img").style.opacity = "1";
                document.getElementById('player_Container').style.background = this.playColor;
            }
            this.list[trackId].trangThai = 1;
        }
    }
    
    
    pause(trackId)
    {
        if (trackId > -1)
        {
            if (this.list[trackId].trangThai == 0)
            {                
            }
            else
            {
                this.list[trackId].pause();
                clearInterval(countTimer);
                document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/play.png`;
                document.getElementById('player_Container').style.background = this.pauseColor;
            }
            this.list[trackId].trangThai = 0;
        }
        
        if (trackId == -100 && this.trackId > -1)
        {
            if (this.list[trackId].trangThai ==0)
            {
                
            }
            else
            {
                this.list[trackId].pause();
                clearInterval(countTimer);
                document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/play.png`;
                document.getElementById('player_Container').style.background = this.pauseColor;
            }
            this.list[trackId].trangThai = 0;
        }
    }
    
    playPause()
    {   
        //console.log(this.listId + '::' + this.trackId);
        if (this.trackId > -1)
        {
            if (this.list[this.trackId].trangThai < 1)
            {
                this.play(this.trackId);
            }
            else
            {
                this.pause(this.trackId);
            }
        }
        else
        {
            this.autoNext({batBuocNext: 1});
        }
    }
    
    
    
    
    stop()
    {
        if (this.trackId > -1)
        {
            this.list[this.trackId].stop();
            this.list[this.trackId].trangThai = 0;
            this.list[this.trackId].media().currentTime = 0;
        }
        else
        {
            document.getElementById('cd_Image').src= this.rootFolder + 'index_files/track_images/cd.png?version=2';
            document.getElementById('player_TenBaiDangHat').innerText = '....';
        }
        
        document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/play.png`;
        document.getElementById("player_Stop_Img").style.opacity = "0.3";
        document.getElementById('player_Container').style.background = 'white';
        document.getElementById('timePlaying').innerText = '--:--/--:--';
    }
    
    showPlayOk(track_Id)
    {
        document.getElementById("loading_" + track_Id).innerHTML = "&#10004;";
    }
    
    
    autoNext = ({batBuocNext = 0}) =>
    {
        //console.log('Current track:' + this.trackId);
        let playerAutoNextOn = batBuocNext == 1 ? 1 : this.autoNextOn;
        //console.log('///////////////////////////////////////////autoNext');
        //1. Nếu repeat = 0: next đến bài tiếp theo trong PlayingList, không quay vòng (nếu hết list thì dừng)
        //2. Nếu repeat 1 bài thì play lại bài đó từ đầu, ko đến bài tiếp
        //3. Nếu repeat = 2 (all) tức là: 
            //3.1. Nếu không ngẫu nhiên: phát tuận tự và lặp lại list khi hết
            //3.2. Nếu ngẫu nhiên thì chọn ngẫu nhiên và bài nào phát rồi thì thôi, hết list thì lại xóa ds phát rôi và ngẫu nhiên từ đầu
        //(List ở đây là toàn bộ list nếu không có playinglist. nếu có playinglist thì list chính là playinglist)
        let playingListHienTai = [];
        if (this.playingList.list.length > 0)
        {
            playingListHienTai = this.playingList.list;
        }
        else
        {
            playingListHienTai =  [];
            for (var i =0 ; i < this.list.length; i ++)
            {
                playingListHienTai.push(i);
            }
        }
        
        //console.log('Playing list hiện tại:', playingListHienTai);
        this.stop();
        
        if (playerAutoNextOn == 0)
        {
            //console.log('Player autoNext is off, stop player');
            this.trackId = -1;
        }
        else
        {
            var autoNext_TrackId = -1;
            if (this.repeat==0)
            {
                var index = playingListHienTai.map(Number).indexOf(Number(this.trackId));
                //console.log('Current track index in playing list:', index);
                //console.log('Playing list:', playingListHienTai);
                if (index < playingListHienTai.length - 1) //nếu id của bài hát chưa nằm cuôi playing list (thứ tự lung tung)
                {
                    index = index + 1;                                   
                
                    var delay = batBuocNext == 1 ? 0 : parseInt(this.list[playingListHienTai[index]].delayBeforePlay) * 1000;
                    if (delay > 0)
                    {
                        document.getElementById('playingListDisplay').style.display = 'block';
                        countdownPlay = delay / 1000;
                        clearTimeout(countdown_Timeout);
                        countdown_Timeout = setInterval(function (){
                            countdownPlay--;
                            document.getElementById('playingListDisplay').innerText = countdownPlay;
                            if (countdownPlay < 1)
                            {
                                clearInterval(countdown_Timeout);
                            }                            
                        },1000);
                        clearTimeout(delayPlay_Timeout );
                        var that = this;
                        delayPlay_Timeout  = setTimeout(function(){
                            document.getElementById('playingListDisplay').style.display = 'none';
                            that.play(playingListHienTai[index]);
                        },delay);
                    }
                    else
                    {
                        this.play(playingListHienTai[index]);
                    }
                }
                else
                {
                    if (batBuocNext == 1)
                    {
                        autoNext_TrackId = playingListHienTai[0];
                        this.play(autoNext_TrackId);
                    }
                    else
                    {
                        this.stop();
                        this.TrackId = -1;
                        this.playingList.playedList = [];
                        document.getElementById('player_TenBaiDangHat').innerText = '....';
                        document.getElementById('cd_Image').src= this.rootFolder + 'index_files/track_images/cd.png?version=2';
                        document.getElementById('player_Container').style.background = 'white';
                        document.getElementById('timePlaying').innerText = '--:--/--:--';
                        document.getElementById('player_PlayPause_Img').src = this.rootFolder + `index_files/img/play.png`;
                        document.getElementById("player_Stop_Img").style.opacity = "0.3";
                        document.getElementById('playingListDisplay').style.display = 'none';
                    }
                }
            }

            if (this.repeat ==1)
            {
                this.stop();
                autoNext_TrackId = this.trackId;
                this.play(autoNext_TrackId);
            }

            if (this.repeat ==2)
            {
                if (this.ngauNhien == 1)
                {
                    //Loại bỏ các bài đã play để lấy ngẫu nhiên trong số còn lại:
                    let listConLai = [];
                    for (let i=0; i < playingListHienTai.length; i ++)
                    {
                        if (this.playingList.playedList.map(Number).indexOf(Number(playingListHienTai[i])) == -1)
                        {
                            listConLai.push(playingListHienTai[i]);
                        }
                    }
                    if (listConLai.length == 0) 
                    {
                        listConLai = playingListHienTai;
                        this.playingList.playedList = [];
                    }
                    autoNext_TrackId = Math.floor(Math.random() * listConLai.length);
                    this.play(listConLai[autoNext_TrackId]);
                }
                else
                {
                    /*
                    console.log('Current track:',{
                        id: this.trackId,
                        name: this.list[this.trackId].tenHienThi,
                        autoNext: this.list[this.trackId].autoNext,
                        ngauNhien: this.ngauNhien,
                        repeat: this.repeat,
                        playingList: playingListHienTai
                    }); */
                    var index = playingListHienTai.map(Number).indexOf(Number(this.trackId));                       
                    
                    if (index < playingListHienTai.length - 1) //nếu id của bài hát chưa nằm cuôi playing list (thứ tự lung tung)
                    {
                        index = index + 1;
                    }
                    else
                    {
                        index =0;
                    }       
                    /*             
                    console.log('Next track:',{
                        index: index,
                        id: playingListHienTai[index],
                        name: this.list[playingListHienTai[index]].tenHienThi
                    })*/
                    
                    var delay = batBuocNext == 1 ? 0 : parseInt(this.list[playingListHienTai[index]].delayBeforePlay) * 1000;
                    if (delay > 0)
                    {
                        clearTimeout(delayPlay_Timeout );
                        var that = this;
                        delayPlay_Timeout  = setTimeout(function(){
                            that.play(playingListHienTai[index]);
                        },delay);
                    }
                    else
                    {
                        this.play(playingListHienTai[index]);
                    }
                }
            }
            
        }
    }
    
    
    next = () =>
    {
        this.autoNext({batBuocNext: 1});
    }
    
    changeRepeat = () =>
    {
        switch (this.repeat)
        {
            case 0:
                this.repeat = 1;
                document.getElementById(this.repeat_ButtonId).style.opacity = '0.8';
                document.getElementById(this.repeat_ButtonId).src = `${this.rootFolder}index_files/img/repeat1.png`;
                this.ngauNhien = 0;
                document.getElementById(this.ngauNhien_ButtonId).style.opacity = 0.3;
                break;
            case 1:
                this.repeat = 2;
                document.getElementById(this.repeat_ButtonId).src = `${this.rootFolder}index_files/img/repeatall.png`;
                break;
            case 2:
                this.repeat = 0;
                document.getElementById(this.repeat_ButtonId).style.opacity = '0.3';
                break;
        }
    }
    
    changeNgauNhien = () =>
    {
        if (this.ngauNhien == 1)
        {
            this.ngauNhien = 0;
            document.getElementById(this.ngauNhien_ButtonId).style.opacity = 0.3;
        }
        else
        {
            this.ngauNhien = 1;
            document.getElementById(this.ngauNhien_ButtonId).style.opacity = 0.8;
            this.repeat = 2;
            document.getElementById(this.repeat_ButtonId).src = `${this.rootFolder}index_files/img/repeatall.png`;
            document.getElementById(this.repeat_ButtonId).style.opacity = '0.8';
        }
    }
    
    
    setVolume(level)
    {
        document.getElementById(this.volumeId).value = level;
        var volumeSet = parseFloat(level/100,1);
        if (this.trackId>-1)
        {
            this.list[this.trackId].media().volume = volumeSet;
        }
        document.getElementById(this.volume_Text).innerText = level;
        this.volume = level;
    }
    
    changeAutoVolume = () =>
    {
        if (this.autoVolume == 1)
        {
            this.autoVolume = 0;
            document.getElementById(this.autoVolume_ButtonId).style.color = "rgba(0,0,0,0.1)";
        }
        else
        {
            this.autoVolume = 1;
            document.getElementById(this.autoVolume_ButtonId).style.color = "rgba(0,0,0,0.8)";
        }
    }
    
    
    
    renderPlayingTrack()
    {
        var lockImg = this.lock == 1 ? 'lock' : 'unlock';
        var changeCDImg = this.lock == 1 ? '' : 'display:block;';
        var HTML = `
            <center>
                <div id="player_Container" style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="width:25%;position:relative;">
                                <style>
                                    .img-change-CD {display:none;}
                                    .img-change-CD:hover{opacity:1;}
                                </style>
                                <div style="position:absolute;left:0px;top:0px;z-index:2;" onclick="Player.changeCD();">
                                    <img src="${this.rootFolder}index_files/player/img/cd.png" id="img-change-CD" class="img-change-CD" style="width:20px;opacity:0.8;${changeCDImg}">
                                </div>
                                <center>
                                    <style>
                                        @media only screen and (min-width:577px){.cd_Image_Div{height:12vh;}}
                                        @media only screen and (max-width:576px){.cd_Image_Div{height:12vh;}}
                                    </style>
                                    <div class="cd_Image_Div" style="overflow: hidden;border-radius:5px;padding:8px;text-align:center;">
                                        <img id="cd_Image" src="${this.rootFolder}index_files/track_images/cd.png?version=2" style="max-height:12vh;opacity:0.8;">
                                    </div>
                                </center>
                            </td>
                            <td style="vertical-align:text-top;padding-top:5px;position:relative;">
                                <div style="position:absolute;right:5px;top:0px;" onclick="Player.toggleLock();">
                                    <img src="${this.rootFolder}index_files/player/img/${lockImg}.png" id="player_Lock_Button" style="width:15px;">
                                </div>
                                <span style="font-size:16px;color:green;font-weight:bold;" id="player_TenBaiDangHat">
                                    ...
                                </span><br>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="position:relative;margin-bottom:10px;" id="timePlaying_Proccess_Div">
                        <div class="timePlaying" style="position:absolute;right:10px;bottom:20px;z-index:2;" id="timePlaying">--/--</div>
                        <input type="range" id="${this.playing_ProccessId}" min="0" max="100" value="0" style="width:100%;opacity:0.3;" oninput="Player.scrollToProccess()">
                        <div id="playingListDisplay" class="playingListDisplay">
                            Playing List: ${this.playingList.list.length}
                        </div>
                    </div>
                </div>
            </center>
        `;
        return HTML;
    }

    renderPlayingTrackToRemote()
    {
        var lockImg = this.lock == 1 ? 'lock' : 'unlock';
        var changeCDImg = this.lock == 1 ? '' : 'display:block;';
        var HTML = `
            <center>
                <div id="player_Container" style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="width:25%;position:relative;">
                                <style>
                                    .img-change-CD {display:none;}
                                    .img-change-CD:hover{opacity:1;}
                                </style>
                                <div style="position:absolute;left:0px;top:0px;z-index:2;" onclick="sendRemote('changeCD');">
                                    <img src="${this.rootFolder}index_files/player/img/cd.png" id="img-change-CD" class="img-change-CD" style="width:20px;opacity:0.8;${changeCDImg}">
                                </div>
                                <center>
                                    <style>
                                        @media only screen and (min-width:577px){.cd_Image_Div{height:12vh;}}
                                        @media only screen and (max-width:576px){.cd_Image_Div{height:12vh;}}
                                    </style>
                                    <div class="cd_Image_Div" style="overflow: hidden;border-radius:5px;padding:8px;text-align:center;">
                                        <img id="cd_Image" src="${this.rootFolder}index_files/track_images/cd.png?version=2" style="max-height:12vh;opacity:0.8;">
                                    </div>
                                </center>
                            </td>
                            <td style="vertical-align:text-top;padding-top:5px;position:relative;">
                                <div style="position:absolute;right:5px;top:0px;" onclick="Player.toggleLock();">
                                    <img src="${this.rootFolder}index_files/player/img/${lockImg}.png" id="player_Lock_Button" style="width:15px;">
                                </div>
                                <span style="font-size:16px;color:green;font-weight:bold;" id="player_TenBaiDangHat">
                                    ...
                                </span><br>
                            </td>
                        </tr>
                    </table>
                    
                    <div style="position:relative;margin-bottom:10px;" id="timePlaying_Proccess_Div">
                        <div class="timePlaying" style="position:absolute;right:10px;bottom:20px;z-index:2;" id="timePlaying">--/--</div>
                        <input type="range" id="${this.playing_ProccessId}" min="0" max="100" value="0" style="width:100%;opacity:0.3;" oninput="Player.scrollToProccess()">
                        <div id="playingListDisplay" class="playingListDisplay">
                            Playing List: ${this.playingList.list.length}
                        </div>
                    </div>
                </div>
            </center>
        `;
        return HTML;
    }

    renderControl()
    {
        var HTML = `
        <div style="width:100%;">
            <center>
                <div id="Control_Div" style="background:white;box-shadow: 1px 1px 3px #888888;z-index:102;padding-top:5px;padding-bottom:5px;">
                    <table style="">
                        <tr>
                            <td style="">
                            
                            </td>
                            <td style="width:20px;">
                                <a class="Button" href="javascript:void(0);"><img id="${this.repeat_ButtonId}" src="${this.rootFolder}index_files/img/repeat1.png" style="width:30px;opacity:0.3;" onclick="Player.changeRepeat();"></a>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="player_Stop_Img" src="${this.rootFolder}index_files/img/stop.png" style="width:30px;opacity:0.3;" onclick="Player.stop();"></a>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="Player_Prev_Img" src="${this.rootFolder}index_files/img/prev.png" style="width:40px;" onclick="Player.prev();"></a>
                            </td>
                            <td style="width:70px;">
                                <center>
                                    <a class="Button" href="javascript:void(0);"><img id="player_PlayPause_Img" src="${this.rootFolder}index_files/img/play.png" style="width:50px;" onclick="Player.playPause();"></a>
                                </center>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="Player_Next_Img" src="${this.rootFolder}index_files/img/next.png" style="width:40px;" onclick="Player.next();"></a>
                            </td>
                            <td style="width:40px;">
                                <center>
                                    <a class="Button" href="javascript:void(0);"><img id="changeAutoNext_Button" src="${this.rootFolder}index_files/img/nextauto.png" style="width:30px;" onclick="Player.changeAutoNext();"></a>
                                </center>
                            </td>
                            <td style="width:20px;">
                                <a class="Button" href="javascript:void(0);"><img id="${this.ngauNhien_ButtonId}" src="${this.rootFolder}index_files/img/repeat136.png" style="width:30px;opacity:0.3;" onclick="Player.changeNgauNhien();"></a>
                            </td>
                            <td>
                            
                            </td>
                        </tr>
                    </table>
                </div>
                
                <table style="width:95%;margin-top:10px;margin-bottomk:10px;">
                    <tr>
                        <td style="width:20px;text-align:right;font-size:10px;">
                            <span id="${this.autoVolume_ButtonId}" style="color:rgba(0,0,0,0.8);" onclick="Player.changeAutoVolume();">Auto</span>
                        </td>
                        <td style="width:30px;text-align:right;">
                            <img src="${this.rootFolder}index_files/img/speaker.png" style="width:20px;">
                        </td>
                        <td>
                            <input type="range" id="${this.volumeId}" min="0" max="100" value="${this.volume}" style="width:100%;opacity:0.3;" oninput="Player.autoVolume = 1;Player.changeAutoVolume();Player.setVolume(document.getElementById('${this.volumeId}').value);">
                        </td>
                        <td style="width:30px;color:rgba(0,0,0,0.3);">
                            <div id="${this.volume_Text}">
                            </div>
                        </td>
                        <td style="width:20px;">
                            <a href="javascript:void(0);" class="Button"><img src="${this.rootFolder}index_files/img/remote.png" style="width:20px;opacity:0.3;" id="showQuetMa_Button" onclick="document.getElementById('remote_Enable').value ='0';showQuetMa();"></a>
                        </td>
                    </tr>
                </table>
            </center>
        </div> `;
        return HTML;
    }


    renderControlToRemote()
    {
        var HTML = `
        <div style="width:100%;">
            <center>
                <div id="Control_Div" style="background:white;box-shadow: 1px 1px 3px #888888;z-index:102;padding-top:5px;padding-bottom:5px;">
                    <table style="">
                        <tr>
                            <td style="">
                            
                            </td>
                            <td style="width:20px;">
                                <a class="Button" href="javascript:void(0);"><img id="${this.repeat_ButtonId}" src="${this.rootFolder}index_files/img/repeat1.png" style="width:30px;opacity:0.3;" onclick="sendRemote('repeat1');"></a>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="player_Stop_Img" src="${this.rootFolder}index_files/img/stop.png" style="width:30px;opacity:0.3;" onclick="sendRemote('stop');"></a>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="Player_Prev_Img" src="${this.rootFolder}index_files/img/prev.png" style="width:40px;" onclick="sendRemote('prev');"></a>
                            </td>
                            <td style="width:70px;">
                                <center>
                                    <a class="Button" href="javascript:void(0);"><img id="player_PlayPause_Img" src="${this.rootFolder}index_files/img/play.png" style="width:50px;" onclick="sendRemote('playpause');"></a>
                                </center>
                            </td>
                            <td style="width:40px;">
                                <a class="Button" href="javascript:void(0);"><img id="Player_Next_Img" src="${this.rootFolder}index_files/img/next.png" style="width:40px;" onclick="sendRemote('next');"></a>
                            </td>
                            <td style="width:40px;">
                                <center>
                                    <a class="Button" href="javascript:void(0);"><img id="changeAutoNext_Button" src="${this.rootFolder}index_files/img/nextauto.png" style="width:30px;" onclick="sendRemote('autonext');"></a>
                                </center>
                            </td>
                            <td style="width:20px;">
                                <a class="Button" href="javascript:void(0);"><img id="${this.ngauNhien_ButtonId}" src="${this.rootFolder}index_files/img/repeat136.png" style="width:30px;opacity:0.3;" onclick="sendRemote('repeat136');"></a>
                            </td>
                            <td>
                            
                            </td>
                        </tr>
                    </table>
                </div>
                
                <table style="width:95%;margin-top:10px;margin-bottomk:10px;">
                    <tr>
                        <td style="width:20px;text-align:right;font-size:10px;">
                            <span id="${this.autoVolume_ButtonId}" style="color:rgba(0,0,0,0.8);" onclick="sendRemote('autoVolume');">Auto</span>
                        </td>
                        <td style="width:30px;text-align:right;">
                            <img src="${this.rootFolder}index_files/img/speaker.png" style="width:20px;">
                        </td>
                        <td>
                            <input type="range" id="${this.volumeId}" min="0" max="100" value="${this.volume}" style="width:100%;opacity:0.3;" oninput="sendVolume();">
                        </td>
                        <td style="width:30px;color:rgba(0,0,0,0.3);">
                            <div id="${this.volume_Text}">
                            </div>
                        </td>
                    </tr>
                </table>
            </center>
        </div> `;
        return HTML;
    }

    renderList()
    {
        var container = document.createElement('div');
        container.style.background = this.background;
        container.style.marginTop = "20px";
        container.style.borderRadius = "5px";
        container.style.width = "98%";

        const tbl = document.createElement('table');
        tbl.style.width = "95%";
        this.list.forEach (bh=>
            {
                tbl.appendChild(bh.render());
            }
        );

        container.appendChild(tbl);
        return container;
    }
    
    
    renderListToRemote()
    {
        var container = document.createElement('div');
        container.style.background = this.background;
        container.style.marginTop = "20px";
        container.style.borderRadius = "5px";
        container.style.width = "98%";

        const tbl = document.createElement('table');
        tbl.style.width = "95%";
        this.list.forEach (bh=>
            {
                tbl.appendChild(bh.renderToRemote());
            }
        );

        container.appendChild(tbl);
        return container;
    }
    
    
    toggleLock()
    {
        if (this.lock == 1)
        {
            this.lock = 0;
            document.getElementById('img-change-CD').style.display = 'block';
            document.getElementById('player_Lock_Button').src=`${this.rootFolder}index_files/player/img/unlock.png`;
        }
        else
        {
            this.lock = 1;
            document.getElementById('img-change-CD').style.display = 'none';
            document.getElementById('player_Lock_Button').src=`${this.rootFolder}index_files/player/img/lock.png`;
        }
    }
}



function startTimeLine()
{
    var timePlaying = 0;
    var totalTime = 0;
    
    if (Player.trackId > -1)
    {
        var currentMedia = Player.list[Player.trackId].media();
        timePlaying = parseInt(currentMedia.currentTime);
        totalTime = parseInt(currentMedia.duration);
    }
    
    if (totalTime < 1)
    {
        
    }
    else
    {
        var realPhanTram = parseInt(timePlaying/totalTime * 100);
        document.getElementById('playing_Proccess').value = realPhanTram;
        document.getElementById('timePlaying').innerHTML = '<font color="green">' + secondsToMMSS(timePlaying) + '/' + secondsToMMSS(totalTime) + '</font>';
    }
}


function stopTimeLine()
{
	clearInterval(countTimer);
	document.getElementById('timePlaying_Proccessing').style.width = '0px';
	document.getElementById('timePlaying').innerHTML = '<font color="green">--/--</font>';
}
    


var Player = new Player_Class({rootFolder: rootFolder, listIndex: 0, list : allCD[0], 
        playMode:0, playingList: new PlayingList([],[]), trackId:-1, 
        autoNextOn : 1, volume: 80, autoVolume: 1, repeat:0, ngauNhien:0, lock: 1});
