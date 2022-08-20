const express = require('express');
const Todo = require('../models/todoModel');
const TodoModel = require('../models/todoModel');

const todoController = {};

todoController.getTodo = (req, res, next) => {
  TodoModel.find({}).then(response => {
    console.log('DATA??', response);
    res.locals.data = response;
    return next();
  });
};

todoController.addTodo = (req, res, next) => {
  const { todo } = req.body;
  TodoModel.create({ todo })
    .then(response => {
      console.log(response);
      res.locals.data = response;
      return next();
    })
    .catch(err => {
      return next({
        log: 'ERROR in todoController.addTodo',
        msg: { err: 'ERROR in todoController.addTodo' },
      });
    });
};

todoController.deleteTodo = (req, res, next) => {
  const { id: _id } = req.body;
  TodoModel.findOneAndDelete({ _id })
    .then(response => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'ERROR in todoController.deleteTodo',
        msg: { err: 'ERROR in todoController.deleteTodo' },
      });
    });
};

todoController.updateTodo = (req, res, next) => {
  const { id: _id, newTodo } = req.body;
  console.log('THIS IS ID UDPATE: ', _id);
  console.log('THIS IS NEW TASK: ', newTodo);
  Todo.findOneAndUpdate({ _id }, { todo: newTodo })
    .then(res => {
      console.log('NEWLY UPDATED TODO: ', res);
      res.locals.newTask = res;
      return next();
    })
    .catch(err => {
      return next({
        log: 'ERROR in todoController.updateTodo',
        msg: { err: 'ERROR in todoController.updateTodo' },
      });
    });
};

module.exports = todoController;
