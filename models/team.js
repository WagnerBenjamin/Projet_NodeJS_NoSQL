const mongoose = require('mongoose')

var teamSchema = mongoose.Schema({
    name: String,
});

var Team = mongoose.model('Team', teamSchema)

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      Team.find(function(err, teams){
        resolve(teams)
      })
    })
  },
  getSingle: (data) => {
    return new Promise((resolve, reject) => {
      Team.find({_id: data}, function(err, team){
        resolve(team)
      })
    })
  },
  save: (data) => {
    console.log("Ajout en cours...");
    var newTeam = new Team({
      name: data.name,
    })
    newTeam.save(function(err, team){
      if(err){
        console.log(err.message);
      }else{
        console.log("Nouvelle Team Ajouté !");
      }
    })
  }
}
