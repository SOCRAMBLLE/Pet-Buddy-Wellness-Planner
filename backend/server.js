const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');
const petRoutes = require('./routes/petRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/pets', petRoutes);

// app.use(express.static(path.join(__dirname, './build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './build'))
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
