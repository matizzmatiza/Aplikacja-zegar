const removeLoader = () => {
    setTimeout(() => {
        const loader = document.querySelector(".loader");
        loader.classList.add("deactivated");
    }, 250)
}