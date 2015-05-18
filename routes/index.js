var express = require('express');
var router = express.Router();

/* Plugins */
var multipart = require('connect-multiparty');

/* APLMHolder Helper */
var utils = require('../controllers/Utils.js'),
	RET = require('../models/RetCode.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Apkm Holder'
	});
});

/* PUSH an APK info */
router.get('/push', function(req, res) {
	console.log('PUSH called.');

	utils.pushOpInfo(function(data) {
		if (!!data) {
			data.code = 1;
			res.json(data);
		} else {
			res.json(RET.FILE_INSERT_ERROR);
		}
	});
});

/* GET Op info */
router.get('/pull', function(req, res) {
	utils.pullOpInfo(function(ops) {
		if (!!ops) {
			res.json({
				code: 1,
				list: ops
			});
		} else {
			res.json(RET.FILE_LOAD_ERROR);
		}
	});
});

/* GET Op info */
router.get('/getops', function(req, res) {
	utils.getOpInfo(function(ops) {
		if (!!ops) {
			res.json({
				code: 1,
				list: ops
			});
		} else {
			res.json(RET.FILE_LOAD_ERROR);
		}
	});
});

/* CLEAR Op info */
router.get('/clear', function(req, res) {
	res.json(utils.clearOpInfo());
});

/* DELETE Op info */
router.get('/delete', function(req, res) {
	var pname = req.query.pname;
	utils.deleteOpInfo(pname, function(ops) {
		if (!!ops) {
			res.json({
				code: 1,
				list: ops
			});
		} else {
			res.json(RET.FILE_DELETE_ERROR);
		}
	});
});

/* UPDATE Op info */
router.get('/update', function(req, res) {
	var pname = req.query.pname,
		op = req.query.op;

	utils.updateOpInfo(pname, op, function(ops) {
		if (!!ops) {
			res.json({
				code: 1,
				list: ops
			});
		} else {
			res.json(RET.FILE_UPDATE_ERROR);
		}
	});
});

/* POST receive apk */
router.post('/upload', multipart(), function(req, res) {

	var filePath = req.files.apk.path,
		filename = req.files.apk.originalFilename;

	utils.upload(filePath, filename, function(data) {
		if (!!data) {
			res.json(data);
		} else {
			res.json(RET.UPLOAD_ERROR);
		}
	});
});

router.get('/version', multipart(), function(req, res) {

	var url = "http:\/\/192.168.2.231:3001\/data\/apkm_v3.0.apk"

	res.json({
		version: "3.0",
		url: url,
		sizeInfo: "984GB"
	});
});

module.exports = router;