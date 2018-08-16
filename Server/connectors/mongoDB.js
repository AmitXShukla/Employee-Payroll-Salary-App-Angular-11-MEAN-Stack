const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/mongoDB/user');
const JobCode = require('../models/mongoDB/jobcode');
const LeaveCode = require('../models/mongoDB/leavecode');
const SalaryCode = require('../models/mongoDB/salarycode');
const Voucher = require('../models/mongoDB/voucher');
const Employee = require('../models/mongoDB/employee');
const SalaryVoucher = require('../models/mongoDB/salary');

const _ = require('lodash');
const { noRoleError } = require('./../errors/error');

function checkRoles(input) {
  return User.findOne({ _id: input.myid }).then((res) => {
    if (res > "") {
      if (_.intersectionWith(res.roles, input.expectedRoles, _.isEqual).length >= 1) {
        return { authenticated: true };
      } else return { authenticated: false };
    } else return { authenticated: false };
  });
}

const getUser_C = user => {
  //return User.find({ _id: user.id }, { roles: 1 }); // do not feed password back to query, password stays in database
  return User.find({ _id: user.id }).then((res) => {
    if (res.length > 0) {
      return { name: res[0].name, email: res[0].email, message : "User not found, Please logout and login again." }
    } else {
      return { name: "", email: "", message : "User not found, Please logout and login again." };
    }
  });
};
const checkUserExists_C = input => {
  return User.find({ email: input.email }, { name: 1, email: 1, roles: 1 });
};

const loginUser_C = input => {
  return User.find({ email: input.email, password: input.password }).then((res) => {
    //after successfull login, return JWT token
    // do not feed password back to query, password stays in database
    if (res.length > 0) {
      pswd = jwt.sign(
        { id: res[0].id, email: res[0].email, name: res[0].name },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      );
      return { token: pswd, message: "" };
    } else {
      return { token: "", message: "UserID/Password didn't match with records." };
    }
  }
  );
}

const addUser_C = input => {
  input.roles = ["dummy"]; // assign a dummy roles at first time user is created
  let user = new User(input);
  return User.find({ email: input.email }).then((res) => {
    if (res.length > 0) {
      return { name: "", email: "", password: "", message : "User email is already taken." };
    } else {
      user.save();
      return input
    }
  });
}

const updateUser_C = input => {
  // don't let user update his own role, only admin can update roles
  return User.findByIdAndUpdate(input.id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { name: res.name, email: res.email, message: "Success" };
    } else {
      return { name: "", email: "", message: "Not able to update data." };
    }
  });
};

const updateUserAdmin_C = input => {
  // don't let user update his own role, only admin can update roles
  return User.findOne({ _id: input.myid }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (_.intersectionWith(docs.roles, input.expectedRoles, _.isEqual).length >= 1) {
        User.findByIdAndUpdate(input.id, input, function (err, result) {
          if (err) {
            console.log(err);
          }
          return true;
        });

      } else {
        //throw new noRoleError();
      }
    }
  });
};

