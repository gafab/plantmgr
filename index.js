const express = require('express');
const bodyParser = require("body-parser")
const app = express();
require('dotenv').config();

const taxonomyRoutes = require("./src/routes/taxonomy")
const plantRoutes = require("./src/routes/plant")
const historyRoutes = require("./src/routes/history")
const harvestRoutes = require("./src/routes/harvest")
const harvestTypeRoutes = require("./src/routes/harvestType")



//Middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Routes
app.use("/taxonomy",taxonomyRoutes);
app.use("/plant",plantRoutes);
app.use("/history",historyRoutes);
app.use("/harvest",harvestRoutes);
app.use("/harvesttype",harvestTypeRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});