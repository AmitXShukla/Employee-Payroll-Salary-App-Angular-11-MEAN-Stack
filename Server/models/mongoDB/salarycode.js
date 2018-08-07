const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalaryCodeSchema = new Schema({
    code: String,
    descr: String,
    bsalary: String,
    line: [{
        frequency: String,
        ptype: String,
        payval: String,
        amount: String
    }],
    gamount: String
});

module.exports = mongoose.model('SalaryCode', SalaryCodeSchema);