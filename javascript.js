var w = 0,
    d = 100,
    st = false,
    pos = [0, 1, 2, 3, 4, 5, 7, 9, 11, 17, 16, 15, 14, 13, 12, 10, 8, 6],
    p = Math.floor(Math.random() * pos.length),
    vel = 200,
    pi, be = 0,
    mdm = "https://www.sessiontown.com/games/keyboard/piano//",
    sounds = {
        "t1": new Audio(mdm + "f3.mp3"),
        "t2": new Audio(mdm + "g3.mp3"),
        "t3": new Audio(mdm + "a3.mp3"),
        "t4": new Audio(mdm + "b3.mp3"),
        "t5": new Audio(mdm + "c4.mp3"),
        "t6": new Audio(mdm + "d4.mp3"),
        "t7": new Audio(mdm + "e4.mp3"),
        "t8": new Audio(mdm + "f4.mp3"),
        "t9": new Audio(mdm + "g4.mp3"),
        "t10": new Audio(mdm + "a4.mp3"),
        "t11": new Audio(mdm + "b4.mp3"),
        "t12": new Audio(mdm + "b6.mp3")
    },
    cso = 1,
    init = false;

function playgame() {
    var counts = document.querySelectorAll(".mul");
    if (vel == 200) {
        for (var c = 0; c < counts.length; c++) {
            if (counts[c].innerText > 0) break;
            if (c == counts.length - 1) {
                alert("You have not bet");
                return;
            }
        }
        pi = setInterval(playgame, vel);
        st = true;
        document.getElementById("play").setAttribute("onclick", "");
        cso = 1;
        init = true;
    }
    var cs = document.getElementsByTagName("span");
    if (p == cs.length) p = 0;
    for (var c = 0; c < cs.length; c++) {
        cs[c].style.textShadow = "";
        cs[c].style.boxShadow = "";
    }
    cs[pos[p]].style.textShadow = "0px 0px 39px red";
    cs[pos[p]].style.boxShadow = "0px 0px 9px 3px red";
    sounds["t11"].play();
    sounds["t11"].currentTime = 0;
    if (vel == 190 && init) {
        init = false;
        clearInterval(pi);
        vel -= 30;
        pi = setInterval(playgame, vel - 60);
    }
    if (vel == 180 && !init) {
        clearInterval(pi);
        pi = setInterval(playgame, vel);
    }
    if (vel == 190 && !init) {
        var again = false;
        switch (cs[pos[p]].innerText) {
            case "🍒":
                w = parseInt(counts[0].innerText) * 10;
                break;
            case "🍎":
                w = parseInt(counts[1].innerText) * 20;
                break;
            case "🍊":
                w = parseInt(counts[2].innerText) * 30;
                break;
            case "🍈":
                w = parseInt(counts[3].innerText) * 40;
                break;
            case "🍉":
                w = parseInt(counts[4].innerText) * 50;
                break;
            case "🔔":
                w = parseInt(counts[5].innerText) * 60;
                break;
            case "🎰":
                w = parseInt(counts[6].innerText) * 70;
                break;
            case "🌟":
                w = parseInt(counts[7].innerText) * 80;
                break;
            case "🔥":
                w = parseInt(counts[8].innerText) * 100;
                break;
            case "💣":
                w = parseInt(counts[9].innerText) * 200;
                break;
            default:
                again = true;
        }
        if (!again) {
            vel = 199;
            clearInterval(pi);
            document.getElementById("w").innerText = (w < 10000) ? (w < 1000) ? (w < 100) ? (w < 10) ? "0000" + w : "000" + w : "00" + w : "0" + w : w;
            d += w;
            w = 0;
            document.getElementById("d").innerText = (d < 10000) ? (d < 1000) ? (d < 100) ? (d < 10) ? "0000" + d : "000" + d : "00" + d : "0" + d : d;
            st = false;
            document.getElementById("play").setAttribute("onclick", "playgame()");
            for (var c = 0; c < counts.length; c++) {
                counts[c].innerText = "0";
                counts[c].style.color = "red";
            }
            p = Math.floor(Math.random() * pos.length) - 1;
            if (d == 0) alert("You have lost!");
        } else {
            vel = 179;
        }
    }
    p++;
    if (init) vel--;
    else vel++;
}

function bet(b) {
    if (st) return;
    document.getElementById("w").innerText = "00000";
    if (d > 0) {
        if (cso == 13) cso = 1;
        sounds["t" + cso].play();
        sounds["t" + cso++].currentTime = 0;
        be += 10;
        d -= 10;
        document.getElementById("d").innerText = (d < 10000) ? (d < 1000) ? (d < 100) ? (d < 10) ? "0000" + d : "000" + d : "00" + d : "0" + d : d;
        var psi = (b.innerText == "🍒") ? 0 : (b.innerText == "🍎") ? 1 : (b.innerText == "🍊") ? 2 : (b.innerText == "🍈") ? 3 : (b.innerText == "🍉") ? 4 : (b.innerText == "🔔") ? 5 : (b.innerText == "🎰") ? 6 : (b.innerText == "🌟") ? 7 : (b.innerText == "🔥") ? 8 : 9;
        var counts = document.querySelectorAll(".mul");
        counts[psi].innerText = parseInt(counts[psi].innerText) + 1;
        counts[psi].style.color = "orange";
    } else alert("you have no money");
}