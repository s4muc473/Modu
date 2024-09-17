// Sistema de anotações
const textAnotations = document.querySelector(".anotations");
function saveAnotation() {
    localStorage.anotation = textAnotations.value;
}

function autoSave() {
    setInterval(saveAnotation, 100);
}

function loadAnotations() {
    if (localStorage.anotation) {
        textAnotations.value = localStorage.anotation;
    } else {
        textAnotations.value = "";
    }
}

autoSave();