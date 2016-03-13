var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send("get messages");
});

router.get('/:id', function(req, res){
  res.send("get messages with id " + req.params.id);
});

router.post('/', function(req,res){
  res.send('POST message');
});

module.exports = router;
