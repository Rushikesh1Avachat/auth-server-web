const User = require('../models/userModel');

async function getAllUser() {
  return await User.find();
}

async function findUser({ id, email, username }, selectField = false) {
  const query = {};
  if (id) query._id = id;
  if (email) query.email = email;
  if (username) query.username = username;

  // use $or operator to allow finding by id, email or username
  const userQuery = User.findOne({
    $or: [
      id ? { _id: id } : null,
      email ? { email } : null,
      username ? { username } : null,
    ].filter(Boolean),
  });
  if (selectField) {
    userQuery.select(`${selectField.join(' ')}`);
  }
  return await userQuery;
}

async function createUserOrUpdate(userData, updateUser) {
  // in the case of update dynamic keys
  if (Boolean(updateUser)) {
    for (let key in userData) {
      updateUser[key] = userData[key];
    }
    console.log(updateUser, 'from update user');
    return await updateUser?.save();
  }
  const data = new User(userData);
  return await data.save();
}

module.exports = {
  findUser,
  createUserOrUpdate,
  getAllUser,
};
