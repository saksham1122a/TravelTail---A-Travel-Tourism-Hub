const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send(`TravelTail Server!`);
});

app.listen(port, () => {
  console.log(`TravelTail Server listening on port ${port}`);
});