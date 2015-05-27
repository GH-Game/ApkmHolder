var express = require('express');
var router = express.Router();

/* APLMHolder Helper */
var utils = require('../controllers/apkmUtils.js'),
	RET = require('../models/RetCode.js');

/* GET home page. */
router.get('/file', function(req, res) {
	res.render('game/file', {
		title: '渠道包下载文档'
	});
});

router.get('/address', function(req, res) {
	res.render('game/address', {
		title: '官方包下载链接'
	});
});

router.get('/data', function(req, res) {
	res.render('data/data', {
		title: '官方包下载链接'
	});
});

module.exports = router;