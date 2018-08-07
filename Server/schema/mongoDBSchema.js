const { makeExecutableSchema } = require('graphql-tools');
const { // define resolvers
  getUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  updateUser_R,
  updateUserAdmin_R,
  setJobCode_R,
  setJobCodeDoc_R,
  getJobCode_R,
  delJobCodeDoc_R,
  setLeaveCode_R,
  setLeaveCodeDoc_R,
  getLeaveCode_R,
  delLeaveCodeDoc_R,
  setSalaryCode_R,
  setSalaryCodeDoc_R,
  getSalaryCode_R,
  delSalaryCodeDoc_R,
  setVoucher_R,
  setVoucherDoc_R,
  getVoucher_R,
  delVoucherDoc_R,
  setEmployee_R,
  setEmployeeDoc_R,
  getEmployee_R,
  delEmployeeDoc_R,
  setSalaryVoucher_R,
  getSalaryVoucher_R,
  setSalaryVoucherDoc_R,
  delSalaryVoucherDoc_R,
} = require('.././resolvers/mongoDBResolver');
const { // define mongodb connectors
  getUser_C,
  checkUserExists_C,
  loginUser_C,
  addUser_C,
  updateUser_C,
  updateUserAdmin_C,
  setJobCode_C,
  setJobCodeDoc_C,
  getJobCode_C,
  delJobCodeDoc_C,
  setLeaveCode_C,
  setLeaveCodeDoc_C,
  getLeaveCode_C,
  delLeaveCodeDoc_C,
  setSalaryCode_C,
  setSalaryCodeDoc_C,
  getSalaryCode_C,
  delSalaryCodeDoc_C,
  setVoucher_C,
  setVoucherDoc_C,
  getVoucher_C,
  delVoucherDoc_C,
  setEmployee_C,
  setEmployeeDoc_C,
  getEmployee_C,
  delEmployeeDoc_C,
  setSalaryVoucher_C,
  getSalaryVoucher_C,
  setSalaryVoucherDoc_C,
  delSalaryVoucherDoc_C,
} = require('../connectors/mongoDB');

