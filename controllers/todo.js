const fs = require('fs');
const Todo = require('../models/Todo');

exports.getAll = async (req, res) => {
    
    try {
        const todos = await Todo.find().populate('categories');

        // Monggogse Or Query
        // const todos = await Todo.find().
            // $or([{name: 'test'}, {age: 21}]);

        res.status(200).json({
            todos
        })
        
    } catch (error) {

        res.json({ message: error.message });
    }
}

exports.create = async (req, res) => {
    const { title, description, categories } = req.body;
    try {
        const todo = new Todo({
            title,
            description,
            categories
        });
        const result = await todo.save();
        res.json({ message: "Create Todo!" , result});

    } catch (error) {

        res.json({ message: error.message });
    }
    

    
}

exports.update = (req, res) => {

    const { id , title, description } = req.body;

    const UpdateTodo = Todo.findOneAndUpdate( { _id: id }, { title, description }, { new: true } );

    res.status(200).json({
        message: "Update Todo!",
        UpdateTodo
    });

  
    try {
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
        
    }

}

exports.delete = (req, res) => { 
   const { id } = req.body;
    try {
        const todo = Todo.findByIdAndDelete(id);
        res.status(200).json({
            message: "Delete Todo!",
            todo
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
        
    }
    

    
}

exports.getTodo = (req, res) => {
    const todoId = req.params.id
    try {
        //const todo = Todo.findById(todoId);

        //const todo = Todo.findOne({ _id: todoId });

        const toto = Todo.find({ _id: todoId })
        res.status(200).json({
            message: "Get Todo!",
            toto
        });
                
    } catch (error) {
        
    }
    res.json({ message: "Get Todo!"+todoId });
}

