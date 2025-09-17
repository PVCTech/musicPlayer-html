var countTime =  setInterval(function () {}, 10000);
var loading_Interval_Id = [];

class BaiHat
{
    constructor({rootFolder, folder, tenHienThi,  tenFile, tacGia, trinhBay,
                    volume, trangThai, delayBeforePlay, imageName, style})
    {
        this.tenHienThi = tenHienThi;
        this.rootFolder = rootFolder;
        this.folder = folder;
        this.tenFile = tenFile;
        this.tacGia = tacGia;
        this.trinhBay = trinhBay;
        this.volume = volume;        
        this.trangThai = trangThai;
        this.delayBeforePlay = delayBeforePlay;
        this.imageName = imageName;
        this.style = style;
    }
    
    
    media()
    {
        return document.getElementById(this.mediaId);
    }
    
    render()
    {
        let tr1 = document.createElement('tr');
            let td1 = document.createElement('td');
                let div1 = document.createElement('div');
                    div1.id = 'tr_' + this.trackId;
                    div1.classList.add("baiHatTr");
                    div1.classList.add("track");
                    let tbl1 = document.createElement('table');
                        tbl1.style.width = "100%";
                        let tbl1_tr1 = document.createElement('tr');
                            tbl1_tr1.id = "tr_Bai_" + this.trackId;
                            let tbl1_tr1_td1 = document.createElement('td');
                                tbl1_tr1_td1.style.width = "20px";
                                let stt = parseInt(this.trackId) + 1;
                                stt = stt < 10 ? '0' + stt : stt;
                                tbl1_tr1_td1.innerText = stt;
                                
                                
                                let media = document.createElement('audio');
                                media.id = this.mediaId;
                                media.classList.add("mediaSource");
                        
                                let media_source = document.createElement('source');
                                media_source.src= this.rootFolder + `cds/${this.folder}/musics/${this.tenFile}.mp3`;
                                media_source.autostart = false;
                                media_source.loop = false;
                                media.appendChild(media_source);
                                tbl1_tr1_td1.appendChild(media);
                                //var Media = document.getElementById(this.mediaId);
                                
                            let tbl1_tr1_td2 = document.createElement('td');
                                tbl1_tr1_td2.classList.add("div_Bai_TenBai");
                                tbl1_tr1_td2.innerHTML = this.tenHienThi;
                                    let spanAudioReady = document.createElement('span');
                                    spanAudioReady.style.color = "rgba(0,0,0,0.5)";
                                    spanAudioReady.id = "loading_" + this.trackId;
                                tbl1_tr1_td2.appendChild(spanAudioReady);
                            tbl1_tr1.appendChild(tbl1_tr1_td1);
                            tbl1_tr1.appendChild(tbl1_tr1_td2);
                        tbl1.appendChild(tbl1_tr1);

                        //Div stt của PlayingList:
                        let divStt = document.createElement('div');
                        divStt.id = 'playingList_stt_' + this.trackId;
                        divStt.classList.add('playingList_stt');
                    
                    div1.appendChild(tbl1);
                    div1.appendChild(divStt);
                td1.appendChild(div1);
            tr1.appendChild(td1);
        return tr1;
    }
    
