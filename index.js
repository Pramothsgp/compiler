const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  router  = require('./routes/router');
const app = express();
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization' , 'application/json']
// }));
app.use(bodyParser.json());

app.use('/run', router); 
app.get('/', (req, res) => {
  res.send('Welcome to the Code Runner API');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
