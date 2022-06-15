import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('../db/db-deputados.db')
const app = express()

console.log("Iniciando o app.js")
app.use(express.json())
app.use(cors())

app.get('/deputados', (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
        db.all(`SELECT * FROM deputados`, [], (err, rows) => {
           if (err) {
               console.log(err)
           }
           
            res.end(JSON.stringify(rows))
        }) 
    } catch (error) {
        console.log(error)
    }
})

app.get('/deputados/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    let id = req.params.id

    try {
        db.get(`SELECT * FROM deputados WHERE Id =  ?`, [id], (err, rows) => {
           if (err) {
               console.log(err)
           }

           console.log(res.end(JSON.stringify(rows)))
        }) 
    } catch (error) {
        console.log(error)
    }    
})

app.get('/busca', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    let deputado = req.query.deputado
    let ano = req.query.ano
    let mes = req.query.mes

    try {
        db.all(`SELECT Id, Deputado, Matricula, Mes, Ano, Tipo, Valor FROM deputados WHERE Deputado LIKE '%${deputado}%' AND Ano = ${ano} AND Mes = ${mes}`, [], (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                if (rows) {
                    res.end(JSON.stringify(rows))
                } else {
                    res.end('Deputado ou Ano inválidos.')
                }
            }            
        })
    } catch (error) {
        console.log(error)
    }
})

export default app