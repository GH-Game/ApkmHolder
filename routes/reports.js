var express = require('express');
var router = express.Router();

/* APLMHolder Helper */
var utils = require('../controllers/reportUtils.js'),
	RET = require('../models/RetCode.js');

/* GET home page. */
router.get('/:time', function(req, res) {

	var time = req.params.time;

	if (!!time) {
		if (time == 'list') {
			res.render('report/index', {
				title: '数据统计 时间列表'
			});
		} else {

			res.render('report/res/' + time, {
				title: '数据统计 ' + time,
				error: '404'
			});
		}
	}
});

router.get('/', function(req, res) {
	res.render('report/index', {
		title: '数据统计 时间列表'
	});
});

router.get('/chart/:type', function(req, res) {
	var type = req.params.type;

	utils.getChartData(type, function(data) {
		var ret = {
			data: data
		};

		res.render('report/chart/' + type, {
			title: '数据统计 曲线',
			data: JSON.stringify(ret)
		});
	});
});

module.exports = router;