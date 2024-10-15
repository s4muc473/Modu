let saldo = 0;
window.addEventListener('load',()=>{
    if (localStorage.saldo) {
        saldo = Number(localStorage.saldo);
        elementsDOM.saldoDOM().innerHTML = parseFloat(saldo).toFixed(2);
    } else {
        localStorage.saldo = saldo;
        elementsDOM.saldoDOM().innerHTML = localStorage.saldo;
    }
});

function acessExtracts() {
    window.location.href = "/Pages/extract.html";
}

function acessFunds() {
    window.location.href = "/Pages/funds.html";
}

function acessDivide() {
    alert("função em desenvolvimento");
}

function acessReceive() {
    alert("função em desenvolvimento");
}


function income() {
    showScreenBlack();
    elementsDOM.divIncome().style.display = "block";
}

function expense() {
    showScreenBlack();
    elementsDOM.divExpense().style.display = "block";
}

function finallyOperationIncome() {
    let value = Number(elementsDOM.inputIncomeValue().value);
    let cause = elementsDOM.inputIncomeCause().value;

    if (!value) {
        alert("informe o valor")
    } else {
        elementsDOM.divIncome().style.display = "none";


        saldo += value;
        localStorage.saldo = saldo;
        elementsDOM.saldoDOM().textContent = parseFloat(saldo).toFixed(2);

        saveMoviment("#E3B505","Saldo",cause,value);

        hideLoading();
    }
}

function finallyOperationExpense() {
    let value = Number(elementsDOM.inputExpenseValue().value)
    let cause = elementsDOM.inputExpenseCause().value;

    if (!value) {
        alert("informe o valor")
    } else {
        elementsDOM.divExpense().style.display = "none";
    
    
        saldo -= value;
        localStorage.saldo = saldo;
        elementsDOM.saldoDOM().textContent = parseFloat(saldo).toFixed(2);
    
        saveMoviment("#dadacfc7","Saldo",cause,value);
    
        hideLoading();
    }
}

function distFunds() {
    alert("Função em Desenvolvimento");
    // Listar fundos em uma pagina
    // Configurar a sua taxa
    // fazer entrada
}

const elementsDOM =  {
    saldoDOM: () => document.querySelector('#saldo'),
    divIncome: () => document.querySelector('.divIncome'),
    divExpense: () => document.querySelector('.divExpense'),
    inputIncomeValue: () => document.querySelector('#input-income'),
    inputIncomeCause: () => document.querySelector('#input-cause-income'),
    inputExpenseValue: () => document.querySelector('#input-expense'),
    inputExpenseCause: () => document.querySelector('#input-cause-expense'),
}