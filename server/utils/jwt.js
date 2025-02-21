const jwt = require("jsonwebtoken")
const secret = "lsm"
const logger = require("../config/logger")

const jwtUtil = {
  generate(playload, expires) {
    return jwt.sign(playload, secret, { expiresIn: expires })
  },
  verify(token) {
    return jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        logger.err(err)
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
      }
    })
  },
}

module.exports = jwtUtil
