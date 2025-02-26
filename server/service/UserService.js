const { query } = require("../config/db")
const UserService = {
  login: async (username) => {
    const sql = "SELECT * FROM users WHERE username = ?"
    const result = await query(sql, [username])
    return result
  },
  getById: async (id) => {
    const sql = "SELECT id,username,role,avatar FROM users WHERE id = ?"
    const result = await query(sql, [id])
    return result
  },
  add: async ({ username, password, role, avatar }) => {
    let sql = ""
    let result = null
    if (avatar) {
      sql =
        "INSERT INTO users (username, password, role, avatar) VALUES (?, ?, ?, ?)"
      return (result = await query(sql, [username, password, role, avatar]))
    } else {
      sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
      return (result = await query(sql, [username, password, role]))
    }
  },
  delete: async (id) => {
    const sql = "DELETE FROM users WHERE id = ?"
    return await query(sql, [id])
  },
  list: async () => {
    const sql = "SELECT id,username,role,avatar FROM users"
    return await query(sql)
  },
  update: async ({ id, username, password, role, avatar }) => {
    // 1. 定义基础 SQL
    let sql = "UPDATE users SET username = ?"
    const params = [username]

    const updates = []

    if (password) {
      updates.push("password = ?")
      params.push(password)
    }

    if (role) {
      updates.push("role = ?")
      params.push(role)
    }

    if (avatar) {
      updates.push("avatar = ?")
      params.push(avatar)
    }

    // 3. 合并动态字段到 SQL
    if (updates.length > 0) {
      sql += ", " + updates.join(", ")
    }

    // 4. 添加 WHERE 条件
    sql += " WHERE id = ?"
    params.push(id)

    // 5. 执行查询
    try {
      const result = await query(sql, params)
      return result
    } catch (err) {
      logger.error("更新用户失败:", err)
      throw err // 向上抛出错误供上层处理
    }
  },
}

module.exports = UserService
