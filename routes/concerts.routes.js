const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
  });
  
router.route('/concerts/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.concerts.length);
  const randomconcert = db.concerts[randomIndex];
  res.json(randomconcert);
});
  
router.route('/concerts/:id').get((req, res) => {
  const concertId = parseInt(req.params.id);
  const concertIndex = db.concerts.find(concert => concert.id === concertId);
  if (concertIndex){
    res.json(concertIndex);
  }else{
  res.status(404).json({ message: 'Concert not found' });
  }
});
  
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body
  if ( !performer || !genre || !price || !day || !image ) {
    res.status(404).json({ message: 'All data is needed' });
  }else{
    const newConcert = { id: uuidv4(), performer, genre, price, day, image }
    db.concerts.push(newConcert)
    res.json({ message: 'ok'});
  }
});
  
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body
  const concertId = parseInt(req.params.id);
  const concertIndex = db.concerts.find(concert => concert.id === concertId);
  if ( !concertIndex ) {
    res.status(404).json({ message: 'concert not found' })
  }else{
    concertIndex.performer = performer;
    concertIndex.genre = genre;
    concertIndex.price = price;
    concertIndex.day = day;
    concertIndex.image = image;
    res.json({ message: 'ok' })
  }
});
  
router.route('/concerts/:id').delete((req, res) => {
  const concertId = parseInt(req.params.id);
  const concertIndex = db.concerts.findIndex(concert => concert.id === concertId);
  if (concertIndex !== -1){
    db.concerts.splice(concertIndex, 1);
    res.json({ message: 'ok' })
  }else{
    res.status(404).json({ message: 'Concert not found' });
  }
});

module.exports = router;