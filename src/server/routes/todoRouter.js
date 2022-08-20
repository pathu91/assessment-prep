const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/get-todo', todoController.getTodo, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.post('/add-todo', todoController.addTodo, (req, res) =>
  res.status(200).json(res.locals.data)
);

router.delete('/delete-todo', todoController.deleteTodo, (req, res) => {
  res.status(200).send('Todo deleted');
});

router.patch('/update-todo', todoController.updateTodo, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

module.exports = router;
