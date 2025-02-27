const { query } = require("../config/db")
const logger = require("../config/logger")

const ProductService = {
  getById: async (id) => {
    try {
      const sql = "SELECT * FROM product WHERE id = ?"
      const result = await query(sql, [id])
      return result
    } catch (err) {
      logger.error(err)
    }
  },
  list: async () => {
    try {
      const sql = "SELECT * FROM product"
      const result = await query(sql)
      return result
    } catch (err) {
      logger.error(err)
    }
  },
  delete: async (id) => {
    try {
      const sql = "DELETE FROM product WHERE id = ?"
      const result = await query(sql, [id])
      return result
    } catch (err) {
      throw err
    }
  },
  add: async ({ pro_name, coverImg, introduction }) => {
    let sql = "INSERT INTO product(name,introduction,cover) VALUES(?,?,?)"
    try {
      const result = await query(sql, [pro_name, introduction, coverImg])
      return result
    } catch (err) {
      throw err // 向上抛出错误供上层处理
    }
  },
  update: async ({ id, pro_name, coverImg, introduction }) => {
    let sql = "UPDATE product SET name = ?"
    const params = [pro_name]

    const updates = []

    if (coverImg) {
      updates.push("cover = ?")
      params.push(coverImg)
    }

    if (introduction) {
      updates.push("introduction = ?")
      params.push(introduction)
    }

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
  page: async (pageNum, pageSize) => {
    let sql = "SELECT * FROM product ORDER BY id ASC LIMIT ?,?"
    try {
      const result = await query(sql, [(pageNum - 1) * pageSize, pageSize])
      return result
    } catch (err) {
      throw err // 向上抛出错误供上层处理
    }
  },
}

module.exports = ProductService
