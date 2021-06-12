const controlOptionsMenu = () => {
    const menuBtn = document.querySelector(".settingsBtn")
    const menu = document.querySelector(".options-menu");
    // pokaz/ukryj menu
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
        menuBtn.classList.toggle("rotate");
    })

    const clockBtn = document.querySelector(".clock-btn");
    const digitalClock = document.querySelector(".digital-clock");
    const analogClock = document.querySelector(".analog-clock");
    const addSecondsBtn = document.querySelector(".add-seconds-btn");
    const handsBtn = document.querySelector(".hands-btn");
    const analogShieldBtn = document.querySelector(".analog-shield-btn");
    const digitalShieldBtn = document.querySelector(".digital-shield-btn");

    // zmiana zegara
    const changeClock = () => {
        if(analogClock.classList.contains("active")) {
            analogClock.classList.remove("active");
            digitalClock.classList.add("active");
            addSecondsBtn.classList.remove("deactivated")
            handsBtn.classList.add("deactivated");
            analogShieldBtn.classList.add("deactivated");
            digitalShieldBtn.classList.remove("deactivated");
            clockBtn.innerHTML = "Analogowy";
            Cookies.set("clock", "digital");
            getInfo("Zmieniono na cyfrowy.");
        } else {
            analogClock.classList.add("active");
            digitalClock.classList.remove("active");
            addSecondsBtn.classList.add("deactivated")
            handsBtn.classList.remove("deactivated");
            analogShieldBtn.classList.remove("deactivated");
            digitalShieldBtn.classList.add("deactivated");
            clockBtn.innerHTML = "Cyfrowy";
            Cookies.set("clock", "analog");
            getInfo("Zmieniono na analogowy.");
        }
    }
    clockBtn.addEventListener("click", changeClock);

    const colon = document.querySelector(".colon2");
    const digitalSeconds = document.querySelector(".digital-seconds");
    // dodawanie/usuwanie sekund
    const addSec = () => {
        if(digitalSeconds.classList.contains("deactivated")) {
            digitalClock.classList.add("resize");
            setTimeout(() => {
                colon.classList.remove("deactivated");
                addSecondsBtn.innerHTML = "-sekundy";
                digitalSeconds.classList.remove("deactivated");
            }, 300);
            Cookies.set("seconds", "on");
            getInfo("Dodano sekundy.");
        }else {
            addSecondsBtn.innerHTML = "+sekundy";
            digitalSeconds.classList.add("deactivated");
            digitalClock.classList.remove("resize");
            colon.classList.add("deactivated");
            Cookies.set("seconds", "off");
            getInfo("Sekundy zostały usunięte.");
        }
    }
    addSecondsBtn.addEventListener("click", addSec);

    //otwarcie menu sterowania wskazówkami
    const labels = [...document.querySelectorAll(".label")];
    const chooseHand = document.querySelector("#choose-hand");
    const chooseHandColor = document.querySelector("#choose-hand-color");
    const lengthWidthDivs = [...document.querySelectorAll(".lengthWidth")];
    const sizer = document.querySelector("#sizer");
    const defaultBtn = document.querySelector(".default");
    const chooseDotColor = document.querySelector("#choose-dot-color");
    const goBack = document.querySelector(".go-back");

    const handsControl = () => {
        menu.classList.add("resize-hands");
        setTimeout(() => {
            handsBtn.classList.add("deactivated");
            clockBtn.classList.add("deactivated");
            analogShieldBtn.classList.add("deactivated");
        }, 100);
        setTimeout(() => {
            labels.forEach(el => {
                el.classList.remove("deactivated");
            })
            chooseHand.classList.remove("deactivated");
            chooseHandColor.classList.remove("deactivated");
            lengthWidthDivs.forEach(el => {
                el.classList.remove("deactivated");
            })
            sizer.classList.remove("deactivated");
            chooseDotColor.classList.remove("deactivated");
            defaultBtn.classList.remove("deactivated");
            goBack.classList.remove("deactivated");
        }, 300);
    }
    handsBtn.addEventListener("click", handsControl);

    // zamkniecie menu sterowania wskazowkami
    const handsControlHide = () => {
        labels.forEach(el => {
            el.classList.add("deactivated");
        })
        chooseHand.classList.add("deactivated");
        chooseHandColor.classList.add("deactivated");
        lengthWidthDivs.forEach(el => {
            el.classList.add("deactivated");
        })
        sizer.classList.add("deactivated");
        chooseDotColor.classList.add("deactivated");
        defaultBtn.classList.add("deactivated");
        goBack.classList.add("deactivated");
        setTimeout(() => {
            menu.classList.remove("resize-hands");
        }, 100);
        setTimeout(() => {
            analogShieldBtn.classList.remove("deactivated");
            handsBtn.classList.remove("deactivated");
            clockBtn.classList.remove("deactivated");
        }, 300);
    }
    goBack.addEventListener("click", handsControlHide);

    // pobieranie wartości z selecta
    const getValue = e => {
        chosenHand = e.target.value;
    }
    chooseHand.addEventListener("change", getValue);

    // sprawdzanie wybranej wskazówki
    let chosenHand = "s";
    const checkHand = e => {
        if(chosenHand == "s") {
            return "s";
        } else if(chosenHand == "m") {
            return "m";
        } else if(chosenHand == "h") {
            return "h";
        }
    }

    // zmienianie koloru danej wskazówki
    const hourHand = document.querySelector(".hour-hand");
    const minuteHand = document.querySelector(".minute-hand");
    const secondHand = document.querySelector(".second-hand");
    const secondHandExtension = document.querySelector(".second-hand-extension");

    const setHandColor = e => {
    if(checkHand(e) == "s") {
        secondHand.style.backgroundColor = e.target.value;
        secondHandExtension.style.backgroundColor = e.target.value;
        Cookies.set('s', e.target.value);
    } else if(checkHand(e) == "m") {
        minuteHand.style.backgroundColor = e.target.value;
        Cookies.set('m', e.target.value);
    } else if(checkHand(e) == "h") {
        hourHand.style.backgroundColor = e.target.value;
        Cookies.set('h', e.target.value);
    }
    getInfo("Kolor został zmieniony.");
    }
    chooseHandColor.addEventListener("change", setHandColor);

    // zmienianie koloru kropki
    const dot = document.querySelector(".dot");
    const setDotColor = e => {
        dot.style.backgroundColor = e.target.value;
        Cookies.set('d', e.target.value);
        getInfo("Kolor został zmieniony.");
    }
    chooseDotColor.addEventListener("change", setDotColor);

    let sl = 245;
    let ml = 185;
    let hl = 110;
    let sw = 2;
    let mw = 4;
    let hw = 6;

    // zwiększanie długości danej wskazówki
    const lengthPlus = document.querySelector(".length-plus");

    lengthPlus.addEventListener("click", e => {
        if(checkHand(e) == "s") {
        if(sl >= 296 || sl + Number(sizer.value) >= 296) {
            getInfo("Nie możesz więcej powiększyć!");
        } else {
            sl += Number(sizer.value);
            secondHand.style.height = sl + "px";
            Cookies.set("sl", sl);
        }
        } else if(checkHand(e) == "m") {
        if(ml >= 296 || ml + Number(sizer.value) >= 296) {
            getInfo("Nie możesz więcej powiększyć!");
        } else {
            ml += Number(sizer.value);
            minuteHand.style.height = ml + "px";
            Cookies.set("ml", ml);
        }
        } else if(checkHand(e) == "h") {
        if(hl >= 296 || hl + Number(sizer.value) >= 296) {
            getInfo("Nie możesz więcej powiększyć!");
        } else {
            hl += Number(sizer.value);
            hourHand.style.height = hl + "px";
            Cookies.set("hl", hl);
        }
        }
    })

    // zmniejszanie długości danej wskazówki
    const lengthMinus = document.querySelector(".length-minus");

    lengthMinus.addEventListener("click", e => {
    if(checkHand(e) == "s") {
        if(sl <= 0 || sl + sizer.value <= 0) {
        getInfo("Nie możesz więcej zmniejszyć!");
        } else {
        sl -= Number(sizer.value);
        secondHand.style.height = sl + "px";
        Cookies.set("sl", sl);
        }
    } else if(checkHand(e) == "m") {
        if(ml <= 0 || ml + sizer.value <= 0) {
        getInfo("Nie możesz więcej zmniejszyć!");
        } else {
        ml -= Number(sizer.value);
        minuteHand.style.height = ml + "px";
        Cookies.set("ml", ml);
        }
    } else if(checkHand(e) == "h") {
        if(hl <= 0 || hl + sizer.value <= 0) {
        getInfo("Nie możesz więcej zmniejszyć!");
        } else {
        hl -= Number(sizer.value);
        hourHand.style.height = hl + "px";
        Cookies.set("hl", hl);
        }
    }
    })

    // zwiększanie szerokości danej wskazówki
    const widthPlus = document.querySelector(".width-plus");

    widthPlus.addEventListener("click", e => {
    if(checkHand(e) == "s") {
        if(sw >= 16 || sw + Number(sizer.value) >= 16) {
        getInfo("Nie możesz bardziej poszerzyć!")
        } else {
        sw += Number(sizer.value);
        secondHand.style.width = sw + "px";
        Cookies.set("sw", sw);
        }
    } else if(checkHand(e) == "m") {
        if(mw >= 16 || mw + Number(sizer.value) >= 16) {
        getInfo("Nie możesz bardziej poszerzyć!")
        } else {
        mw += Number(sizer.value);
        minuteHand.style.width = mw + "px";
        Cookies.set("mw", mw);
        }
    } else if(checkHand(e) == "h") {
        if(hw >= 16 || hw + Number(sizer.value) >= 16) {
        getInfo("Nie możesz bardziej poszerzyć!")
        } else {
        hw += Number(sizer.value);
        hourHand.style.width = hw + "px";
        Cookies.set("hw", hw);
        }
    }
    })

    // zmniejszanie szerokości danej wskazówki
    const widthMinus = document.querySelector(".width-minus");

    widthMinus.addEventListener("click", e => {
    if(checkHand(e) == "s") {
        if(sw <= 0 || sw + Number(sizer.value) <= 0) {
        getInfo("Nie możesz bardziej skurczyć!")
        } else {
        sw -= Number(sizer.value);
        secondHand.style.width = sw + "px";
        Cookies.set("sw", sw);
        }
    } else if(checkHand(e) == "m") {
        if(mw <= 0 || mw + Number(sizer.value) <= 0) {
        getInfo("Nie możesz bardziej skurczyć!")
        } else {
        mw -= Number(sizer.value);
        minuteHand.style.width = mw + "px";
        Cookies.set("mw", mw);
        }
    } else if(checkHand(e) == "h") {
        if(mw <= 0 || mw + Number(sizer.value) <= 0) {
        getInfo("Nie możesz bardziej skurczyć!")
        } else {
        hw -= Number(sizer.value);
        hourHand.style.width = hw + "px";
        Cookies.set("hw", hw);
        }
    }
    })

    const goToDefault = () => {
        secondHand.style.width = 2 + "px";
        Cookies.set("sw", 2);
        minuteHand.style.width = 4 + "px";
        Cookies.set("mw", 4);
        hourHand.style.width = 6 + "px";
        Cookies.set("hw", 6);
        secondHand.style.height = 245 + "px";
        Cookies.set("sl", 245);
        minuteHand.style.height = 185 + "px";
        Cookies.set("ml", 185);
        hourHand.style.height = 110 + "px";
        Cookies.set("hl", 110);
        minuteHand.style.backgroundColor = "";
        Cookies.set('m', "");
        secondHand.style.backgroundColor = "";
        secondHandExtension.style.backgroundColor = "";
        Cookies.set('s', "");
        hourHand.style.backgroundColor = "";
        Cookies.set('h', "");
        dot.style.backgroundColor = "";
        Cookies.set('d', "");
        getInfo("Przywrócono ustawienia domyślne.");
    }
    defaultBtn.addEventListener("click", goToDefault);

    // tarcza 
    const labels2 = [...document.querySelectorAll(".label2")];
    const chooseAnalogColorShield = document.querySelector("#choose-analog-color-shield");
    const chooseAnalogBorderColor = document.querySelector("#choose-analog-border-color");
    const chooseLines = document.querySelector("#choose-lines");
    const chooseLinesColor = document.querySelector("#choose-lines-color");
    const chooseNumbers = document.querySelector("#choose-numbers");
    const chooseNumbersColor = document.querySelector("#choose-numbers-color");
    const goBack2 = document.querySelector(".go-back2");
    const default2 = document.querySelector(".default2");
    // otwarcie opcji tarczy zegara analogowego
    const openAnalogShieldControl = () => {
        menu.classList.add("resize-analog-shield");
        setTimeout(() => {
            handsBtn.classList.add("deactivated");
            clockBtn.classList.add("deactivated");
            analogShieldBtn.classList.add("deactivated");
        }, 100);
        setTimeout(() => {
            labels2.forEach(e => {
                e.classList.remove("deactivated");
            })
            chooseAnalogColorShield.classList.remove("deactivated");
            chooseAnalogBorderColor.classList.remove("deactivated");
            chooseLines.classList.remove("deactivated");
            chooseLinesColor.classList.remove("deactivated");
            chooseNumbers.classList.remove("deactivated");
            chooseNumbersColor.classList.remove("deactivated");
            default2.classList.remove("deactivated");
            goBack2.classList.remove("deactivated");
        }, 300);
    }
    analogShieldBtn.addEventListener("click", openAnalogShieldControl);

    // zamkniecie opcji tarczy zegara analogowego
    const closeAnalogShieldControl = () => {
        labels2.forEach(e => {
            e.classList.add("deactivated");
        })
        chooseAnalogColorShield.classList.add("deactivated");
        chooseAnalogBorderColor.classList.add("deactivated");
        chooseLines.classList.add("deactivated");
        chooseLinesColor.classList.add("deactivated");
        chooseNumbers.classList.add("deactivated");
        chooseNumbersColor.classList.add("deactivated");
        default2.classList.add("deactivated");
        goBack2.classList.add("deactivated");
        setTimeout(() => {
            menu.classList.remove("resize-analog-shield");
        }, 100);
        setTimeout(() => {
            handsBtn.classList.remove("deactivated");
            clockBtn.classList.remove("deactivated");
            analogShieldBtn.classList.remove("deactivated");
        }, 300);
    }
    goBack2.addEventListener("click", closeAnalogShieldControl);

    // zmienianie koloru tarczy zegara analogowego
    const analogShield = document.querySelector(".analog-clock");
    const changeAnalogColorShield = e => {
        analogShield.style.backgroundColor = e.target.value;
        Cookies.set("asc", e.target.value);
        getInfo("Kolor został zmieniony.");
    }
    chooseAnalogColorShield.addEventListener("change", changeAnalogColorShield);

    // zmienanie koloru obramowania tarczy zegara analogowego
    const changeAnalogBorderColor = e => {
        analogShield.style.borderColor = e.target.value;
        Cookies.set("abc", e.target.value);
        getInfo("Kolor został zmieniony.");
    }
    chooseAnalogBorderColor.addEventListener("change", changeAnalogBorderColor);

    // zmienianie koloru danych kresek
    const lines = [...document.getElementsByClassName("line")];
    const changeLinesColor = () => {
        switch(chooseLines.value) {
            case "all":
                lines.forEach(el => {
                    el.style.color = chooseLinesColor.value;
                })
                Cookies.set("lall", "all");
                Cookies.set("lallc", chooseLinesColor.value);
                break;
            case "every5":
                lines[4].style.color = chooseLinesColor.value;
                for(let i = 9; i < lines.length; i += 5) {
                    lines[i].style.color = chooseLinesColor.value;
                }
                Cookies.set("le5", "every5");
                Cookies.set("le5c", chooseLinesColor.value);
                break;
        }
        getInfo("Kolor został zmienony.");
    }
    chooseLinesColor.addEventListener("change",changeLinesColor);

    // zmienianie koloru danych cyfr
    const numbers = [...document.getElementsByClassName("number")];
    const changeNumbersColors = () => {
        switch(chooseNumbers.value) {
            case "all":
                numbers.forEach(el => {
                    el.style.color = chooseNumbersColor.value;
                })
                Cookies.set("nall", "all");
                Cookies.set("nallc", chooseNumbersColor.value);
                for(let i = 0; i < numbers.length; i++) {
                    Cookies.set(`nc${i}`, "");
                }
                break;
            default:
                for(let i = 0; i < numbers.length; i++) {
                    if(i == chooseNumbers.value) {
                        numbers[i].style.color = chooseNumbersColor.value;
                        Cookies.set(`n${i}`, i);
                        Cookies.set(`nc${i}`, chooseNumbersColor.value);
                    }
                }
        }
        getInfo("Kolor został zmieniony.");
    }
    chooseNumbersColor.addEventListener("change", changeNumbersColors);

    // przywracanie ustawien domyslnych dla opcji tarczy zegara analogowego
    const goToDefault2 = () => {
        analogShield.style.backgroundColor = "";
        Cookies.set("asc", "");
        analogShield.style.borderColor = "";
        Cookies.set("abc", "");
        lines.forEach(el => {
            el.style.color = "";
        })
        Cookies.set("le5c", "");
        Cookies.set("lallc", "");
        numbers.forEach(el => {
            el.style.color = "";
        })
        Cookies.set("nallc", "");
        for(let i = 0; i < numbers.length; i++) {
            if(`${i}` == Cookies.get(`n${i}`)) {
                numbers[i].style.color = "";
                Cookies.set(`nc${i}`, "");
            }
        }
        getInfo("Przywrócono ustawienia domyślne.");
    }
    default2.addEventListener("click", goToDefault2);

    // otwarcie opcji tarczy zegara cyfrowego
    const labels3 = [...document.getElementsByClassName("label3")];
    const chooseDigitalColorShield = document.querySelector("#choose-digital-color-shield");
    const chooseDigitalBorderColor = document.querySelector("#choose-digital-border-color");
    const chooseDigitalNumbers = document.querySelector("#choose-digital-numbers");
    const chooseDigitalNumbersColor = document.querySelector("#choose-digital-numbers-color");
    const chooseColon = document.querySelector("#choose-colon");
    const chooseColonColor = document.querySelector("#choose-colon-color");
    const default3 = document.querySelector(".default3");
    const goBack3 = document.querySelector(".go-back3");

    const openDigitalShieldControl = () => {
        menu.classList.add("resize-digital-shield");
        setTimeout(() => {
            addSecondsBtn.classList.add("deactivated");
            clockBtn.classList.add("deactivated");
            digitalShieldBtn.classList.add("deactivated");
        }, 100);
        setTimeout(() => {
            labels3.forEach(e => {
                e.classList.remove("deactivated");
            })
            chooseDigitalColorShield.classList.remove("deactivated");
            chooseDigitalBorderColor.classList.remove("deactivated");
            chooseDigitalNumbers.classList.remove("deactivated");
            chooseDigitalNumbersColor.classList.remove("deactivated");
            chooseColon.classList.remove("deactivated");
            chooseColonColor.classList.remove("deactivated");
            default3.classList.remove("deactivated");
            goBack3.classList.remove("deactivated");
        }, 300);
    }
    digitalShieldBtn.addEventListener("click", openDigitalShieldControl);

    // zamkniecie opcji tarczy zegara cyfrowego
    const closeDigitalShieldControl = () => {
        labels3.forEach(e => {
            e.classList.add("deactivated");
        })
        chooseDigitalColorShield.classList.add("deactivated");
        chooseDigitalBorderColor.classList.add("deactivated");
        chooseDigitalNumbers.classList.add("deactivated");
        chooseDigitalNumbersColor.classList.add("deactivated");
        chooseColon.classList.add("deactivated");
        chooseColonColor.classList.add("deactivated");
        default3.classList.add("deactivated");
        goBack3.classList.add("deactivated");
        setTimeout(() => {
            menu.classList.remove("resize-digital-shield");
        }, 100);
        setTimeout(() => {
            addSecondsBtn.classList.remove("deactivated");
            clockBtn.classList.remove("deactivated");
            digitalShieldBtn.classList.remove("deactivated");
        }, 300);
    }
    goBack3.addEventListener("click", closeDigitalShieldControl);

    const colon1 = document.querySelector(".colon1");
    const colon2 = document.querySelector(".colon2");

    // zmiana koloru tarczy zegara cyfrowego
    const chnageDigitalColorShield = e => {
        digitalClock.style.backgroundColor = e.target.value;
        Cookies.set("dcs", e.target.value);
        getInfo("Kolor został zmieniony.");
    }
    chooseDigitalColorShield.addEventListener("change", chnageDigitalColorShield);

    // zmiana koloru obramowania zegara cyfrowego
    const changeDigitalBorderColor = e => {
        digitalClock.style.borderColor = e.target.value;
        Cookies.set("dbc", e.target.value);
        getInfo("Kolor został zmieniony.");
    }
    chooseDigitalBorderColor.addEventListener("change", changeDigitalBorderColor);

    // zmienianie koloru danych cyfr
    const digitalHours = document.querySelector(".digital-hours");
    const digitalMinutes = document.querySelector(".digital-minutes");
    const changeDigitalNumbersColor = e => {
        switch(chooseDigitalNumbers.value) {
            case "all":
                digitalHours.style.color = e.target.value;
                Cookies.set("dhc", e.target.value);
                digitalMinutes.style.color = e.target.value;
                Cookies.set("dmc", e.target.value);
                digitalSeconds.style.color = e.target.value;
                Cookies.set("dsc", e.target.value);
                break;
            case "h":
                digitalHours.style.color = e.target.value;
                Cookies.set("dhc", e.target.value);
                break;
            case "m":
                digitalMinutes.style.color = e.target.value;
                Cookies.set("dmc", e.target.value);
                break;
            case "s":
                digitalSeconds.style.color = e.target.value;
                Cookies.set("dsc", e.target.value);
                break;
        }
        getInfo("Kolor został zmieniony.");
    }
    chooseDigitalNumbersColor.addEventListener("change", changeDigitalNumbersColor);

    // zmienianie koloru danego dwukropka
    const changeColonColor = e => {
        switch(chooseColon.value) {
            case "all":
                colon1.style.color = e.target.value;
                Cookies.set("cc1", e.target.value);
                colon2.style.color = e.target.value;
                Cookies.set("cc2", e.target.value);
                break;
            case "f":
                colon1.style.color = e.target.value;
                Cookies.set("cc1", e.target.value);
                break;
            case "s":
                colon2.style.color = e.target.value;
                Cookies.set("cc2", e.target.value);
                break;
        }
        getInfo("Kolor został zmieniony.");
    }
    chooseColonColor.addEventListener("change", changeColonColor);

    // przywracanie ustawien domyslnych w zegarze cyfrowym
    const goToDefault3 = () => {
        digitalClock.style.backgroundColor = "";
        digitalClock.style.borderColor = "";
        digitalHours.style.color = "";
        digitalMinutes.style.color = "";
        digitalSeconds.style.color = "";
        colon1.style.color = "";
        colon2.style.color = "";
        digitalClock.style.backgroundColor = Cookies.set("dcs", "");
        digitalClock.style.borderColor = Cookies.set("dbc", "");
        digitalHours.style.color = Cookies.set("dhc", "");
        digitalMinutes.style.color = Cookies.set("dmc", "");
        digitalSeconds.style.color = Cookies.set("dsc", "");
        colon1.style.color = Cookies.set("cc1", "");
        colon2.style.color = Cookies.set("cc2", "");
        getInfo("Przywrócono ustawienia domyślne.");
    }
    default3.addEventListener("click", goToDefault3);

    // wczytanie zapisanych opcji
    const savedSettings = () => {
        secondHand.style.height = Cookies.get("sl") + "px";
        minuteHand.style.height = Cookies.get("ml") + "px";
        hourHand.style.height = Cookies.get("hl") + "px";
        secondHand.style.width = Cookies.get("sw") + "px";
        minuteHand.style.width = Cookies.get("mw") + "px";
        hourHand.style.width = Cookies.get("hw") + "px";
        secondHand.style.backgroundColor = Cookies.get("s");
        secondHandExtension.style.backgroundColor = Cookies.get("s");
        minuteHand.style.backgroundColor = Cookies.get("m");
        hourHand.style.backgroundColor = Cookies.get("h");
        dot.style.backgroundColor = Cookies.get("d");
        analogShield.style.backgroundColor = Cookies.get("asc");
        analogShield.style.borderColor = Cookies.get("abc");
        digitalClock.style.backgroundColor = Cookies.get("dcs");
        digitalClock.style.borderColor = Cookies.get("dbc");
        digitalHours.style.color = Cookies.get("dhc");
        digitalMinutes.style.color = Cookies.get("dmc");
        digitalSeconds.style.color = Cookies.get("dsc");
        colon1.style.color = Cookies.get("cc1");
        colon2.style.color = Cookies.get("cc2");
        if(Cookies.get("clock") == "digital") {
            changeClock();
        }
        if(Cookies.get("seconds") == "on") {
            addSec();
        }
        if(Cookies.get("lall") == "all") {
            lines.forEach(el => {
                el.style.color = Cookies.get("lallc");
            })
        }
        if(Cookies.get("le5") == "every5") {
            lines[4].style.color = Cookies.get("le5c");
            for(let i = 9; i < lines.length; i += 5) {
                lines[i].style.color = Cookies.get("le5c");
            }
        }
        if(Cookies.get("nall") == "all") {
            numbers.forEach(el => {
                el.style.color = Cookies.get("nallc");
            })
        }
        for(let i = 0; i < numbers.length; i++) {
            if(`${i}` == Cookies.get(`n${i}`)) {
                if(Cookies.get(`nc${i}`) != "") {
                    numbers[i].style.color = Cookies.get(`nc${i}`);
                }
            }
        }
    }

    savedSettings();
}