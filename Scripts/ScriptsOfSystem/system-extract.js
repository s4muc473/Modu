// SISTEMA DE MOVIMENTAÇÕES
const sectionHistory = document.querySelector(".section-history");

// Acessando cards de movimento na localStorage
let cards = JSON.parse(localStorage.getItem("cards") || "[]").reverse();

window.addEventListener("load",function(){
    showMoviment();
});

// F: salvando movimentação
function saveMoviment() {
    cards.unshift({
        tipo: localStorage.tipo,
        fundo: nameOfFund.textContent,
        motivo: inputMotivo.value,
        valor: Number(inputValor.value),
        data: dataFormatadaFinal,
    });
    localStorage.setItem("cards", JSON.stringify(cards));
}

// Carregando movimentação no historico
function showMoviment() {
    if (cards == '' || cards == 'undefined') {
        sectionHistory.innerHTML = '<div style="margin-bottom: 2vh;">Nenhuma Movimentação realizada.</div>';
    } else {
        for (let iterador = 0; iterador < cards.length; iterador++) {
            let content = document.createElement('div');
            let nameAndDateBox = document.createElement('div');
            let nameFund = document.createElement('h4');
            let valorBox = document.createElement('h3');
            let valor = document.createElement('p');
            let motivo = document.createElement('p');
            let data = document.createElement('p');
    
            content.setAttribute('class','content');
            content.style.backgroundColor = cards[iterador]['tipo'];
    
            nameFund.setAttribute('id','nameFundOfMoviment');
            nameFund.textContent = cards[iterador]['fundo'];
    
            data.setAttribute('id','dateOfMoviment')
            data.textContent = cards[iterador]['data'];
    
            valorBox.textContent = "R$ ";
            valor.setAttribute('id','valorOfMoviment');
            valor.textContent = parseFloat(cards[iterador]['valor']).toFixed(2);
    
            motivo.setAttribute('id','causeMoviment');
            motivo.textContent = cards[iterador]['motivo'];
    
            sectionHistory.appendChild(content);
            content.appendChild(nameAndDateBox);
            nameAndDateBox.appendChild(nameFund);
            nameAndDateBox.appendChild(data);
            content.appendChild(valorBox);
            valorBox.appendChild(valor);
            content.appendChild(motivo);
        }
    }

}