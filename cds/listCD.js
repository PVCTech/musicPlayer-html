function cloneBaiHat(bh) {
    return new BaiHat(JSON.parse(JSON.stringify(bh)));
}

var allCD = [];
var cdChaoCo = [];

cdChaoCo.push(cloneBaiHat(listNhacMaiLinh[0]));
cdChaoCo.push(cloneBaiHat(listNhacLe[0]));
cdChaoCo.push(cloneBaiHat(listNhacMaiLinh[1]));

for (let i = 2; i < listNhacMaiLinh.length; i++) {
    cdChaoCo.push(cloneBaiHat(listNhacMaiLinh[i]));
}

listNhacNen.forEach(e => {
    cdChaoCo.push(cloneBaiHat(e));
});

listQueHuongCachMang.forEach(e => {
    cdChaoCo.push(cloneBaiHat(e));
});

for (let i = 0; i < cdChaoCo.length; i++) {
    cdChaoCo[i].trackId = i;
    cdChaoCo[i].mediaId = `music_${i}`;
}

allCD.push(cdChaoCo);

var cdNhacDangCongSan = [];
listNhacLe.forEach(e =>
    {
        cdNhacDangCongSan.push(cloneBaiHat(e));
    }
);

listDangCongSan.forEach(e =>
    {
        cdNhacDangCongSan.push(cloneBaiHat(e));
    }
);
for (let i = 0; i < cdNhacDangCongSan.length; i++) {
    cdNhacDangCongSan[i].trackId = i;
    cdNhacDangCongSan[i].mediaId = `music_${i}`;
}

allCD.push(cdNhacDangCongSan);

var cdSinhNhat = [];
listSinhNhat.forEach(e =>
{
    cdSinhNhat.push(cloneBaiHat(e));
});

for (let i = 0; i < cdSinhNhat.length; i++) {
    cdSinhNhat[i].trackId = i;
    cdSinhNhat[i].mediaId = `music_${i}`;
}
allCD.push(cdSinhNhat);
