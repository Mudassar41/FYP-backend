var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FYP', { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => { console.log("Connection succsessfull") }).
    catch((Error) => {
        console.log("Error in DB connection");
    })