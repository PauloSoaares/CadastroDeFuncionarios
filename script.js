const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] // pegando os itens do banco 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) // setando os itens no BD

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    }) // carregando os dados do BD quando a pagina for carregada 
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${item.salario}</td>
        <td class= "acao">
            <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class=' bx bx-trash'></i></button>
        </td>
    `
    //criando os itens na tabela html 
    tbody.appendchild(tr)
}

function editItem(index) {

    openModal(true, index)
} // chamando a função "openModal"

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active') // modal visivel

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        } // display none
    }

    if (edit) {
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    }   else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario. value = ''
    }
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
    }

    e.preventDefault();

    if
}