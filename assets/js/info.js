let down = 0;
const getInfo = text => {
    const body = document.body;
    const optionsMenu = document.querySelector(".options-menu");
    let infoEl = document.createElement("div");
    infoEl.classList.add("info");
    infoEl.innerHTML = text;
    optionsMenu.appendChild(infoEl);

    const infos = [...document.getElementsByClassName("info")];
    
    if(body.classList.contains("dark-bg")) {
        infos.forEach(el => {
            el.classList.add("dark-t");
            el.classList.add("dark-bg2");
        })
    }
    
    if(infos.length == 1) {
        down = 0;
    }
    
    if(infos.length >= 1) {
        down -= 40;
        infos[infos.length-1].style.bottom += down + "px";
    }

    setTimeout(() => {
        infoEl.classList.add("show-info");
      }, 100);
    setTimeout(() => {
        infoEl.classList.remove("show-info");
    }, 2000);
    setTimeout(() => {
        infoEl.remove();
    }, 2300);
}