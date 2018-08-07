//////                                          /////////
// Repository NOT UPDATED for MYSQL version YET /////////
//////                                          /////////

// ****** Set up default MYSQL connection START ****** //
require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});
const Schema = sequelize.Schema;

sequelize.authenticate().then(() => { console.log('conneted to MYSQL- ElishERP database'); })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// ****** Set up default MYSQL connection END ****** //

const User = sequelize.define('user', {
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  roles: { type: Sequelize.STRING }
});
/** 
// force: true will drop the table if it already exists
User.sync({force: false}).then(() => {
  // Table created
  return User.create({
    name: 'Amit Shukla',
    email: 'amit@elishconsulting.com',
    password: 'amit@elishconsulting.com',
    roles: "admin"
  });
});
*/
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const User = require('../models/mysql/user');
const _ = require('lodash');
const { noRoleError } = require('./../errors/error');

const authenticateUser_C = input => {
  //return User.find({ _id: input.id }, { roles: 1 }); // do not feed password back to query, password stays in database
  return User.findOne({
    where: { id: input.id }
  }).then((res) => {
    return [{
      id: res.dataValues.id,
      name: res.dataValues.name,
      email: res.dataValues.email,
      roles: res.dataValues.roles.split(',')
    }];
  }
  );
};
const checkUserExists_C = input => {
  //return User.find({ email: input.email }, { name:1, email: 1, roles: 1 });
  return User.findOne({
    where: { email: input.email }
  }).then((res) => {
    return [{
      name: res.dataValues.name,
      email: res.dataValues.email,
      roles: res.dataValues.roles.split(',')
    }];
  }
  );
};

const loginUser_C = input => {
  return User.findOne({
    where: { email: input.email, password: input.password }
  }).then((res) => {
    if(res.length > 0) {
    return [{
      password: jwt.sign(
        { id: res.dataValues.id, email: res.dataValues.email, name: res.dataValues.name },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
      )
    }];
  }
}
  );
  // do not feed password back to query, password stays in database
}
const addUser_C = input => {
  input.roles = ["dummy"]; // assign a dummy roles at first time user is created
  let user = new User(input);
  return User.findOne({
    where: { email: input.email }
  }).then((res) => {
    if(res) {
      return {name:"",email:"", password: ""};
    } else {
      return User.create({ name: input.name, email: input.email, password: input.password, roles: input.roles.join(',') }).then((res) => {
        return input;
      });
    }
  });
}

const updateUser_C = input => {
  // don't let user update his own role, only admin can update roles
  User.update({ name: input.name, email: input.email, password: input.password }, { where: { id: input.id } }).then((res) => {
    return input;
  });
};

const updateUserAdmin_C = input => {
  console.log("input:"+input)
  return User.findOne({
    where: { id: input.myid }
  }).then((res) => {
    if (_.intersectionWith(res.dataValues.roles.split(','), input.expectedRoles, _.isEqual).length >= 1) {
      // don't let user update his own role, only admin can update roles
      User.update({ roles: input.roles.join(',') }, { where: { id: input.id } }).then((res) => {
        return input;
      });
    } else {
      //throw new noRoleError();
    }
  }
  );
};

module.exports = {
  authenticateUser_C,
  checkUserExists_C,
  loginUser_C,
  addUser_C,
  updateUser_C,
  updateUserAdmin_C
};