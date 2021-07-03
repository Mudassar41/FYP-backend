const express = require('express');
const app = express();
const port = process.env.PORT  || 4000;

//requiring DBConnection file//

require('./dbConnection/dbConnection');
var providerRoutes = require('./routes/serviceProvidersRoutes');
var UserRegisterRoutes = require('./routes/userRoute');
var providerCategoriesRoute = require('./routes/providerCategoriesRoutes');
var providerProfileRoute = require('./routes/providerProfilesRoute');
var offersRoute=require('./routes/offersRoutes');
app.use(express.json({limit:'50mb'}))
app.use('/uploads', express.static('uploads'));

app.use(providerRoutes);
app.use(providerCategoriesRoute);
app.use(providerProfileRoute);
app.use(UserRegisterRoutes);
app.use(offersRoute);
app.listen(port, () => {

    console.log('Running server ');
})