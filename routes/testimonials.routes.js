const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });
  
router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});
  
router.route('/testimonials/:id').get((req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.find(testimonial => testimonial.id === testimonialId);
  if (testimonialIndex){
    res.json(testimonialIndex);
  }else{
  res.status(404).json({ message: 'Testimonial not found' });
  }
});
  
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body
  if ( !author || !text ) {
    res.status(404).json({ message: 'Author and text are required' });
  }else{
    const newTestimonial = { id: uuidv4(), author, text }
    db.testimonials.push(newTestimonial)
    res.json({ message: 'ok'});
  }
});
  
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.find(testimonial => testimonial.id === testimonialId);
  if ( !testimonialIndex ) {
    res.status(404).json({ message: 'Testimonial not found' })
  }else{
    testimonialIndex.author = author;
    testimonialIndex.text = text;
    res.json({ message: 'ok' })
  }
});
  
router.route('/testimonials/:id').delete((req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.testimonials.findIndex(testimonial => testimonial.id === testimonialId);
  if (testimonialIndex !== -1){
    db.testimonials.splice(testimonialIndex, 1);
    res.json({ message: 'ok' })
  }else{
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

module.exports = router;