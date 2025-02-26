var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
const logger = require("./config/logger")
const jwtUtil = require("./utils/jwt")
const Result = require("./model/Result")
var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
const testRouter = require("./routes/test")
const pinoHttp = require("pino-http")
const httpLogger = pinoHttp({ logger })
var cors = require("cors")
var app = express()
app.use(httpLogger)
app.use(
  cors({
    origin: "http://localhost:5173",
    exposedHeaders: ["authorization"],
  })
)
// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use("/public", express.static("public"))

app.use((req, res, next) => {
  if (req.url === "/login") {
    next()
    return
  }

  const token = req.headers["authorization"]
  if (token) {
    const payload = jwtUtil.verify(token) // 这里会返回 payload 或 null
    if (payload) {
      // 生成新 token 并续期
      const newToken = jwtUtil.generate(
        { id: payload.id, username: payload.username },
        "1h"
      )
      res.header("Authorization", newToken)
      next()
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期了" })
    }
  } else {
    res.status(401).send({ errCode: "-1", errorInfo: "未提供 token" })
  }
})

app.use("/", indexRouter)
app.use(usersRouter)
app.use(testRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// 错误处理中间件
app.use(async (err, req, res, next) => {
  // 记录错误日志，包括请求信息
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  })

  let status = err.status || 500 // 如果错误对象中有状态码，则使用它，否则默认为500
  let error = { error: "Internal Server Error" }

  res.status(status).json(error)
})
module.exports = app
