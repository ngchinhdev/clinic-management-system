require('dotenv/config');
const mongoose = require('mongoose');

const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log("Error connecting to database: ", err);
    });
