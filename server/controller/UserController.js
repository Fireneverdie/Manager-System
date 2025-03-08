const jwtUtil = require("../utils/jwt")
const logger = require("../config/logger")
const Result = require("../model/Result")
const UserService = require("../service/UserService")

const UserController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      logger.info(`login info: username->${username}, password->${password}`)
      const result = await UserService.login(username)
      if (result.length === 0) {
        return res.json(Result.error("用户不存在"))
      }

      if (result[0].password !== password) {
        return res.json(Result.error("用户名或者密码错误"))
      }

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
    } catch (error) {
      logger.error("登录失败:", error)
      res.status(500).json(Result.error("登录失败，服务器异常"))
    }
  },

  add: async (req, res) => {
    try {
      const { username, role, password } = req.body
      const avatarFile = req.file

      const avatar = avatarFile
        ? `/public/users/avatar/${req.file.filename}`
        : ""

      const result = await UserService.add({ username, role, password, avatar })
      res.json(Result.success("添加成功", result))
    } catch (error) {
      logger.error("添加用户失败:", error)
      res.status(500).json(Result.error("添加用户失败，服务器异常"))
    }
  },

  list: async (req, res) => {
    try {
      const result = await UserService.list()
      res.json(Result.success("操作成功", result))
    } catch (error) {
      logger.error("获取用户列表失败:", error)
      res.status(500).json(Result.error("获取用户列表失败，服务器异常"))
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params
      const result = await UserService.delete(id)
      res.json(Result.success("删除成功"))
    } catch (error) {
      logger.error("删除用户失败:", error)
      res.status(500).json(Result.error("删除用户失败，服务器异常"))
    }
  },

  update: async (req, res) => {
    try {
      const { id, username, role, password } = req.body
      const avatarFile = req.file

      const avatar = avatarFile
        ? `/public/users/avatar/${req.file.filename}`
        : ""

      const result = await UserService.update({
        id,
        username,
        role,
        avatar,
        password,
      })
      res.json(Result.success("更新成功"))
    } catch (error) {
      logger.error("更新用户失败:", error)
      res.status(500).json(Result.error("更新用户失败，服务器异常"))
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await UserService.getById(id)
      if (result.length === 0) {
        return res.json(Result.error("用户不存在"))
      }
      res.json(Result.success("操作成功", result[0]))
    } catch (error) {
      logger.error("获取用户信息失败:", error)
      res.status(500).json(Result.error("获取用户信息失败，服务器异常"))
    }
  },
}

module.exports = UserController
