var express = require('express');
var router = express.Router();

/* APLMHolder Helper */
var utils = require('../controllers/apkmUtils.js'),
	RET = require('../models/RetCode.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Apkm Holder'
	});
});

router.get('/console', function(req, res) {
	res.render('index', {
		title: 'Apkm Holder'
	});
});

module.exports = router;