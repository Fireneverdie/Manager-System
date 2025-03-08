const { query } = require("../config/db")
const fsExtra = require("fs-extra")
const path = require("path")
const logger = require("../config/logger")
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
    try {
      //判断当前删除的用户是否存在
      const user = (await UserService.getById(id))[0]
      if (!user) throw new Error("删除的用户不存在")

      // 删除用户
      const sql = "DELETE FROM users WHERE id = ?"
      const result = await query(sql, [id])

      //获取用户的头像存储再服务器上的图片
      if (user.avatar) {
        const fullPath = path
          .join(__dirname, "..", user.avatar)
          .replace(/\\/g, "/")
        if (fsExtra.existsSync(fullPath)) {
          try {
            await fsExtra.remove(fullPath)
          } catch (removeErr) {
            logger.error(`Failed to delete file at ${fullPath}:`)
            throw removeErr
          }
        }
      }

      return result
    } catch (err) {
      logger.error("删除用户失败:", err)
      throw err // 或返回统一错误格式
    }
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
