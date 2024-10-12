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

const elementsDOM =  {
    divIncome: () => document.querySelector('.divIncome'),
    divExpense: () => document.querySelector('.divExpense'),
}