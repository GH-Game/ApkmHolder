var path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec,
	moment = require('moment');

//var opDao = require('../models/Operation.js');

var FILEDIR = './views/report/res/';

var Utils = function() {};

Utils.prototype = {
	getData: function(file, offset) {
		var raw = fs.readFileSync(FILEDIR + file,'utf-8');
			lines = raw.split('\n');

		var ret = {};

		for( var i = 0, len = lines.length; i < len; i++ ){
			var value = lines[i].trim().split(' ')[1];
			switch( value ){
				case '少年三国志':
					ret.sn = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '少年三国志(公会)':
					ret.sn_gh = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '少年三国志(360)':
					ret.sn_360 = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '少年三国志(百度)':
					ret.sn_baidu = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '少年三国志(新九游)':
					ret.sn_9u = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '放开那三国':
					ret.fk = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '放开那三国(360)':
					ret.fk_360 = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '放开那三国(百度)':
					ret.fk_baidu = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '刀塔传奇':
					ret.dt = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '新仙剑奇侠传':
					ret.xxj = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '去吧皮卡丘':
					ret.pkq = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				case '航海王启航':
					ret.hhw = parseInt(lines[i+offset].trim().split(' ')[1]);
					break;
				default:
					break;
			}
		}

		var date = file.split('.')[0],
			year = date.substr(0,4),
			month = date.substr(4,2),
			day = date.substr(6);

		ret.date = year + '-' + month + '-' + day;

		return ret;
	},
	getChartData: function(type, callback) {

		var offset = 0;
		if( type == 'add' ){
			offset = 1;
		}else if ( type == 'uv' ){
			offset = 2;
		}else if ( type == 'pv' ){
			offset = 3;
		}else if ( type == 'avg' ){
			offset = 4;
		}

		var ret = [],
			_this = this;

		fs.readdir(FILEDIR, function(err, files) {  
	        if (err) {  
	            console.log('READ_DIR_ERROR');  
	        } else {  
	            files.forEach(function(file) {  
	                ret.push(_this.getData(file, offset));
	            });  

	            callback(ret);
	        }  
	    });  
	}
};

module.exports = new Utils();