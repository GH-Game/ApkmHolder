var mongodb = require('./Mongodb.js');
var Schema = mongodb.mongoose.Schema;

var OpSchema = new Schema({
	package_name: String,
	file_name: String,
	op_type: Number, // 1:install, 2:uninstall
	user_id: String,
	time: String
});

var Operation = mongodb.mongoose.model("Operation", OpSchema);

var OperationDAO = function() {};

OperationDAO.prototype = {
	save: function(obj, callback) {
		var instance = new Operation(obj);
		instance.save(function(err) {
			console.log(err);
			callback(err);
		});
	},
	findAll: function(callback) {
		Operation.find({}, null, {
			sort: {
				time: -1
			}
		}, function(err, docs) {
			callback(err, docs);
		});
	},
	findInstall: function(callback) {
		Operation.find({
				op_type: 1
			}, null, {
				sort: {
					time: -1
				}
			},
			function(err, obj) {
				callback(err, obj);
			});
	},
	findUninstall: function(callback) {
		Operation.find({
			op_type: 2
		}, null, {
			sort: {
				time: 1
			}
		}, function(err, obj) {
			callback(err, obj);
		});
	},
	update: function(obj, callback) {
		Operation.update({
			package_name: obj.pname
		}, {
			$set: {
				op_type: obj.op
			}
		}, {
			multi: true
		}, function(err) {
			callback(err);
		});
	},
	delete: function(pname, callback) {
		Operation.update({
			package_name: pname
		}, {
			$set: {
				op_type: 0
			}
		}, {
			multi: true
		}, function(err) {
			callback(err);
		});
	}
};

module.exports = new OperationDAO();