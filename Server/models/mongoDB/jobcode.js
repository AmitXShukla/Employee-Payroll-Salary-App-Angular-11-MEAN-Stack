const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobCodeSchema = new Schema({
    code: String,
    descr: String,
    job_role: String,
    job_duty: String,
    job_descr: String,
    comments: String
});

module.exports = mongoose.model('JobCode', jobCodeSchema);