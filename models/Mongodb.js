var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apkmholder');
exports.mongoose = mongoose;