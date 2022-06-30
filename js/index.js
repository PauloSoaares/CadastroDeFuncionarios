const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario}</td>
    `
    tbody.appendChild(tr)
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    }) // carregando os dados do BD quando a pagina for carregada 
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc',)) ?? [] // pegando os itens do banco 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) // setando os itens no BD


loadItens()