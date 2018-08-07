const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveCodeSchema = new Schema({
    code: String,
    descr: String,
});

module.exports = mongoose.model('LeaveCode', leaveCodeSchema);