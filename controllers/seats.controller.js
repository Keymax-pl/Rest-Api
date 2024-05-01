const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const sea = await Seat.findOne().skip(rand);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
    }
  catch(err) {
  res.status(500).json({ message: err });
  }
    };
  
exports.getById = async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: "Not found"})
  }
  catch (err) {
    res.status(500).json({ message: err })    
  }
};
  
exports.AddNewSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      seat: seat,
      client: client,
      email: email,
      day: day,
    });
    await newSeat.save();
    res.json({ message: "OK"})
  }
  catch (err){
    res.status(500).json({ message: err })
  }
};
  
exports.updateSeat = async (req, res) => {
  try{
    const { day, seat, client, email } = req.body;
    const sea = await Seat.findById(req.params.id)
    if (sea) {
      sea.seat = seat;
      sea.client = client;
      sea.email = email;
      sea.day = day;
      await sea.save();
    }
    else res.status(404).json({ message: 'Seat not found' });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
};
  
exports.removeSeat = async (req, res) => {
  try{
    const sea = await Seat.findById(req.params.id)
    if (sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(sea);
    }
    else res.status(404).json({ message: 'Seat not found' });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
};
