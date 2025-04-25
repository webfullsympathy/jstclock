let offset = 0;

async function fetchNICT() {
    try {
        const before = Date.now();
        const res = await fetch('https://3fe5a5f690efc790d4764f1c528a4ebb89fa4168.nict.go.jp/cgi-bin/json');
        const after = Date.now();
        const data = await res.json();
        const rtt = after - before;
        const serverTime = data.st * 1000;
        const clientTime = Date.now();
        offset = (serverTime + rtt / 2) - clientTime;
    } catch (e) {
        document.getElementById('jst').textContent = '取得失敗';
    }
}

function pad(num, len = 2) {
    return num.toString().padStart(len, '0');
}

function showClock() {
    const nowUTC = new Date(Date.now() + offset);
    const jst = new Date(nowUTC.getTime() + 9 * 60 * 60 * 1000);
    const y = jst.getUTCFullYear();
    const m = pad(jst.getUTCMonth() + 1);
    const d = pad(jst.getUTCDate());
    const h = pad(jst.getUTCHours());
    const min = pad(jst.getUTCMinutes());
    const s = pad(jst.getUTCSeconds());
    const ms = pad(jst.getUTCMilliseconds(), 3);
    document.getElementById('jst').textContent = `${y}/${m}/${d} ${h}:${min}:${s}.${ms}`;
}

fetchNICT();
setInterval(fetchNICT, 900000); // 15分おき
setInterval(showClock, 10);     // 時計表示は常に更新