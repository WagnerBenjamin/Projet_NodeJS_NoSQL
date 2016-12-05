const router = require('express').Router()
const user = require('../models/user')

/* Page d'accueil */
router.get('/', function(req, res, next) {
  data = {
    title: 'Mon super projet',
  }
  res.format({
    html: () => { res.render('index', data) },
    json: () => { res.send(data) }
  })
})

module.exports = router
