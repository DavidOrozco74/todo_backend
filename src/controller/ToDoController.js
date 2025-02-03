
const ToDoSchema = require('../models/todo');


// Todos los ToDos
exports.getTodos = async (req, res) => {
    try {
        const allToDos = await ToDoSchema.find();
        console.log('allToDos', allToDos);
        res.status(200).json({
            "success": true,
            "data": allToDos,
            "message": "ToDos obtenidos",
        });
    } catch (error) {
        console.log(error.message);
    }
};

//Un ToDo
exports.getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await ToDoSchema.findById({ _id: id });
        console.log('todo', todo);
        if (!todo) {
            return res.status(200).json({
                "success": false,
                "message": "No se encontro el ToDo",
            });
        } else {
            return res.status(200).json({
                "success": true,
                "data": todo,
                "message": "ToDo obtenido",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Crear un ToDo 
exports.createTodo = async (req, res) => {
    try {
        const todo = await ToDoSchema.create(req.body);
        res.status(201).json({
            "success": true,
            "data": todo,
            "message": "ToDo creado",
        });
    } catch (error) {
        res.json({
            "success": false,
            "msg": "No se pudo crear el ToDo",
            "error": error.message
        })
    }
}

// Actualizar un ToDo
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body
        const options = { new: true };
        const todo = await ToDoSchema.findByIdAndUpdate({ _id: id }, update, options);
        if (!todo) {
            return res.status(200).json({
                "success": false,
                "message": "No se encontro el ToDo",
            });
        } else {
            return res.status(200).json({
                "success": true,
                "data": todo,
                "message": "ToDo actualizado",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Eliminar un ToDo
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await ToDoSchema.findByIdAndDelete({ _id: id });
        if (!todo) {
            return res.status(200).json({
                "success": false,
                "message": "No se encontro el ToDo",
            });
        } else {
            return res.status(200).json({
                "success": true,
                "data": todo,
                "message": "ToDo eliminado",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}