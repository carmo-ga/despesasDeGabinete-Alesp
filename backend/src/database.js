const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Conectado ao SQLite database.')
        db.run(`CREATE TABLE deputados (
            "Id" INTEGER,
            "Ano" INTEGER, 
            "Matricula" TEXT, 
            "Mes" INTEGER, 
            "Valor" REAL,
            "CNPJ" TEXT,
            "Deputado" TEXT,
            "Tipo" TEXT,
            "Fornecedor" INTEGER,
            PRIMARY KEY ("Id" AUTOINCREMENT)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        })
    }
})

module.exports = db