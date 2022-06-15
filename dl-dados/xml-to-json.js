const fs = require('fs')
const xml2js = require('xml2js')

// const despesasXML = './dados-xml/despesas_gabinetes.xml'
const despesasXML = fs.readFileSync('./despesas_gabinetes.xml')

xml2js.parseString(despesasXML, { mergeAttrs: true }, (err, result) => {
    if(err) {
        throw err
    }

    const json = JSON.stringify(result, null, 4)

    fs.writeFileSync('despesas_gabinetes.json', json)
})