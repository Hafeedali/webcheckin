const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/time_entries', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const loginSchema = new mongoose.Schema({
  username: String,
  teamleader: String,
  password: String,
});

const entrySchema = new mongoose.Schema({
  username: String,
  date: String,
  startTime: String,
  endTime: String,
  timeDifference: String,
  project: String,
});

const TimeEntry = mongoose.model('TimeEntry', entrySchema);
const Login = mongoose.model('Login', loginSchema);

app.post('/api/login', async (req, res) => {
  const {username, teamLeader, password} = req.body;
try {
  const newLogin = new Login({ username, teamLeader, password });
  await newLogin.save();
  res.status(201).send('Login data saved successfully');
} catch (error) {
  console.error('Error saving login data', error);
  res.status(500).send('Error saving login data');
}
});

app.post('/api/time-entry', async (req, res) => {
  const entry = new TimeEntry(req.body);
  await entry.save();
  res.json(entry);
});

app.get('/api/time-entry', async (req, res) => {
  const entries = await TimeEntry.find();
  res.json(entries);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
