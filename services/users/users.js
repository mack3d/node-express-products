const Users = require("../../models/user-schema")

exports.getUserData = async (data) => {
  const { username } = data
  const result = await Users.findOne({ username: username })
  return { userdata: result }
}
