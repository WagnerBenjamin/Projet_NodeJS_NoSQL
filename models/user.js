const mongoose = require('mongoose')
const passHash = require('password-hash');

var userSchema = mongoose.Schema({
    lastname: String,
    firstname: String,
    password: String,
    teamID: String,
});

var User = mongoose.model('User', userSchema)

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      User.find(function(err, users){
        resolve(users)
      })
    })
  },
  getSingleLogin: (data) => {
    return new Promise((resolve, reject) => {
      User.find({lastname: data.login, password: data.password}, function(err, user){
        if(err)
          reject(err)
        else
          resolve(user)
      })
    })
  },
  getSingleById: (data) => {
    return new Promise((resolve, reject) => {
      User.find({_id: data}, function(err, user){
        resolve(user)
      })
    })
  },
  getSingleById: (data) => {
    return new Promise((resolve, reject) => {
      User.find({_id: data}, function(err, user){
        resolve(user)
      })
    })
  },
  getInTeamByTeamId: (data) => {
    return new Promise((resolve, reject) => {
      User.find({teamID: data}, function(err, user){
        resolve(user)
      })
    })
  },
  save: (data) => {
    console.log("Ajout en cours...");
    var newUser = new User({
      lastname: data.lastname,
      firstname: data.firstname,
      password: passHash.generate(data.password)
    })
    newUser.save(function(err, user){
      if(err){
        console.log(err.message);
      }else{
        console.log("Nouvelle Utilisateur Ajouté !");
      }
    })
  },
  update: (data) => {
    return new Promise((resolve, reject) => {
      console.log("Ajout d'un utilisateur à la team")
      User.update({_id: data.user}, {teamID: data.id}, function(err, user){
        if(err){
          console.log(err.message);
        }else{
          console.log("Utilisateur Ajouté !");
        }
        resolve();
      })
    })
  }
}
