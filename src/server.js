const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/config');
const todoRoutes = require('./routes/todo.router');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; 
        connectDB();
        this.server = http.createServer(this.app);

        
        this.middleware();

        
        this.app.use('/api/todos', todoRoutes);
    }

    middleware() {
        this.app.use(morgan('dev'));
        const corsOptions = {
            origin: 'http://localhost:4200', // Permite solo este origen
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
            allowedHeaders: ['Content-Type'], // Cabeceras permitidas
        };
        this.app.use(cors(corsOptions));
        this.app.options('*', cors()); 
        this.app.use(express.json());
    }

    execute() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;