    renderToRemote()
    {
        let tr1 = document.createElement('tr');
            let td1 = document.createElement('td');
                let div1 = document.createElement('div');
                    div1.id = 'tr_' + this.trackId;
                    div1.classList.add("baiHatTr");
                    div1.classList.add("track");
                    let tbl1 = document.createElement('table');
                        tbl1.style.width = "100%";
                        let tbl1_tr1 = document.createElement('tr');
                            tbl1_tr1.id = "tr_Bai_" + this.trackId;
                            let tbl1_tr1_td1 = document.createElement('td');
                                tbl1_tr1_td1.style.width = "20px";
                                let stt = parseInt(this.trackId) + 1;
                                stt = stt < 10 ? '0' + stt : stt;
                                tbl1_tr1_td1.innerText = stt;
                                
                                
                                let media = document.createElement('audio');
                                media.id = this.mediaId;
                                media.classList.add("mediaSource");
                        
                                let media_source = document.createElement('source');
                                media_source.src= this.rootFolder + `cds/${this.folder}/musics/${this.tenFile}.mp3`;
                                media_source.autostart = false;
                                media_source.loop = false;
                                media.appendChild(media_source);
                                tbl1_tr1_td1.appendChild(media);
                                //var Media = document.getElementById(this.mediaId);
                                
                            let tbl1_tr1_td2 = document.createElement('td');
                                tbl1_tr1_td2.classList.add("div_Bai_TenBai");
                                tbl1_tr1_td2.innerHTML = this.tenHienThi;
                                    let spanAudioReady = document.createElement('span');
                                    spanAudioReady.style.color = "rgba(0,0,0,0.5)";
                                    spanAudioReady.id = "loading_" + this.trackId;
                                tbl1_tr1_td2.appendChild(spanAudioReady);
                            tbl1_tr1.appendChild(tbl1_tr1_td1);
                            tbl1_tr1.appendChild(tbl1_tr1_td2);
                        tbl1.appendChild(tbl1_tr1);

                        //Div stt của PlayingList:
                        let divStt = document.createElement('div');
                        divStt.id = 'playingList_stt_' + this.trackId;
                        divStt.classList.add('playingList_stt');
                    
                    div1.appendChild(tbl1);
                    div1.appendChild(divStt);
                td1.appendChild(div1);
            tr1.appendChild(td1);
        return tr1;
    }
    
    
    play = () =>
    {
        this.trangThai = 1;
        if (Player.autoVolume == 0)
        {
            Player.setVolume(Player.volume);
        }
        else
        {
            if (this.volume > 0)
            {
                Player.setVolume(this.volume);
            }
            else
            {
                Player.setVolume(Player.volume);
            }
        }
        
        this.media().play();
        Player.trackId = this.trackId;
        Player.playingList.addPlayed(this.trackId);
        let stt = parseInt(this.trackId) + 1;
        stt = stt < 10? '0' + stt : stt;
        var baiHatTrs = document.querySelectorAll('.baiHatTr');
        baiHatTrs.forEach(bh=>bh.classList.remove('track_playing'));
        let baiHatPlayingTr = document.getElementById('tr_' + this.trackId);
        baiHatPlayingTr.classList.add('track_playing');
        
        document.getElementById('player_TenBaiDangHat').innerHTML = (`${stt}. ${this.tenHienThi}<br>
            <span style="font-size:11px;color:rgba(0,0,0,0.6);">Tác giả: ${this.tacGia}</span><br>
            <span style="font-size:11px;color:rgba(0,0,0,0.6);">Trình bày: ${this.trinhBay}</span>
        `);
        if (this.imageName == "cd")
        {
            var disc_img_Url = `${this.rootFolder}index_files/track_images/cd.png`;
        }
        else
        {
            var disc_img_Url = `${this.rootFolder}cds/${this.folder}/track_images/${this.imageName}`;
        }
        
        document.getElementById('cd_Image').src = disc_img_Url + "?version=2";
        //cuộn ds bài hát:
        if (this.trackId < 5)
        {
            document.getElementById('list_Container').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else if (this.trackId > Player.list.length - 5)
        {
            document.getElementById('list_Container').scrollTo({
                top: document.getElementById('list_Container').scrollHeight,
                behavior: 'smooth'
            });
        }
        else
        {
            document.getElementById('list_Container').scrollTo({
                top: baiHatPlayingTr.offsetTop - 150,
                behavior: 'smooth'
            });
        }
    }
    
    pause = () =>
    {
        this.trangThai = 0;
        this.media().pause();
    }
    
    stop = () =>
    {
        this.trangThai = 0;
        this.media().pause();
        this.media().currentTime=0;
    }
    
}

function ganSuKienChoBaiHat()
{
    var baiHatTrs = document.querySelectorAll(".baiHatTr");
    baiHatTrs.forEach(eachTr =>
    {
        eachTr.addEventListener('click',function()
        {
            let trId = this.id;
            let tach = trId.split("_");
            Player.playingList.toggle(tach[1]);
            //Player.play(tach[1]);
        });
    });
    
    var baiHatMedias = document.querySelectorAll(".mediaSource");
    baiHatMedias.forEach(media=>
    {
        media.addEventListener('ended',function()
        {
            Player.autoNext({batBuocNext:0});
        });
        
        media.addEventListener('canplaythrough',function()
        {
            let mediaId = this.id;
            let tach = mediaId.split("_");
            Player.showPlayOk(tach[1]);
        });
    });
    
        
    var baiHatTrs = document.querySelectorAll(".rm_baiHatTr");
    baiHatTrs.forEach(eachTr =>
    {
        eachTr.addEventListener('click',function()
        {
            let trId = this.id;
            let tach = trId.split("_");
            sendRemote('play_' + tach[2] + '_' + tach[3]);
            
            var baiHatTrs2 = document.querySelectorAll('.rm_baiHatTr');
            baiHatTrs2.forEach(bh=>bh.classList.remove('track_playing'));
            document.getElementById('rm_tr_' + tach[2] + "_" + tach[3]).classList.add('track_playing');
        });
    });
}

document.addEventListener("DOMContentLoaded",function()
{
    ganSuKienChoBaiHat();   
});






