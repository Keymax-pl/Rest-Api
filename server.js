const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const randomTestimonial = db[randomIndex];
  res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.find(testimonial => testimonial.id === testimonialId);
  if (testimonialIndex){
    res.json(testimonialIndex);
  }else{
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body
  if ( !author || !text ) {
    res.status(404).json({ message: 'Author and text are required' });
  }else{
    const newTestimonial = { id: uuidv4, author, text }
    db.push(newTestimonial)
    res.json({ message: 'ok'});
  }
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.find(testimonial => testimonial.id === testimonialId);
  if ( !testimonialIndex ) {
    res.status(404).json({ message: 'Testimonial not found' })
  }else{
    testimonialIndex.author = author;
    testimonialIndex.text = text;
    res.json({ message: 'ok' })
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const testimonialId = parseInt(req.params.id);
  const testimonialIndex = db.find(testimonial => testimonial.id === testimonialId);
  if (testimonialIndex !== -1){
    db.splice(testimonialIndex, 1);
    res.json({ message: 'ok' })
  }else{
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' })
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
})