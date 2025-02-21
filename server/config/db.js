const mysql = require("mysql2/promise") // 使用Promise API
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("./db-propertice")
const logger = require("./logger")

// 创建连接池
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true, // 无可用连接时等待
  connectionLimit: 10, // 最大连接数
  queueLimit: 0, // 无等待队列限制
})

/**
 * 执行SQL查询（自动管理连接）
 * @param {string} sql SQL语句
 * @param {array} params 参数数组
 * @returns {Promise<array>} 查询结果
 */
const query = async (sql, params) => {
  const [result] = await pool.execute(sql, params)
  return result
}

/**
 * 获取连接（用于事务）
 * @returns {Promise<Connection>} 数据库连接
 */
const getConnection = async () => {
  return await pool.getConnection()
}

// 监听SIGINT信号
process.on("SIGINT", () => {
  logger.info("接收到关闭信号，正在关闭数据库连接...")
  // 关闭连接池，等待所有连接都被释放再关闭
  pool.end((err) => {
    if (err) {
      logger.err("关闭数据库连接失败:", err)
      process.exit(1) // 强制退出程序并返回状态码1表示异常退出
    } else {
      ogger.info("数据库连接已成功关闭")
      process.exit(0) // 正常退出程序
    }
  })
})

module.exports = { query, getConnection }
