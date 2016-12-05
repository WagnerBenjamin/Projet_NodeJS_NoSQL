const mongoose = require('mongoose')

var taskSchema = mongoose.Schema({
    assignedTo: String,
    toType: String,
    task: String,
    assignedBy: String,
    byType: String,
    completedAt: Date
});

var Task = mongoose.model('Task', taskSchema)

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      Task.find(function(err, tasks){
        resolve(tasks)
      })
    })
  },
  getSingle: (data) => {
    return new Promise((resolve, reject) => {
      Task.find({_id: data}, function(err, task){
        resolve(task)
      })
    })
  },
  getByAssignedToId: (data) => {
    return new Promise((resolve, reject) => {
      Task.find({assignedTo: data}, function(err, tasks){
        resolve(tasks)
      })
    })
  },
  save: (data) => {
    console.log("Ajout en cours...");
    return new Promise((resolve, reject) => {
      var newTask = new Task({
        assignedTo: data.assignedTo,
        toType: data.toType,
        task: data.task,
        assignedBy: data.assignedBy,
        byType: "Utilisateur"
      })
      console.log(newTask);
      newTask.save(function(err, task){
        if(err){
          console.log(err.message);
        }else{
          console.log("Nouvelle Task Ajouté !");
        }
      }).then(() => {
        resolve();
      })
    })
  }
}
