var express = require('express');
var router = express.Router();
var controller = require('./../controllers/message')

router.get('/', controller.getAll);
router.post('/', controller.create);

router.get('/', function(req, res) {
    res.render('index.jade');
});

module.exports = router;
