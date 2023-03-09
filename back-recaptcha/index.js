const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true // Allow cookies to be sent with requests
  }));


const API_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

app.post('/api/authenticate', (req, res) => {
  const { recaptcha } = req.body;

  if (!recaptcha) {
    return res.status(400).json({ error: 'reCAPTCHA is required' });
  }

  const options = {
    method: 'POST',
    uri: VERIFY_URL,
    form: {
      secret: API_KEY,
      response: recaptcha
    },
    json: true
  };

  request(options, (err, response, body) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to verify reCAPTCHA' });
    }

    if (!body.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    // TODO: Implement your authentication logic here

    res.json({ response });
  });
});

// rota pública que não requer autenticação
app.get('/api/publica', (req, res) => {
    res.json({ message: 'Olá, mundo! Esta é uma rota pública.' });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



