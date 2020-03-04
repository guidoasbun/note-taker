// const express = require('express')
// const path = require('path')
// const fs = require('fs')
// const app = express()

// //MiddleWare
// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// })

// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) {console.log(err)}
//     res.json(JSON.parse(data))
//   })
// })

// app.post('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) { console.log(err) }
//     const notes = JSON.parse(data)
//     notes.push(req.body)
//     fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
//       if(err) {console.log(err)}
//       res.sendStatus(200)
//     })
    
//   })
// })

// app.delete('/api/notes/:id', (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) { console.log(err) }
//     const notes = JSON.parse(data)
//     notes.pop(req.body)
//     fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
//       if(err) {console.log(err)}
//       res.sendStatus(200)
//     })
//   })
// })

// app.listen(process.env.PORT || 3000)

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

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

app.post('/api/notes', (req, res) => {
  let newNote = req.body
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const notes = JSON.parse(data)
    newNote.id = notes[notes.length - 1].id + 1
    notes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const notes = JSON.parse(data)
    notes.pop(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
      if(err) {console.log(err)}
      res.sendStatus(200)
    })
  })
})

app.listen(process.env.PORT || 3000)