class PlayingList
{
    constructor(list = [], playedList = [])
    {
        this.list = list;
        this.playedList = playedList;
    }

    add(trackId)
    {
        this.remove(trackId);
        this.list.push(trackId);
        this.render(trackId);
    }

    remove (trackId)
    {
        let index = this.list.indexOf(trackId);
        if (index !== -1)
        {
            this.list.splice(index,1);
        }
        this.unrender(trackId);
    }

    toggle(trackId)
    {
        let index = this.list.indexOf(trackId);
        if (index !== -1)
        {
            this.list.splice(index,1);
        }
        else
        {
            this.list.push(trackId);
        }
        this.reRender();
        //console.log('PlayingList.toggle', this.list);
        document.getElementById('playingListDisplay').innerText = this.playedList.length + '/' + this.list.length;
        document.getElementById('playingListDisplay').style.display = this.list.length > 0 ? 'block' : 'none';

        //Lọc bài pleyed thừa trong played list (không trong playing list)
        this.playedList = this.playedList.filter(trackIdi => this.list.map(Number).indexOf(Number(trackIdi))!==-1);
    }

    render(trackId)
    {
        let baiHatPlayingTr = document.getElementById('tr_' + trackId);
        baiHatPlayingTr.classList.add('track_selected');
    }

    unrender(trackId)
    {
        let baiHatPlayingTr = document.getElementById('tr_' + trackId);
        baiHatPlayingTr.classList.remove('track_selected');
    }

    reset()
    {
        this.list = [];
        this.playedList = [];
        document.getElementById('playingListDisplay').style.display = 'none';
        this.reRender();
    }

    addPlayed(trackId)
    {
        this.removePlayed(trackId);
        this.playedList.push(trackId);
    }

    removePlayed (trackId)
    {
        let index = this.playedList.map(Number).indexOf(Number(trackId));
        if (index !== -1)
        {
            this.playedList.splice(index,1);
        }
    }

    reRender()
    {
        var baiHatTrs = document.querySelectorAll('.baiHatTr');
        baiHatTrs.forEach(bh=>bh.classList.remove('track_selected'));
        
        var divStts = document.querySelectorAll('.playingList_stt');
        divStts.forEach(divStt=>divStt.innerText ='');

        for (let i=0; i < this.list.length; i ++)
        {
            let baiHatPlayingTr = document.getElementById('tr_' + this.list[i]);
            baiHatPlayingTr.classList.add('track_selected');
            let j = i + 1;
            j = j < 10 ? '0' + j : j;

            // Tạo SVG
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("width", "20");
            svg.setAttribute("height", "20");

            // Tạo hình tròn
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", "10");
            circle.setAttribute("cy", "10");
            circle.setAttribute("r", "9");
            circle.setAttribute("fill", "white");
            circle.setAttribute("stroke", "green");
            circle.setAttribute("stroke-width", "1");

            // Tạo text ở giữa hình tròn
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", "10");
            text.setAttribute("y", "14"); // tùy font, bạn có thể chỉnh 50 -> 55 cho căn giữa theo chiều dọc
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "10");
            text.setAttribute("fill", "green");
            text.textContent = j; // số bạn muốn

            // Thêm vào SVG
            svg.appendChild(circle);
            svg.appendChild(text);
            document.getElementById('playingList_stt_' + this.list[i]).appendChild(svg);
        }
    }
}

//khi đang play bài 3 , nhưng lại thêm 1 bài nữa, xóa bài 2 thì phải tính lại index playing trong p;ayinglist