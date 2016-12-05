const router = require('express').Router()
const user = require('../models/user')
const task = require('../models/task')

/* Users : liste */
router.get('/', function(req, res, next) {
  let users
  user.get().then((result) => {
    data = {
      users: result,
      title: "Utilisateur"
    }
    res.format({
      html: () => { res.render('users/index', data) },
      json: () => { res.send(data) }
    })
  })
})

router.get('/add', function(req, res, next){
  res.format({
    html: () => { res.render('users/add') }
  })
})

router.post('/add', function(req, res, next){
  console.log("Ajout en cours...");
  user.save(req.body)
  res.redirect('/users')
})

router.get('/:userId', function(req, res, next) {
  user.getSingleById(req.params.userId).then((user) => {
    task.getByAssignedToId(req.params.userId).then((tasks) => {
      console.log("User> " + user[0].lastname + " " + user[0].firstname);
      data = {
        user: user[0],
        tasks: tasks,
        title: "Infos"
      }
      res.format({
        html: () => { res.render('users/single', data) },
        json: () => { res.send(data) }
      })
    })
  })
  // user.getSingle(req.body)
})

module.exports = router
