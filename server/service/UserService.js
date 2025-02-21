const { query } = require("../config/db")
const UserService = {
  login: async (username) => {
    const sql = "select * from users where username = ?"
    const result = await query(sql, [username])
    return result
  },
}

module.exports = UserService
