const jwtUtil = require("../utils/jwt")
const logger = require("../config/logger")
const Result = require("../model/Result")
const UserService = require("../service/UserService")
const UserController = {
  login: async (req, res) => {
    const { username, password } = req.body

    logger.info(`login info: username->${username}, password->${password}`)
    const result = await UserService.login(username)
    if (result.length === 0) {
      res.json(Result.error("用户不存在"))
    }

    if (!result[0].password === password)
      res.json(Result.error("用户名或者密码错误"))

    const token = jwtUtil.generate(
      {
        id: result[0].id,
        username,
      },
      "1h"
    )
    res.header("Authorization", token)
    res.json(
      Result.success("登录成功", {
        id: result[0].id,
        username: result[0].username,
        avatar: result[0].avatar,
        role: result[0].role,
      })
    )
  },
}
module.exports = UserController
