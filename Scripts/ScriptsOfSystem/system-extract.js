// SISTEMA DE MOVIMENTAÇÕES
const boxOfProhibited = document.querySelector("#box-of-prohibited");
const boxOfExit = document.querySelector("#box-of-exit");
const boxOfBalance = document.querySelector("#box-of-balance");

let financeOfDates = {
    prohibited: 0,
    balance: 0,
    exit: 0,
}

localDate = JSON.parse(localStorage.getItem("financeOfDates") || JSON.stringify(financeOfDates));

function showFinanceDates() {
    boxOfBalance.innerHTML = `R$ ${localDate.balance},00`;
    boxOfProhibited.innerHTML = `R$ ${localDate.prohibited},00`;
    boxOfExit.innerHTML = `R$ ${localDate.exit},00`;
}

function dataCalculation(type) {
    let prohibited = localDate.prohibited;
    let balance = localDate.balance;
    let exit = localDate.exit;

    let valor = inputValor.value;

    if (type == "prohibited") {
        prohibited += Number(valor);
        console.log(prohibited)
        balance = prohibited - exit;

        localDate.prohibited = prohibited;
        localDate.balance = balance;

    } else if (type == "exit") {
        exit += Number(valor);
        balance = prohibited - exit;

        localDate.exit = exit;
        localDate.balance = balance;
    }
    localStorage.setItem("financeOfDates",JSON.stringify(localDate))

    boxOfBalance.innerHTML = `R$ ${balance},00`;
    boxOfProhibited.innerHTML = `R$ ${prohibited},00`;
    boxOfExit.innerHTML = `R$ ${exit},00`;
}


// Acessando cards de movimento na localStorage
let cards = JSON.parse(localStorage.getItem("cards") || "[]");

window.addEventListener("load",function(){
    showMoviment();
});

// F: salvando movimentação
function saveMoviment(tipo,fundo,motivo,valor) {
    // cards.unshift({
    //     tipo: localStorage.tipo,
    //     fundo: nameOfFund.textContent,
    //     motivo: inputMotivo.value,
    //     valor: Number(inputValor.value),
    //     data: dataFormatadaFinal,
    // });
    cards.unshift({
        tipo: tipo,
        fundo: fundo,
        motivo: motivo,
        valor: valor,
        data: dataFormatadaFinal,
    });
    localStorage.setItem("cards", JSON.stringify(cards));
}

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