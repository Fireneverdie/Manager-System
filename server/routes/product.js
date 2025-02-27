const express = require("express")
const multer = require("multer")
const path = require("path")
const ProductController = require("../controller/ProductController")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/product/cover") // 文件保存目录
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名并保留扩展名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) // 获取文件扩展名
    cb(null, `${uniqueSuffix}${ext}`)
  },
})
const upload = multer({ storage })
const productRouter = express.Router()

productRouter.post("/products", upload.single("file"), ProductController.add)
productRouter.get("/products/list", ProductController.list)
productRouter.delete("/products/:id", ProductController.delete)
productRouter.get("/products/:id", ProductController.getById)
productRouter.get("/products/pages", ProductController.page)
productRouter.put("/products", upload.single("file"), ProductController.update)

module.exports = productRouter
