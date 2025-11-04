var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');

// Routes Trips //

//Trips/search - Rechercher des trajets
router.get('/trips', (req, res) => {
  const {departure, arrival, date} = req.query;

  if(!departure || !arrival || !date){
    return res.json({result : false, error: 'Missing fields'})
  }

  const startOfDay = moment.utc(date, 'YYYY-MM-DD').startOf('day').toDate();
  const endOfDay = moment.utc(date, 'YYYY-MM-DD').endOf('day').toDate();

  console.log('📅 startOfDay =', startOfDay);
  console.log('📅 endOfDay   =', endOfDay);

  console.log('Recherche avec:', { departure, arrival, startOfDay, endOfDay });


  Trip.find({
    departure: { $regex : new RegExp(departure, 'i')},
    arrival:{ $regex: new RegExp(arrival,'i')},
    date:{
      $gte: startOfDay,
      $lte: endOfDay
    }
  })
  .then(trips => {
    if (trips.length === 0){
      res.json({result : false, message: 'No trips found'});
    }else{
      res.json({ result: true, trips});
    }
  })
  .catch(error => {
    res.json({result: false, error : error.message});
  });
});

module.exports = router;
