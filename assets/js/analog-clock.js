// generowanie liczb do zegara
const numbersGenerate = () => {
const att = document.querySelector(".analog-clock .numbers");
let hours = 12, a = 0, b = 0;
    for(let i = 1; i <= hours; i++) {
        let number = document.createElement("div");
        number.classList.add("number");
        att.appendChild(number);
        number.style.transform = `translateX(-50%) rotate(${a += 30}deg)`;
        let num = document.createElement("div");
        number.appendChild(num);
        num.innerHTML = i;
        num.style.transform = `rotate(${b -= 30}deg)`;
    }
}
  
// generowanie kresek do zegara
const linesGenerate = () => {
const att = document.querySelector(".analog-clock .lines");
let lines = 60, a = 0;
    for(let i = 1; i <= lines; i++) {
        let line = document.createElement("div");
        line.classList.add("line");
        att.appendChild(line);
        line.innerHTML = "|";
        line.style.transform = `translateX(-50%) rotate(${a += 6}deg)`;
        if(i % 5 === 0) {
            line.style.fontWeight = "bold";
        }
    }
}

// sterowanie wskazówkami
const clockHandsControl = () => {
    const deg = 6;
    const hourHand = document.querySelector(".hour-hand");
    const minuteHand = document.querySelector(".minute-hand");
    const secondHand = document.querySelector(".second-hand");
    setInterval(() => {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;
        hourHand.style.transform = `translateY(-50%) rotate(${hh+(mm/12)}deg`;
        minuteHand.style.transform = `translateY(-50%) rotate(${mm}deg)`;
        secondHand.style.transform = `translateY(-50%) rotate(${ss}deg)`;
    })
}
