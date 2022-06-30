const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sServico = document.querySelector('#m-servico')
const sPagar = document.querySelector('#m-pagar')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active') // modal visivel

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        } // display none
    }

    if (edit) {
        sNome.value = itens[index].nome
        sServico.value = itens[index].servico
        sPagar.value = itens[index].pagar
        id = index
    }   else {
        sNome.value = ''
        sServico.value = ''
        sPagar. value = ''
    }
}

function editItem(index) {

    openModal(true, index)
} // chamando a função "openModal"

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.servico}</td>
      <td>R$ ${item.pagar}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sServico.value == '' || sPagar.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].servico = sServico.value
        itens[id].pagar = sPagar.value
    }   else {
        itens.push({'nome': sNome.value, 'servico': sServico.value, 'pagar': sPagar.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    }) // carregando os dados do BD quando a pagina for carregada 
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfuncli')) ?? [] // pegando os itens do banco 
const setItensBD = () => localStorage.setItem('dbfuncli', JSON.stringify(itens)) // setando os itens no BD

loadItens()