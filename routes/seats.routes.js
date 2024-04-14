const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });
  
router.route('/seats/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.seats.length);
  const randomSeat = db.seats[randomIndex];
  res.json(randomSeat);
});
  
router.route('/seats/:id').get((req, res) => {
  const seatId = parseInt(req.params.id);
  const seatIndex = db.seats.find(seat => seat.id === seatId);
  if (seatIndex){
    res.json(seatIndex);
  }else{
  res.status(404).json({ message: 'seat not found' });
  }
});
  
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'Complete all data' });
  }
  const isSeatTaken = db.seats.some(existingSeat => existingSeat.seat === seat && existingSeat.day === day);
  if (isSeatTaken) {
    return res.status(409).json({ message: 'The slot is already taken...' });
  }
  const newSeat = { id: uuidv4(), day, seat, client, email };
  db.seats.push(newSeat);
  return res.json({ message: 'ok' });
});

  
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body
  const seatId = parseInt(req.params.id);
  const seatIndex = db.seats.find(seat => seat.id === seatId);
  if ( !seatIndex ) {
    res.status(404).json({ message: 'seat not found' })
  }else{
    seatIndex.day = day;
    seatIndex.seat = seat;
    seatIndex.client = client;
    seatIndex.email = email;
    res.json({ message: 'ok' })
  }
});
  
router.route('/seats/:id').delete((req, res) => {
  const seatId = parseInt(req.params.id);
  const seatIndex = db.seats.findIndex(seat => seat.id === seatId);
  if (seatIndex !== -1){
    db.seats.splice(seatIndex, 1);
    res.json({ message: 'ok' })
  }else{
    res.status(404).json({ message: 'seat not found' });
  }
});

module.exports = router;