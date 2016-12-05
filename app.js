const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const sass = require('node-sass-middleware')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bdd')
const db = mongoose.connection
const exec = require('child_process').exec

const PORT = process.PORT || 8080
const app = express()

console.log("Connexion à la base de donnée")
start()

function start(){
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log('Connecté !')
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'pug')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(sass({
      src: path.join(__dirname, 'styles'),
      dest: path.join(__dirname, 'assets', 'css'),
      prefix: '/css',
      outputStyle: 'expanded'
    }))

    app.use(express.static(path.join(__dirname, 'assets')))

    app.use('/', require('./routes/index'))
    app.use('/users', require('./routes/users'))
    app.use('/teams', require('./routes/teams'))
    app.use('/tasks', require('./routes/tasks'))

    app.use(function(req, res, next) {
      let err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    app.use(function(err, req, res, next) {
      let data = {
        message: err.message,
        status: err.status || 500
      }

      if (app.get('env') === 'development') {
        data.error = err.stack
      }

      res.status(data.status)

      res.format({
        html: () => { res.render('error', data) },
        json: () => { res.send(data) }
      })
    })

    app.listen(PORT, () => {
      console.log('Serveur démarré sur le port : ', PORT)
    })
  })
}
