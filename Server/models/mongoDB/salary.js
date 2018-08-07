const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalaryVoucherSchema = new Schema({
    emplid: String,
    emplskey: String,
    empldescr: String,
    empllastname: String,
    emplsalcode: String,
    paiddata: String,
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

module.exports = mongoose.model('SalaryVoucher', SalaryVoucherSchema);