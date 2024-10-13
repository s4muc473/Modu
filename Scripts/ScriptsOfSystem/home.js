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

function income() {
    showScreenBlack();
    elementsDOM.divIncome().style.display = "block";
}

function expense() {
    showScreenBlack();
    elementsDOM.divExpense().style.display = "block";
}

function finallyOperationIncome() {
    elementsDOM.divIncome().style.display = "none";

    let value = Number(elementsDOM.inputIncomeValue().value);
    let cause = elementsDOM.inputIncomeCause().innerHTML;

    saldo += value;
    localStorage.saldo = saldo;
    elementsDOM.saldoDOM().textContent = parseFloat(saldo).toFixed(2);

    hideLoading()
}

function finallyOperationExpense() {
    elementsDOM.divExpense().style.display = "none";

    let value = Number(elementsDOM.inputExpenseValue().value)
    let cause = elementsDOM.inputExpenseCause().innerHTML;

    saldo -= value;
    localStorage.saldo = saldo;
    elementsDOM.saldoDOM().textContent = parseFloat(saldo).toFixed(2);

    hideLoading()
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