const mongoose = require('mongoose')

var todoSchema = mongoose.Schema({
    assignedTo: Number,
    toType: String,
    task: String,
    assignedBy: Number,
    byType: String,
    completedAt: Date
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = {
  get: () => {
    Todo.find(function(err, todos){
      console.log(todos)
    })
  },
  save: (data) => {
    var newTodo = new Todo({
      assignedTo: data.assignedTo,
      toType: data.toType,
      task: data.task,
      assignedBy: data.assignedBy,
      byType: data.byType,
      completedAt: null,
    })
    newTodo.save(function(err, todo){
      console.log(todo)
    })
  }
}
