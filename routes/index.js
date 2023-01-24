const express = require('express');
const router = express.Router();    //this is what we want to export

router.get('/', (req, res) => {
    res.render('index');    //looks for an ejs file named 'index' within the views folder - this is due to the settings (app.set()) within server.js   
    //index.ejs gets rendered at '/'
})


//comment how module.export works****
module.exports = router;    //exports router so that it can be used in server.js