// passwrd field on type User shouldn't expose passwords
// instead is used to store json token after successfull login query - loginUser_Q
// it's ok to leave password at UserInput at Mutation
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    message: String
  }
  type Role {
    roles: [String]!
  }
  type UserPref {
    name: String!
    email: String!
    message: String
  }
  type UserExists {
    name: String!
    email: String!
    message: String
  }
  type LoginUser {
    token: String!
    message: String!
  }
  type Code{
    ID: String
    code: String
    descr: String
    message: String
  }
  type JobCode {
    _id: String
    code: String!
    descr: String!
    job_role: String
    job_duty: String
    job_descr: String
    comments: String
    message: String
  }
  type LeaveCode {
    _id: String
    code: String
    descr: String
    message: String
  }
  type SalaryCode {
    _id: String
    code: String
    descr: String
    bsalary: String
    line: [LineOutput]
    gamount: String
    message: String
  }
  type DelCode {
    message: String
  }
  type LineOutput {
    frequency: String
    ptype: String
    payval: String
    amount: String
  }
  input Line {
    frequency: String
    ptype: String
    payval: String
    amount: String
  }
  input ADDRESS {
    ADD_TYPE: String
    ADD_LINE_1: String
    ADD_LINE_2: String
    PIN_CODE: String
    STATE: String
    COUNTRY: String
  }
  type ADDRESSType {
    ADD_TYPE: String
    ADD_LINE_1: String
    ADD_LINE_2: String
    PIN_CODE: String
    STATE: String
    COUNTRY: String
  }
  input LINE {
    LINE_NUM: String
    LINE_NAME: String
    AMOUNT: String
  }
  type LINEType {
    LINE_NUM: String
    LINE_NAME: String
    AMOUNT: String
  }
  input PHONE {
    PHONE_TYPE: String
    PHONE_NUMBER: String
  }
  type PHONEType {
    PHONE_TYPE: String
    PHONE_NUMBER: String
  }
  input EMAILID {
    EMAIL_TYPE: String
    EMAILID: String
  }
  type EMAILIDType {
    EMAIL_TYPE: String
    EMAILID: String
  }
  type CODE {
    _id: String
    CODE: String
    DESCR: String
    message: String
  }
  type Voucher {
    _id: String
    CODE: String
    DESCR: String
    TYPE: String
    STATUS: String
    INVOICE: String
    VENDOR: String
    ADDRESS: [ADDRESSType]
    PHONE: [PHONEType]
    EMAILID: [EMAILIDType]
    EDATE: String
    RDATE: String
    DDATE: String
    PDATE: String
    LINE: [LINEType]
    GAMOUNT: String
    GAMOUNT_DISC_TYPE: String
    DISC_G_PERCENT: String
    DISC_GAMOUNT: String
    TAX_TYPE: String
    TAX_PERCENT: String
    TAX_GAMOUNT: String
    SHIP_TYPE: String
    SHIP_PERCENT: String
    SHIP_GAMOUNT: String
    FINAL_AMOUNT: String
    PAID_AMOUNT: String
    BALANCE: String
    message: String
  }
  type Employee {
    _id: String
    CODE: String
    SKEY: String
    DESCR: String
    MIDDLE_NAME: String
    LAST_NAME: String
    DOB: String
    FATHER_NAME: String
    MOTHER_NAME: String
    SPOUSE_NAME: String
    SDOB: String
    ADD_TYPE_1: String
    ADD_LINE_1: String
    ADD_LINE_2: String
    PIN_CODE: String
    STATE: String
    COUNTRY: String
    ADD_TYPE_2: String
    ADD_LINE_12: String
    ADD_LINE_22: String
    PIN_CODE2: String
    STATE2: String
    COUNTRY2: String
    MOBILE1: String
    MOBILE2: String
    EMAIL1: String
    EMAIL2: String
    DEGREE: String
    COLLEGE: String
    ADD_LINE_C1: String
    ADD_LINE_C2: String
    PIN_CODE_C: String
    STATE_C: String
    COUNTRY_C: String
    REFERENCE_1: String
    REFERENCE_1_ADD: String
    REFERENCE_2: String
    REFERENCE_2_ADD: String
    JOB_CODE: String
    SALARY_CODE: String
    LEAVE_CODE: String
    message: String
  }
  type SalaryVoucher {
    _id: String
    emplid: String
    emplskey: String
    empldescr: String
    empllastname: String
    emplsalcode: String
    paiddata: String
    code: String
    descr: String
    bsalary: String
    line: [LineOutput]
    gamount: String
    message: String
  }
  type Query {
    getUser_Q: UserExists
    checkUserExists_Q(email:String!): UserExists
    loginUser_Q(email:String!,password:String!): LoginUser
    getJobCode_Q(_id:String,code:String!,descr:String!): [JobCode]
    getLeaveCode_Q(_id:String,code:String!,descr:String!): [LeaveCode]
    getSalaryCode_Q(_id:String,code:String!,descr:String!): [SalaryCode]
    getVoucher_Q(_id:String,CODE:String,DESCR:String): [Voucher]
    getEmployee_Q(_id:String,CODE:String,DESCR:String): [Employee]
    getSalaryVoucher_Q(_id:String,code:String,descr:String): [SalaryVoucher]
  }
  type Mutation {
    addUser_M(name:String!,email:String!,password:String!): User
    updateUser_M(name:String!,email:String!,password:String!): UserPref
    updateUserAdmin_M(id:String!,roles:[String!]!): Role
    setJobCode_M(code: String!,descr: String!,job_role: String,job_duty: String,job_descr: String,comments: String): JobCode
    setJobCodeDoc_M(_id:String,code: String!,descr: String!,job_role: String,job_duty: String,job_descr: String,comments: String): JobCode
    delJobCodeDoc_M(_id:String): DelCode
    setLeaveCode_M(code: String!,descr: String!): LeaveCode
    setLeaveCodeDoc_M(_id:String,code: String!,descr: String!): LeaveCode
    delLeaveCodeDoc_M(_id:String): DelCode
    setSalaryCode_M(code:String,descr:String,bsalary:String,line:[Line],gamount:String): Code
    setSalaryCodeDoc_M(_id:String,code:String,descr:String,bsalary:String,line:[Line],gamount:String): Code
    delSalaryCodeDoc_M(_id:String): DelCode
    setVoucher_M(CODE: String,DESCR: String,TYPE: String,STATUS: String,INVOICE: String,VENDOR: String,ADDRESS:[ADDRESS],PHONE:[PHONE],EMAILID:[EMAILID],EDATE: String,RDATE: String,DDATE: String,PDATE: String, LINE:[LINE], GAMOUNT: String, GAMOUNT_DISC_TYPE: String, DISC_G_PERCENT: String, DISC_GAMOUNT: String, TAX_TYPE: String, TAX_PERCENT: String, TAX_GAMOUNT: String, SHIP_TYPE: String, SHIP_PERCENT: String, SHIP_GAMOUNT: String, FINAL_AMOUNT: String, PAID_AMOUNT: String, BALANCE: String): CODE
    setVoucherDoc_M(_id:String,CODE: String,DESCR: String,TYPE: String,STATUS: String,INVOICE: String,VENDOR: String,ADDRESS:[ADDRESS],PHONE:[PHONE],EMAILID:[EMAILID],EDATE: String,RDATE: String,DDATE: String,PDATE: String, LINE:[LINE], GAMOUNT: String, GAMOUNT_DISC_TYPE: String, DISC_G_PERCENT: String, DISC_GAMOUNT: String, TAX_TYPE: String, TAX_PERCENT: String, TAX_GAMOUNT: String, SHIP_TYPE: String, SHIP_PERCENT: String, SHIP_GAMOUNT: String, FINAL_AMOUNT: String, PAID_AMOUNT: String, BALANCE: String): CODE
    delVoucherDoc_M(_id:String): DelCode
    setEmployee_M(CODE: String,SKEY: String,DESCR: String,MIDDLE_NAME: String,LAST_NAME: String,DOB: String,FATHER_NAME: String,MOTHER_NAME: String,SPOUSE_NAME: String,SDOB: String,ADD_TYPE_1: String,ADD_LINE_1: String,ADD_LINE_2: String,PIN_CODE: String,STATE: String,COUNTRY: String,ADD_TYPE_2: String,ADD_LINE_12: String,ADD_LINE_22: String,PIN_CODE2: String,STATE2: String,COUNTRY2: String,MOBILE1: String,MOBILE2: String,EMAIL1: String,EMAIL2: String,DEGREE: String,COLLEGE: String,ADD_LINE_C1: String,ADD_LINE_C2: String,PIN_CODE_C: String,STATE_C: String,COUNTRY_C: String,REFERENCE_1: String,REFERENCE_1_ADD: String,REFERENCE_2: String,REFERENCE_2_ADD: String,JOB_CODE: String,SALARY_CODE: String,LEAVE_CODE: String): CODE
    setEmployeeDoc_M(_id:String,CODE: String,SKEY: String,DESCR: String,MIDDLE_NAME: String,LAST_NAME: String,DOB: String,FATHER_NAME: String,MOTHER_NAME: String,SPOUSE_NAME: String,SDOB: String,ADD_TYPE_1: String,ADD_LINE_1: String,ADD_LINE_2: String,PIN_CODE: String,STATE: String,COUNTRY: String,ADD_TYPE_2: String,ADD_LINE_12: String,ADD_LINE_22: String,PIN_CODE2: String,STATE2: String,COUNTRY2: String,MOBILE1: String,MOBILE2: String,EMAIL1: String,EMAIL2: String,DEGREE: String,COLLEGE: String,ADD_LINE_C1: String,ADD_LINE_C2: String,PIN_CODE_C: String,STATE_C: String,COUNTRY_C: String,REFERENCE_1: String,REFERENCE_1_ADD: String,REFERENCE_2: String,REFERENCE_2_ADD: String,JOB_CODE: String,SALARY_CODE: String,LEAVE_CODE: String): CODE
    delEmployeeDoc_M(_id:String): DelCode
    setSalaryVoucher_M(emplid:String,emplskey:String,empldescr: String,empllastname: String,emplsalcode: String,paiddata: String,code:String,descr:String,bsalary:String,line:[Line],gamount:String): Code
    setSalaryVoucherDoc_M(_id:String,emplid: String,emplskey: String,empldescr: String,empllastname: String,emplsalcode: String,paiddata: String,code:String,descr:String,bsalary:String,line:[Line],gamount:String): Code
    delSalaryVoucherDoc_M(_id:String): DelCode
  }
