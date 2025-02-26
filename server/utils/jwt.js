const jwt = require("jsonwebtoken")
const secret = "lsm"
const logger = require("../config/logger")

const jwtUtil = {
  generate(payload, expires) {
    return jwt.sign(payload, secret, { expiresIn: expires })
  },
  verify(token) {
    try {
      return jwt.verify(token, secret) // 直接返回解码后的 payload
    } catch (err) {
      logger.err(err) // 记录错误日志
      return null // 返回 null 表示校验失败
    }
  },
}

module.exports = jwtUtil
