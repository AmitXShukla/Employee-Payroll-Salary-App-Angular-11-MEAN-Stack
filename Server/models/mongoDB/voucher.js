const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
    CODE: String,
    DESCR: String,
    TYPE: String,
    STATUS: String,
    INVOICE: String,
    VENDOR: String,
    ADDRESS: [{
        ADD_TYPE: String,
        ADD_LINE_1: String,
        ADD_LINE_2: String,
        PIN_CODE: String,
        STATE: String,
        COUNTRY: String
    }],
    PHONE: [{
        PHONE_TYPE: String,
        PHONE_NUMBER: String
    }],
    EMAILID: [{
        EMAIL_TYPE: String,
        EMAILID: String
    }],
    EDATE: String,
    RDATE: String,
    DDATE: String,
    PDATE: String,
    LINE: [{
        LINE_NUM: String,
        LINE_NAME: String,
        AMOUNT: String
    }],
    GAMOUNT: String,
    GAMOUNT_DISC_TYPE: String,
    DISC_G_PERCENT: String,
    DISC_GAMOUNT: String,
    TAX_TYPE: String,
    TAX_PERCENT: String,
    TAX_GAMOUNT: String,
    SHIP_TYPE: String,
    SHIP_PERCENT: String,
    SHIP_GAMOUNT: String,
    FINAL_AMOUNT: String,
    PAID_AMOUNT: String,
    BALANCE: String
});

module.exports = mongoose.model('Voucher', VoucherSchema);