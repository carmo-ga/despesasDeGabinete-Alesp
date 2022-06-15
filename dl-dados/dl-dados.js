const download = require('download')

const file = 'https://www.al.sp.gov.br/repositorioDados/deputados/despesas_gabinetes.xml'

const filePath = `./`

download(file, filePath)
    .then(() => {
        console.log('Download completo.')
    })