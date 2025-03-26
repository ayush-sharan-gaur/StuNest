const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let listings = [
  { id: '1', title: 'PG in Mukherjee Nagar', description: 'Affordable and safe housing near campus.', price: 3500, imageUrl: 'https://via.placeholder.com/300', address: 'Mukherjee Nagar, Delhi' },
  { id: '2', title: 'Shared Flat in Kota', description: 'Ideal for students, spacious and well-connected.', price: 4000, imageUrl: 'https://via.placeholder.com/300', address: 'Kota, Rajasthan' },
  { id: '3', title: 'Hostel in Delhi', description: 'Secure hostel with all amenities.', price: 3000, imageUrl: 'https://via.placeholder.com/300', address: 'Delhi' },
];

// Endpoint for fetching listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// Endpoint for adding a listing
app.post('/api/listings', (req, res) => {
  const newListing = { id: Date.now().toString(), ...req.body };
  listings.push(newListing);
  res.status(201).json(newListing);
});

// Endpoint for booking a listing
app.post('/api/book', (req, res) => {
  const { listingId, userId } = req.body;
  // Simulate a booking success
  res.status(200).json({ success: true, listingId, userId });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
