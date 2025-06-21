// Acessando cards de movimento na localStorage
let cards = JSON.parse(localStorage.getItem("cards") || "[]");

window.addEventListener("load",function(){
    showMoviment();
});

// F: salvando movimentação
function saveMoviment(tipo,fundo,motivo,valor) {
    cards.unshift({
        id: Date.now(),
        tipo: tipo,
        fundo: fundo,
        motivo: motivo,
        valor: valor,
        data: dataFormatadaFinal,
    });
    localStorage.setItem("cards", JSON.stringify(cards));
}

function removeExtract(id) {
    let index = cards.findIndex(x => x.id == id);
    cards.splice(index, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
    location.reload();
};

function deleteExtracts() {
    localStorage.cards = [];
    location.reload();
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
            let btnDelete = document.createElement('button');
    
            content.setAttribute('class','content');
            content.style.backgroundColor = cards[iterador]['tipo'];
    
            nameFund.setAttribute('id','nameFundOfMoviment');
            nameFund.textContent = cards[iterador]['fundo'];
    
            data.setAttribute('id','dateOfMoviment')
            data.textContent = cards[iterador]['data'];

            btnDelete.innerHTML = 'X';
            btnDelete.addEventListener('click',()=>{
                removeExtract(cards[iterador]['id']);
            })
    
            valorBox.textContent = "R$ ";
            valor.setAttribute('id','valorOfMoviment');
            valor.textContent = parseFloat(cards[iterador]['valor']).toFixed(2);
    
            motivo.setAttribute('id','causeMoviment');
            motivo.textContent = cards[iterador]['motivo'];
    
            sectionHistory.appendChild(content);
            content.appendChild(nameAndDateBox);
            nameAndDateBox.appendChild(nameFund);
            data.appendChild(btnDelete);
            nameAndDateBox.appendChild(data);
            content.appendChild(valorBox);
            valorBox.appendChild(valor);
            content.appendChild(motivo);
        }
    }

}