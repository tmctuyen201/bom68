
let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
	game: {type: String,  required: true, index:true},      // Tên game
	red:  {type: mongoose.Schema.Types.Long, required: true},                   // Hũ Xu hoặc Hũ Red
	redPlay: {type: mongoose.Schema.Types.Long, default: 0}, // Tổng Red đã chơi
	redWin:  {type: mongoose.Schema.Types.Long, default: 0}, // Tổng Red thắng
	redLost: {type: mongoose.Schema.Types.Long, default: 0}, // Tổng Red thua
});

Schema.index({game:1}, {background: true});

module.exports = mongoose.model('bank_xocxoc', Schema);
