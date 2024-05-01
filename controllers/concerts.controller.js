const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const con = await Concert.findOne().skip(rand);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
    }
  catch(err) {
  res.status(500).json({ message: err });
  }
    };
  
exports.getById = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: "Not found"})
  }
  catch (err) {
    res.status(500).json({ message: err })    
  }
};
  
exports.AddNewConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image
    });
    await newConcert.save();
    res.json({ message: "OK"})
  }
  catch (err){
    res.status(500).json({ message: err })
  }
};
  
exports.updateConcert = async (req, res) => {
  try{
    const { performer, genre, price, day, image } = req.body
    const con = await Concert.findById(req.params.id)
    if (con) {
      con.performer = performer;
      con.genre = genre;
      con.price = price;
      con.genre = genre;
      con.day = day;
      con.image = image;
      await con.save();
    }
    else res.status(404).json({ message: 'Concert not found' });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
};
  
exports.removeConcert = async (req, res) => {
  try{
    const con = await Concert.findById(req.params.id)
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(con);
    }
    else res.status(404).json({ message: 'Concert not found' });
  }
  catch (err) {
    res.status(500).json({ message: err })
  }
};
