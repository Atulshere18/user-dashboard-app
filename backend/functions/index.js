const { getUsers } = require('./user/getusers');
const { createUser } = require('./user/createUser');
const { updateUser } = require('./user/updateUser');
const { deleteUser } = require('./user/deleteUser');

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