`;

const resolvers = {
  Query: {
    getUser_Q: (_, args, context) => getUser_R(context, getUser_C),
    checkUserExists_Q: (_, args, context) => checkUserExists_R(args, checkUserExists_C), //check if user email already exists, for new user id creation
    loginUser_Q: (_, args, context) => loginUser_R(args, loginUser_C),
    getJobCode_Q: (_, args, context) => getJobCode_R(context, args, ["admin", "owner", "dummy"], getJobCode_C),
    getLeaveCode_Q: (_, args, context) => getLeaveCode_R(context, args, ["admin", "owner", "dummy"], getLeaveCode_C),
    getSalaryCode_Q: (_, args, context) => getSalaryCode_R(context, args, ["admin", "owner", "dummy"], getSalaryCode_C),
    getVoucher_Q: (_, args, context) => getVoucher_R(context, args, ["admin", "owner", "dummy"], getVoucher_C),
    getEmployee_Q: (_, args, context) => getEmployee_R(context, args, ["admin", "owner", "dummy"], getEmployee_C),
    getSalaryVoucher_Q: (_, args, context) => getSalaryVoucher_R(context, args, ["admin", "owner", "dummy"], getSalaryVoucher_C),
  },
  Mutation: {
    addUser_M: (_, args, context) => addUser_R(args, addUser_C), // first time user is created see - connector where a dummy role is inserted
    updateUser_M: (_, args, context) => updateUser_R(context, args, updateUser_C), //check jwt token, validate if user is self then update own email & password but NOT the roles
    updateUserAdmin_M: (_, args, context) => updateUserAdmin_R(context, args, ["admin", "owner"], updateUserAdmin_C), //check jwt token, validate if user is admin then update any other user's roles
    setJobCode_M: (_, args, context) => setJobCode_R(context, args, ["admin", "owner", "dummy"], setJobCode_C),
    setJobCodeDoc_M: (_, args, context) => setJobCodeDoc_R(context, args, ["admin", "owner", "dummy"], setJobCodeDoc_C),
    delJobCodeDoc_M: (_, args, context) => delJobCodeDoc_R(context, args, ["admin", "owner", "dummy"], delJobCodeDoc_C),
    setLeaveCode_M: (_, args, context) => setLeaveCode_R(context, args, ["admin", "owner", "dummy"], setLeaveCode_C),
    setLeaveCodeDoc_M: (_, args, context) => setLeaveCodeDoc_R(context, args, ["admin", "owner", "dummy"], setLeaveCodeDoc_C),
    delLeaveCodeDoc_M: (_, args, context) => delLeaveCodeDoc_R(context, args, ["admin", "owner", "dummy"], delLeaveCodeDoc_C),
    setSalaryCode_M: (_, args, context) => setSalaryCode_R(context, args, ["admin", "owner", "dummy"], setSalaryCode_C),
    setSalaryCodeDoc_M: (_, args, context) => setSalaryCodeDoc_R(context, args, ["admin", "owner", "dummy"], setSalaryCodeDoc_C),
    delSalaryCodeDoc_M: (_, args, context) => delSalaryCodeDoc_R(context, args, ["admin", "owner", "dummy"], delSalaryCodeDoc_C),
    setVoucher_M: (_, args, context) => setVoucher_R(context, args, ["admin", "owner", "dummy"], setVoucher_C),
    setVoucherDoc_M: (_, args, context) => setVoucherDoc_R(context, args, ["admin", "owner", "dummy"], setVoucherDoc_C),
    delVoucherDoc_M: (_, args, context) => delVoucherDoc_R(context, args, ["admin", "owner", "dummy"], delVoucherDoc_C),
    setEmployee_M: (_, args, context) => setEmployee_R(context, args, ["admin", "owner", "dummy"], setEmployee_C),
    setEmployeeDoc_M: (_, args, context) => setEmployeeDoc_R(context, args, ["admin", "owner", "dummy"], setEmployeeDoc_C),
    delEmployeeDoc_M: (_, args, context) => delEmployeeDoc_R(context, args, ["admin", "owner", "dummy"], delEmployeeDoc_C),
    setSalaryVoucher_M: (_, args, context) => setSalaryVoucher_R(context, args, ["admin", "owner", "dummy"], setSalaryVoucher_C),
    setSalaryVoucherDoc_M: (_, args, context) => setSalaryVoucherDoc_R(context, args, ["admin", "owner", "dummy"], setSalaryVoucherDoc_C),
    delSalaryVoucherDoc_M: (_, args, context) => delSalaryVoucherDoc_R(context, args, ["admin", "owner", "dummy"], delSalaryVoucherDoc_C),
  }
};

module.exports = new makeExecutableSchema({ typeDefs, resolvers });