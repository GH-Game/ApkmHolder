var path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec,
	moment = require('moment');

var opDao = require('../models/Operation.js');

var FILEDIR = './public/data/',
	RESOURCE_PATH = FILEDIR + 'res/',
	UNINSTALL_PATH = FILEDIR + 'uninstall.json';

var Utils = function() {};

Utils.prototype = {
	pullOpInfo: function(callback) {
		opDao.findAll(function(err, ops) {
			if (!err) {
				callback(ops)
			} else {
				console.log(err);
				callback();
			}
		});
	},
	pushOpInfo: function(callback) {
		var op = {
			op_type: 1,
			time: new Date().toLocaleString(),
			package_name: "com.example.appb",
			file_name: "appb.apk",
			user_id: 'ty'
		};

		opDao.save(op, function(err) {
			if (!err) {
				callback(op)
			} else {
				console.log(err);
				callback();
			}
		});
	},
	insertOpInfo: function(obj, callback) {
		var op = {
			op_type: 0,
			time: moment().format("YYYY-MM-DD HH:mm:ss"),
			package_name: obj.pname,
			file_name: obj.fname,
			user_id: 'ty'
		};

		opDao.save(op, function(err) {
			if (!err) {
				callback(op)
			} else {
				callback();
			}
		});
	},
	getOpInfo: function(callback) {
		opDao.findAll(function(err, ops) {
			if (!err) {
				callback(ops)
			} else {
				console.log(err);
				callback();
			}
		});
	},
	deleteOpInfo: function(pname, callback) {
		var _this = this;

		opDao.delete(pname, function(err) {
			if (!err) {
				_this.getOpInfo(callback);
			} else {
				console.log(err);
				callback();
			}
		});
	},
	updateOpInfo: function(pname, op, callback) {
		var _this = this;

		opDao.update({
			pname: pname,
			op: op
		}, function(err) {
			if (!err) {
				_this.getOpInfo(callback);
			} else {
				console.log(err);
				callback();
			}
		});
	},
	upload: function(filePath, filename, callback) {
		var newPath = FILEDIR + filename,
			_this = this;

		fs.readFile(filePath, function(err, data) {
			if (err) {
				callback();
			}

			fs.writeFile(newPath, data, function(err) {
				if (!err) {
					// GET package_name
					_this.getPackageName(filename, function(pname) {
						_this.insertOpInfo({
							pname: pname,
							fname: filename
						}, function(op) {
							if (!!op) {
								_this.getOpInfo(callback);
							} else {
								callback();
							}
						});
					});
				} else {
					callback();
				}
			});
		});
	},
	setText: function(type, filePath, callback) {
		var newPath = '';

		if( type == 1 ){
			newPath = RESOURCE_PATH + '喊话内容.txt';
		}else if(type == 2){
			newPath = RESOURCE_PATH + '手机文本.txt';
		}

		fs.readFile(filePath, function(err, data) {
			if (err) {
				callback(err);
			}

			fs.writeFile(newPath, data, function(err) {
				if (err) {
					callback(err)
				} else {
					callback();
				}
			});
		});
	},
	getText: function(type, callback) {
		if (type == 1) {
			callback(fs.readFileSync(FILEDIR+'喊话内容.txt','utf-8'));
		} else if (type == 2) {
			callback(fs.readFileSync(FILEDIR+'手机文本.txt','utf-8'));
		}
	},
	setUninstallList: function(list, callback) {
		var data = {};

		data.list = [];
		for (var i = 0, len = list.length; i < len; i++) {
			data.list.push({
				package_name: list[i],
				file_name: '',
				op_type: 2,
				user_id: 'ty',
				time: new Date()
			});
		}

		fs.writeFile(UNINSTALL_PATH, JSON.stringify(data), function(err) {
			if (err) {
				callback(err);
			} else {
				callback();
			}
		});
	},
	getUninstallList: function() {
		return JSON.parse(fs.readFileSync(UNINSTALL_PATH));
	},
	getPackageName: function(filename, callback) {
		var cmd = './bin/aapt dump badging ' + __dirname.substring(0, __dirname.lastIndexOf('/')) + '/public/data/' + filename,
			last = exec(cmd);

		last.stdout.on('data', function(data) {
			var package_name = '',
				reg = /name='(.*?)'\s*v/g;

			callback(data.match(reg)[0].split('\'')[1]);
		});
	}
};

module.exports = new Utils();