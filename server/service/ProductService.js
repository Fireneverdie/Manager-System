const { query } = require("../config/db")
const logger = require("../config/logger")
const fsExtra = require("fs-extra")
const path = require("path")

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
      //获取产品信息
      const product = (await ProductService.getById(id))[0]
      if (!product) throw new Error("找不到指定的产品")

      //删除数据库中的产品记录
      const sql = "DELETE FROM product WHERE id = ?"
      const result = await query(sql, [id])

      //删除服务器上的图片文件
      const fullPath = path
        .join(__dirname, "..", product.cover)
        .replace(/\\/g, "/")
      if (product.cover && fsExtra.existsSync(fullPath)) {
        // 删除逻辑...
        try {
          await fsExtra.remove(fullPath)
          console.log(`File deleted successfully at ${fullPath}`) // 成功删除的信息
        } catch (removeErr) {
          console.error(`Failed to delete file at ${fullPath}:`, removeErr) // 错误信息
          // 根据需要决定是否抛出异常
          // throw removeErr;
        }
      } else {
        console.warn(`File does not exist or cover is undefined: ${fullPath}`)
      }

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
