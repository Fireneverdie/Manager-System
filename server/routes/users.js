var express = require("express")
var router = express.Router()
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/users/avatar") // 文件保存目录
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名并保留扩展名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) // 获取文件扩展名
    cb(null, `${uniqueSuffix}${ext}`)
  },
})
const upload = multer({ storage })

const UserController = require("../controller/UserController")

/* GET users listing. */
router.post("/login", UserController.login)
router.post("/users", upload.single("file"), UserController.add)
router.put("/users", upload.single("file"), UserController.update)
router.get("/users/list", UserController.list)
router.delete("/users/:id", UserController.delete)
router.get("/users/:id", UserController.getById)

module.exports = router
