const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Answer API requests.
app.get('/dots', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  });
});
app.post('/dot', function (req, res) {
  db.saveDot(req.body);
  res.send(req.body);
});

app.put('/dot', function (req, res) {
  db.update({ color : req.body.dot.color}, {likes: req.body.dot.likes}, function(err, data) {
    if(err) {
      console.log('err', err);
      res.sendStatus(500);
    } else {
      res.set('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
