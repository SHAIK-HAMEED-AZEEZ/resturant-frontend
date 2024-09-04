const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connectionerror:',err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  codeNumber: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.post('/addUser', async (req, res) => {
  try {
    const { email, phone, address, codeNumber } = req.body;
    const newUser = new User({ email, phone, address, codeNumber });
    await newUser.save();
    res.status(201).send('User data saved successfully');
  } catch (err) {
    res.status(400).send('Error saving user data: ' + err.message);
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});