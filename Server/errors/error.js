const { createError } = require('apollo-errors');

const unKnownError = createError('unKnownError',{message: 'An unknown error has occured.'});
const inValidUserID = createError('inValidUserID',{message: 'UserID does not exists.'});
const inValidPassword = createError('inValidPassword',{message: 'UserID and password do not match. Please contact your system admin. or send an email to info@elishconsulting.com'});
const unAuthorizedError = createError('unAuthorizedError',{message: 'Your role is not permitted to perform this operatrion. Please contact your system Admin.'});
const noAdminError = createError('noAdminError',{message: 'You are not a system Admin.'});
const AuthorizationError = createError('AuthorizationError', { message: 'You are not authorized.'});
const noInputError = createError('noInputError', { message: 'No valid Input is provided.'});
const noRoleError = createError('noRoleError', { message: 'Your user profile does not have proper role to perform this operation.'});

module.exports = { AuthorizationError, noInputError, noRoleError };