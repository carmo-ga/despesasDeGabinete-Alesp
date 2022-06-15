const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../db/db-deputados.db')

const despesasJSON = fs.readFileSync('./despesas_gabinetes.json')

let count = 0

const despesasArray = JSON.parse(despesasJSON)

const createTable = 'CREATE TABLE IF NOT EXISTS "deputados" ("Id"	INTEGER,"Ano"	INTEGER,	"Matricula"	TEXT,"Mes"	TEXT,	"Valor"	REAL,	"CNPJ"	TEXT,	"Deputado"	TEXT,	"Tipo"	TEXT,	"Fornecedor"	TEXT,	PRIMARY KEY("Id" AUTOINCREMENT));'
const dropTable = 'DROP TABLE IF EXISTS deputados'

// db.run(dropTable, (err) => {
//   if (err) {
//     console.log('Erro, tabela não deletada.')
//   } else {
//     console.log('Tabela deletada.')
//   }
// })

// db.run(createTable, (err) => {
//   if (err) {
//     console.log('Erro, verificar criação de tabelas.')
//   } else {
//     console.log('Tabela criada.')
//   }
// });

// despesasArray.despesas.despesa.forEach(item => {            
//   db.run(`INSERT INTO deputados VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`, 
//   [item.Ano, item.Matricula, item.Mes, item.Valor, item.CNPJ, item.Deputado, item.Tipo, item.Fornecedor], (err) => {
//       count++
//       if (err) {
//           console.log(`Erro: ${ err }`)
//           // res.end(JSON.stringify({ success: false }))
//       } else {
//           console.log('Ok')
//           console.log(count)
//           // res.end(JSON.stringify({ success: true }))
//       }
//   })
// })

db.serialize(() => {
    db.run(createTable)
    db.run("begin transaction");
    despesasArray.despesas.despesa.forEach(item => {            
        db.run(`INSERT INTO deputados VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [item.Ano, item.Matricula, item.Mes, item.Valor, item.CNPJ, item.Deputado, item.Tipo, item.Fornecedor], (err) => {
            count++
            if (err) {
                console.log(`Erro: ${ err }`)
            } else {
                console.log(count)
            }
        })
      })
    db.run("commit")
})