// Sistema de Datas - Pegando a data atual
const dataAtual = new Date();
const mesDoAno = dataAtual.getMonth() + 1;
const diaDoMes = dataAtual.getDate();
let diaFormatado = diaDoMes < 10 ? '0' + diaDoMes : diaDoMes;
let mesFormatado = mesDoAno < 10 ? '0' + mesDoAno : mesDoAno; 7
let dataFormatadaFinal = diaFormatado + '/' + mesFormatado;
