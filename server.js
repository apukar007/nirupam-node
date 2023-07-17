const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const allRoutes = require('./routes/index');
const cors = require('cors');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectToDatabase = () => {
    //console.log("Test");
    //const url= process.env.MONGO_URI;
    const url= "mongodb://localhost:27017/Todo";
  //const url = "mongodb+srv://apuplay007:oKAz43O0htN90mjR@cluster0.9uluu34.mongodb.net/Todo";
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Could not connect to MongoDB:', error));
};

connectToDatabase();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use('/', allRoutes);

const server = http.createServer(app);
server.listen(3000, () => {
        console.log('listening on *:3000');
    }   
);

