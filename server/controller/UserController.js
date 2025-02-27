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
  add: async (req, res) => {
    const { username, role, password } = req.body
    const avatarFile = req.file

    const avatar = avatarFile ? `/public/users/avatar/${req.file.filename}` : ""

    const result = await UserService.add({ username, role, password, avatar })

    console.log(result)
    return res.send(Result.success("添加成功"))
  },
  list: async (req, res) => {
    const result = await UserService.list()
    return res.json(Result.success("操作成功", result))
  },
  delete: async (req, res) => {
    const { id } = req.params
    const result = await UserService.delete(id)
    logger.info(`这是result的 值 ${result}`)
    return res.json(Result.success("删除成功"))
  },
  update: async (req, res) => {
    const { id, username, role, password } = req.body
    const avatarFile = req.file

    const avatar = avatarFile ? `/public/users/avatar/${req.file.filename}` : ""

    const result = await UserService.update({
      id,
      username,
      role,
      avatar,
      password,
    })
    return res.json(Result.success("更新成功"))
  },
  getById: async (req, res) => {
    const { id } = req.params
    const result = await UserService.getById(id)
    return res.json(Result.success("操作成功", result[0]))
  },
}
module.exports = UserController
