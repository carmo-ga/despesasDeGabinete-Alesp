import axios from "axios"

const inputNomeDeputado = document.getElementById('nome_deputado')
const selectMes = document.getElementById('meses')
const selectAno = document.getElementById('anos')
const btn_buscar = document.getElementById('btn_buscar')
const divExibeResultados = document.getElementById('exibe_resultados')
const divMensagem = document.getElementById('mensagem')

const tabelaResultado = document.createElement('table')
const cabecalhoTabela = document.createElement('thead')
const corpoTabela = document.createElement('tbody')
const linhaTitulos = document.createElement('tr')

const anoCorrente = (new Date()).getFullYear()

let mesSelecionado = 1
let anoSelecionado = anoCorrente
let nomeDeputado

function gerarAnos() {
    const op_ano = document.createDocumentFragment()

    for(let i = 2002; i <= anoCorrente; i++) {
        const option = document.createElement('option')
        option.value = i
        option.appendChild(document.createTextNode(i))
        op_ano.appendChild(option)
    }
    selectAno.appendChild(op_ano)
}


// Events
selectAno.addEventListener("load", gerarAnos())

selectMes.addEventListener("change", function pegarMes() {
    mesSelecionado = selectMes.options[selectMes.selectedIndex].value
    console.log(mesSelecionado)
})

selectAno.addEventListener("change", function pegarAno() {
    anoSelecionado = selectAno.options[selectAno.selectedIndex].value
    console.log(anoSelecionado)
})

inputNomeDeputado.addEventListener("change", function pegarNomeDeputado() {
    nomeDeputado = inputNomeDeputado.value
    console.log(nomeDeputado)
})

// async function getAllDeputados() {
//     let res = await axios.get("http://localhost:5000/deputados/50000")

//     let data = res.data
//     console.log(data)
// }

// getAllDeputados()

btn_buscar.addEventListener("click", async function getNomeAnoMes() {
    // Limpar campos
    divMensagem.innerText = ""
    for(child of tabelaResultado.childNodes) {
        child.innerText = ""
        linhaTitulos.innerText = ""
    }
    
    // Buscar dados
    let res = await axios.get(`http://localhost:5000/busca?deputado=${nomeDeputado}&ano=${anoSelecionado}&mes=${mesSelecionado}`)
    let data = res.data
    console.log(data)

    if(data.length === 0) {
        divMensagem.innerText = "Desculpe! Não há resultado para os parâmetros pesquisados."
    }
    else {
        divExibeResultados.appendChild(tabelaResultado)
        tabelaResultado.appendChild(cabecalhoTabela)
        cabecalhoTabela.appendChild(linhaTitulos)
        tabelaResultado.appendChild(corpoTabela)

        const titulo_matricula = document.createElement('th')
        linhaTitulos.appendChild(titulo_matricula)
        titulo_matricula.innerHTML = "Matrícula"

        const titulo_deputado = document.createElement('th')
        linhaTitulos.appendChild(titulo_deputado)
        titulo_deputado.innerHTML = "Deputado(a)"

        const titulo_mes = document.createElement('th')
        linhaTitulos.appendChild(titulo_mes)
        titulo_mes.innerHTML = "Mês"

        const titulo_ano = document.createElement('th')
        linhaTitulos.appendChild(titulo_ano)
        titulo_ano.innerHTML = "Ano"

        const titulo_tipo = document.createElement('th')
        linhaTitulos.appendChild(titulo_tipo)
        titulo_tipo.innerHTML = "Tipo"

        const titulo_valor = document.createElement('th')
        linhaTitulos.appendChild(titulo_valor)
        titulo_valor.innerHTML = "Valor"

        // let total = 0
        data.map(function(item) {
            const linhaValores = document.createElement('tr')
            
            const matricula = document.createElement('td')
            linhaValores.appendChild(matricula)
            const deputado = document.createElement('td')
            linhaValores.appendChild(deputado)
            const mes = document.createElement('td')
            linhaValores.appendChild(mes)
            const ano = document.createElement('td')
            linhaValores.appendChild(ano)
            const tipo = document.createElement('td')
            linhaValores.appendChild(tipo)
            const valor = document.createElement('td')
            linhaValores.appendChild(valor)

            // id.innerHTML = item.Id
            matricula.innerHTML = item.Matricula
            deputado.innerHTML = item.Deputado
            mes.innerHTML = item.Mes
            ano.innerHTML = item.Ano
            tipo.innerHTML = item.Tipo
            valor.innerHTML = `R$ ${(item.Valor.toFixed(2)).replace('.',',')}`

            corpoTabela.appendChild(linhaValores)
        })

        const linhaTotal = document.createElement('tr')
        corpoTabela.appendChild(linhaTotal)

        const textoTotal = document.createElement('td')
        const total = document.createElement('td')
        linhaTotal.appendChild(textoTotal)
        linhaTotal.appendChild(total)
        textoTotal.colSpan = 5
        textoTotal.innerHTML = "TOTAL"

        let valorTotal = data.reduce(function(valorTotal, despesa) {
            return valorTotal + despesa.Valor
        }, 0)
        total.innerHTML = `R$ ${(valorTotal.toFixed(2)).replace('.',',')}`
    }
})