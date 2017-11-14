var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var findDB = process.env.MONGODB_URI || 'mongodb://localhost/dots';

mongoose.connect(findDB);
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var dots = mongoose.Schema({
  // id: Number,
  // screencapture: { data: Buffer, contentType: String }, Binary
  ycord: String,
  xcord: String,
  size: String,
  color: String,
  note: String,
  sentiment: String,
  score: Number

});
dots.plugin(timestamps);

var Dot = mongoose.model('Dot', dots);

var saveDot = (dotToSave) => {
  var newDot = new Dot(dotToSave);
  newDot.save( (err, newDot) => {
    if (err) {
      console.error(err);
    } else {
      console.log(newDot + ' saved!');
    }
  })
}

var selectAll = function(callback) {
  Dot.find({}, function(err, dots) {
    console.log('DB dots', dots);
    if(err) {
      callback(err, null);
    } else {
      callback(null, dots);
    }
  });
};

var selectOne = function (query, callback) {
  Dot.findOne(query, function(err, dot) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, dot);
    }
  });
}

module.exports.saveDot = saveDot;
module.exports.selectOne = selectOne;
module.exports.selectAll = selectAll;
