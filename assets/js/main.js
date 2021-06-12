window.addEventListener("DOMContentLoaded", () => {

    // Wyłączenie lodera
    removeLoader();

    // Generowanie cyfr na zegarze analogowym
    numbersGenerate();

    // Generowanie kresek na zegarze analogowym
    linesGenerate();

    // Sterowanie wskazówkami (zegar analogowy)
    clockHandsControl();

    // Sterowanie cyframi (zegar cyfrowy)
    digitalClockControl();

    // Sterowanie dwukropkiem w zegarze cyfrowym
    colonControl();

    // Kontrola menu
    controlOptionsMenu();

})