const jwt = require('jsonwebtoken');
const { AuthorizationError, noInputError } = require('./../errors/error');

function checkToken(context) {
  const token = context.headers.token;
  if (!token) {
    throw new AuthorizationError({
      message: `You must supply a JWT for authorization!`
    });
  }
  const decoded = jwt.verify(
    token.replace('Bearer ', ''),
    process.env.JWT_SECRET
  );
  return decoded;
}

const getUser_R = (context, connectorQuery) => {
  return connectorQuery.apply(this, [checkToken(context)]);
};

const checkUserExists_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
  });
}
  return connectorQuery.apply(this, [input]);
};

const loginUser_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
  });
}
  return connectorQuery.apply(this, [input]);
};

const addUser_R = (input, connectorQuery) => {
  if(!input) {
    throw new noInputError({
      message: `You must supply a valid Input!`
  });
}
  return connectorQuery.apply(this, [input]);
};

const updateUser_R = (context,input,connectorQuery) => {
  input["id"] = checkToken(context).id;
  return connectorQuery.apply(this, [input]);
};

const updateUserAdmin_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
//jobcodes functions
const setJobCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setJobCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getJobCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delJobCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
//leavecodes functions
const setLeaveCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setLeaveCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getLeaveCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delLeaveCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
// salary code functions
const setSalaryCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setSalaryCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getSalaryCode_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delSalaryCodeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
// voucher functions
const setVoucher_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setVoucherDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getVoucher_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delVoucherDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
// employee functions
const setEmployee_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setEmployeeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getEmployee_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delEmployeeDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
// salary voucher functions
const setSalaryVoucher_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const setSalaryVoucherDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const getSalaryVoucher_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}
const delSalaryVoucherDoc_R = (context, input, expectedRoles, connectorQuery) => {
  input["myid"] = checkToken(context).id;
  input["expectedRoles"] = expectedRoles;
  return connectorQuery.apply(this, [input]);
}

module.exports = { 
  getUser_R,
  checkUserExists_R,
  loginUser_R,
  addUser_R,
  updateUser_R,
  updateUserAdmin_R,
  setJobCode_R,
  getJobCode_R,
  setJobCodeDoc_R,
  delJobCodeDoc_R,
  setLeaveCode_R,
  getLeaveCode_R,
  setLeaveCodeDoc_R,
  delLeaveCodeDoc_R,
  setSalaryCode_R,
  getSalaryCode_R,
  setSalaryCodeDoc_R,
  delSalaryCodeDoc_R,
  setVoucher_R,
  getVoucher_R,
  setVoucherDoc_R,
  delVoucherDoc_R,
  setEmployee_R,
  getEmployee_R,
  setEmployeeDoc_R,
  delEmployeeDoc_R,
  setSalaryVoucher_R,
  getSalaryVoucher_R,
  setSalaryVoucherDoc_R,
  delSalaryVoucherDoc_R,
};