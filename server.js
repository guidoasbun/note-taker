const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, notes) => {
    if (err) {console.log(err)}
    res.json(JSON.parse(notes))
  })
})

app.post('api/notes', (req, res) => {

})

app.delete('/api/notes/:id')

app.listen(process.env.PORT || 3000)