const logger = require("../config/logger")
const Result = require("../model/Result")
const ProductService = require("../service/ProductService")
const { update } = require("./UserController")
const ProductController = {
  getById: async (req, res) => {
    const { id } = req.params
    logger.info(id)
    try {
      const result = await ProductService.getById(id)
      return res.json(Result.success("操作成功", result[0]))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
  list: async (req, res) => {
    try {
      const result = await ProductService.list()
      return res.json(Result.success("操作成功", result))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      const result = await ProductService.delete(id)
      return res.json(Result.success("删除成功"))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
  update: async (req, res) => {
    const { id, name, introduction } = req.body
    const coverFile = req.file
    const pro_name = name
    const cover = coverFile ? `/public/product/cover/${req.file.filename}` : ""
    try {
      const result = await ProductService.update({
        id,
        pro_name,
        cover,
        introduction,
      })
      return res.json(Result.success("更新成功"))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
  add: async (req, res) => {
    const { name, introduction } = req.body
    const coverFile = req.file
    const pro_name = name
    const coverImg = coverFile
      ? `/public/product/cover/${req.file.filename}`
      : ""

    try {
      const result = await ProductService.add({
        pro_name,
        coverImg,
        introduction,
      })
      return res.json(Result.success("添加成功"))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
  page: async (req, res) => {
    const { pageNum, pageSize } = req.query
    logger.info(pageNum, pageSize)
    console.log(pageNum, pageSize)
    try {
      const result = await ProductService.page({
        pageNum,
        pageSize,
      })
      return res.json(Result.success("查询成功", result))
    } catch (error) {
      logger.error(error)
      throw error
    }
  },
}

module.exports = ProductController
