const express = require('express');
const cors = require('cors');
const app = express();

const endpoint = require('./api_core/endpoint/endpoint');

// enable CORS
app.use(cors()); 

app.use(express.json()); 

app.use('/api', endpoint);

const port = 2070;

app.listen(port, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${port}/api/`);
});






