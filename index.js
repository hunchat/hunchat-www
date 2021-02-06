const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION_NAME,
});

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/public/'});
});
app.get('/contact', (req, res) => {
  res.sendFile('contact.html', {root: __dirname + '/public/'});
});
app.get('/team', (req, res) => {
  res.sendFile('team.html', {root: __dirname + '/public/'});
});
app.get('/waiting-list', (req, res) => {
  res.sendFile('waiting-list.html', {root: __dirname + '/public/'});
});
app.get('/401', (req, res) => {
  res.sendFile('401.html', {root: __dirname + '/public/'});
});
app.get('/404', (req, res) => {
  res.sendFile('404.html', {root: __dirname + '/public/'});
});

app.post('/contact', (req, res) => {
  let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
      apiVersion: '2010-12-01'
    })
  });

  transporter.sendMail({
    from: '"Contact" <hello@hunchat.com>',
    to: "hello@hunchat.com",
    subject: `Contact: ${req.body.topic}`,
    text: req.body.message + '\n\nYours,\n' + req.body.email,
  })
    .then((response) => {
      res.status(201).json({message: 'Thank you for reaching out'})
    })
    .catch((error) => {
      res.status(500).json({message: 'Something went wrong'})
    })
});

app.use(function (req, res, next) {
  res.status(404).sendFile('404.html', {root: __dirname + '/public/'})
});

app.listen(process.env.PORT || 5000)