// job codes functions
const setJobCode_C = input => {
  let jobcode = new JobCode(input);
  return JobCode.find({ code: input.code }).then((res) => {
    if (res != "") {
      return { code: "", message: "Code Already Exists." };
    } else {
      jobcode.save();
      return { code: input.code };
    }
  });
};
const setJobCodeDoc_C = input => {
  let jobcode = new JobCode(input);
  return JobCode.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { code: input.code, message: "Success" };
    } else {
      return { code: "", message: "Not able to update data." };
    }
  });
};
const delJobCodeDoc_C = input => {
return JobCode.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getJobCode_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return JobCode.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return JobCode.find({ code: { "$regex": input.code, "$options": "i" }, descr: { "$regex": input.descr, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", code: "", descr: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", code: "", descr: "", message: "Not Authorized" }];
    }
  })
}
// leave codes functions
const setLeaveCode_C = input => {
  let leavecode = new LeaveCode(input);
  return LeaveCode.find({ code: input.code }).then((res) => {
    if (res != "") {
      return { code: "", message: "Code Already Exists." };
    } else {
      leavecode.save();
      return { code: input.code };
    }
  });
};
const setLeaveCodeDoc_C = input => {
  return LeaveCode.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { code: input.code, message: "Success" };
    } else {
      return { code: "", message: "Not able to update data." };
    }
  });
};
const delLeaveCodeDoc_C = input => {
return LeaveCode.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getLeaveCode_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return LeaveCode.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return LeaveCode.find({ code: { "$regex": input.code, "$options": "i" }, descr: { "$regex": input.descr, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", code: "", descr: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", code: "", descr: "", message: "Not Authorized" }];
    }
  })
}
// salary codes functions
const setSalaryCode_C = input => {
  let salarycode = new SalaryCode(input);
  return SalaryCode.find({ code: input.code }).then((res) => {
    if (res != "") {
      return { code: "", message: "Code Already Exists." };
    } else {
      salarycode.save();
      return { code: input.code };
    }
  });
};
const setSalaryCodeDoc_C = input => {
  return SalaryCode.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { code: input.code, message: "Success" };
    } else {
      return { code: "", message: "Not able to update data." };
    }
  });
};
const delSalaryCodeDoc_C = input => {
return SalaryCode.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getSalaryCode_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return SalaryCode.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return SalaryCode.find({ code: { "$regex": input.code, "$options": "i" }, descr: { "$regex": input.descr, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", code: "", descr: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", code: "", descr: "", message: "Not Authorized" }];
    }
  })
}
// voucher functions
const setVoucher_C = input => {
  console.log(JSON.stringify(input))
  let voucher = new Voucher(input);
  return Voucher.find({ CODE: input.CODE }).then((res) => {
    if (res != "") {
      return { CODE: "", message: "Code Already Exists." };
    } else {
      voucher.save();
      return { CODE: input.CODE };
    }
  });
};
const setVoucherDoc_C = input => {
  return Voucher.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { CODE: input.CODE, message: "Success" };
    } else {
      return { CODE: "", message: "Not able to update data." };
    }
  });
};
const delVoucherDoc_C = input => {
return Voucher.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getVoucher_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return Voucher.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return Voucher.find({ CODE: { "$regex": input.CODE, "$options": "i" }, DESCR: { "$regex": input.DESCR, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", CODE: "", DESCR: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", CODE: "", DESCR: "", message: "Not Authorized" }];
    }
  })
}
// employee functions
const setEmployee_C = input => {
  let employee = new Employee(input);
  return Employee.find({ CODE: input.CODE }).then((res) => {
    if (res != "") {
      return { CODE: "", message: "Code Already Exists." };
    } else {
      employee.save();
      return { CODE: input.CODE };
    }
  });
};
const setEmployeeDoc_C = input => {
  return Employee.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { CODE: input.CODE, message: "Success" };
    } else {
      return { CODE: "", message: "Not able to update data." };
    }
  });
};
const delEmployeeDoc_C = input => {
return Employee.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getEmployee_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return Employee.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return Employee.find({ CODE: { "$regex": input.CODE, "$options": "i" }, DESCR: { "$regex": input.DESCR, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", CODE: "", DESCR: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", CODE: "", DESCR: "", message: "Not Authorized" }];
    }
  })
}
// employee salary functions
const setSalaryVoucher_C = input => {
  let salaryvoucher = new SalaryVoucher(input);
  return SalaryVoucher.find({ code: input.code }).then((res) => {
    if (res != "") {
      return { code: "", message: "Code Already Exists." };
    } else {
      salaryvoucher.save();
      return { code: input.code };
    }
  });
};
const setSalaryVoucherDoc_C = input => {
  return SalaryVoucher.findByIdAndUpdate(input._id, input, function (err, res) {
    if (err) {
      console.log(err);
    }
    if (res) {
      return { code: input.code, message: "Success" };
    } else {
      return { code: "", message: "Not able to update data." };
    }
  });
};
const delSalaryVoucherDoc_C = input => {
return SalaryVoucher.findByIdAndRemove(input._id, function (err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    return { message: "Success" };
  } else {
    return { message: "Not able to update data." };
  }
});
}

const getSalaryVoucher_C = input => {
  return checkRoles(input).then((res) => {
    if (res.authenticated) {
      if (input._id) {
        // search OneDocByID
        var ObjectId = require('mongoose').Types.ObjectId;
        return SalaryVoucher.findOne({ _id: new ObjectId(input._id) }).then((res)=> {
          return [res];
        });
      } else {
        // search all docs
        return SalaryVoucher.find({ code: { "$regex": input.code, "$options": "i" }, descr: { "$regex": input.descr, "$options": "i" } }).then((res) => {
          if (res != "") {
            return res;
          } else {
            return [{ _id: "", code: "", descr: "", message: "Success" }];
          }
        });
      }
    } else {
      return [{ _id: "", code: "", descr: "", message: "Not Authorized" }];
    }
  })
}

module.exports = {
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
  setSalaryVoucherDoc_C,
  getSalaryVoucher_C,
  delSalaryVoucherDoc_C,
};
