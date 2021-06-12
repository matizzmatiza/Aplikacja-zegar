// działanie zegara cyfrowego
const digitalClockControl = () =>  {
    const digitalHours = document.querySelector(".digital-hours");
    const digitalMinutes = document.querySelector(".digital-minutes");
    const digitalSeconds = document.querySelector(".digital-seconds");
    setInterval(() => {
        let day = new Date();
        let h = day.getHours();
        let m = day.getMinutes();
        let s = day.getSeconds();
        if(h < 10) {
            digitalHours.innerHTML = "0" + h;
        } else {
            digitalHours.innerHTML = h;
        }
        if(m < 10) {
            digitalMinutes.innerHTML = "0" + m;
        } else {
            digitalMinutes.innerHTML = m;
        }
        if(s < 10) {
            digitalSeconds.innerHTML = "0" + s;
        } else {
            digitalSeconds.innerHTML = s;
        }
    }, 1000)
}

// animacja dwukropka
const colonControl = () => {
    const colon1 = document.querySelector(".colon1");
    const colon2 = document.querySelector(".colon2");
    const digitalClock = document.querySelector(".digital-clock");
    let loading = document.createElement("div");
    loading.classList.add("digital-loading");
    loading.innerHTML = "Wczytywanie..."
    digitalClock.appendChild(loading);
    setTimeout(() => {
        setInterval(() => {
            if(colon1.classList.contains("show-colon")) {
                colon1.classList.toggle("show-colon");
                colon2.classList.toggle("show-colon");
            }else {
                colon1.classList.toggle("show-colon");
                colon2.classList.toggle("show-colon");
            }
        }, 500)
    }, 500)
    setTimeout(() => {
        loading.remove();
    }, 1000)
}