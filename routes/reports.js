var express = require('express');
var router = express.Router();

/* APLMHolder Helper */
var utils = require('../controllers/apkmUtils.js'),
	RET = require('../models/RetCode.js');

/* GET home page. */
router.get('/:time', function(req, res) {

	if (!!req.params) {
		var time = req.params.time;
	}

	if (!!time) {
		res.render('report/res/' + time, {
			title: 'Apkm Holder',
			error: '404'
		});
	}
});

router.get('/', function(req, res) {
	res.render('report/index', {
		title: 'Apkm Holder'
	});
});

module.exports = router;