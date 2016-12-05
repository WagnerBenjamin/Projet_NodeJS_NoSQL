const router = require('express').Router()
const team = require('../models/team')
const task = require('../models/task')
const user = require('../models/user')

//Index
router.get('/', function(req, res, next) {
  let teams
  team.get().then((result) => {
    data = {
      teams: result,
      title: "Teams"
    }
    res.format({
      html: () => { res.render('teams/index', data) },
      json: () => { res.send(data) }
    })
  })
})
//Page Ajout
router.get('/add', function(req, res, next){
  res.format({
    html: () => { res.render('teams/add') }
  })
})
//Ajout
router.post('/add', function(req, res, next){
  team.save(req.body)
  res.redirect('/teams')
})
//Single Team
router.get('/:teamId', function(req, res, next) {
  team.getSingle(req.params.teamId).then((result) => {
    task.getByAssignedToId(req.params.teamId).then((tasks) => {
      user.getInTeamByTeamId(req.params.teamId).then((userInTeam) => {
        user.get().then((users) => {
          console.log("Team> " + result[0].name);
          data = {
            tasks: tasks,
            team: result[0],
            users: users,
            userInTeam: userInTeam,
            title: "Infos"
          }
          res.format({
            html: () => { res.render('teams/single', data) },
            json: () => { res.send(data) }
          })
        })
      })
    })
  })
})
//Ajout user dans Team
router.post('/:teamId', function(req, res, next) {
  user.update(req.body).then(() => {
    res.redirect("/teams/" + req.params.teamId)
  })
})
module.exports = router
