const router = require('express').Router()
const task = require('../models/task')
const user = require('../models/user')
const team = require('../models/team')

//Index
router.get('/', function(req, res, next) {
  task.get().then((result) => {
    data = {
      tasks: result,
      title: "Tasks"
    }
    res.format({
      html: () => { res.render('tasks/index', data) },
      json: () => { res.send(data) }
    })
  })
})
//Page Ajout
router.get('/add', function(req, res, next){
  res.format({
    html: () => { res.render('tasks/add') }
  })
})
//Ajout
router.post('/add', function(req, res, next){
  let count
  let data
  countnData(req.body).then((result) => {
    if(result[1] == 1){
      if(result[0][0] == "Utilisateur"){
        console.log("Ajout de tache pour un Utilisateur");
        user.get().then((users) => {
          data = {
            selected: 1,
            toType: result[0][0],
            assignedBy: users[0],
            who: "user",
            possiblesTo: users
          }
          res.format({
            html: () => { res.render('tasks/add', data) },
            json: () => { res.send(data) }
          })
        })
      } else if (result[0][0] == "Team") {
        console.log("Ajout de tache pour une Team");
        team.get().then((teams) => {
          data = {
            selected: 1,
            toType: result[0][0],
            assignedBy: teams[0],
            who: "team",
            possiblesTo: teams
          }
          res.format({
            html: () => { res.render('tasks/add', data) },
            json: () => { res.send(data) }
          })
        })
      }
    } else {
      task.save(req.body)
      res.redirect("add")
    }
  })
})
//Single Team
router.get('/:taskId', function(req, res, next) {
  task.getSingle(req.params.taskId).then((result) => {
    console.log("Task> " + result[0].name);
    data = {
      task: result[0],
      title: "Infos"
    }
    res.format({
      html: () => { res.render('tasks/single', data) },
      json: () => { res.send(data) }
    })
  })
  // user.getSingle(req.body)
})

function countnData(arr){
  let array = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    // console.log(arr)
    for(var param in arr){
      ++count;
      array.push(arr[param]);
    };
    resolve([array, count]);
  })
}
module.exports = router
