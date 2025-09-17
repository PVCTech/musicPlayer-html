function secondsToMMSS(sc)
{
    let second = sc % 60;
    second = second < 10 ? '0' + String(second) : String(second);
    let minute = parseInt(sc / 60);
    minute = minute < 10 ? '0' + String(minute) : String(minute);
    return minute + ':' + second;
}