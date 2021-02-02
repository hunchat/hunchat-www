const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname + '/public/'});
});
app.get('/401', (req, res) => {
  res.sendFile('401.html', {root: __dirname + '/public/'});
});
app.get('/404', (req, res) => {
  res.sendFile('404.html', {root: __dirname + '/public/'});
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

app.listen(process.env.PORT || 5000)
