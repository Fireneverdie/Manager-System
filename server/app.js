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

app.use((req, res, next) => {
  if (req.url === "/login") {
    next()
    return
  }

  // console.log(req.headers)

  const token = req.headers["authorization"]
  console.log(token)
  if (token) {
    let payload = jwtUtil.verify(token)
    if (payload) {
      const newToken = jwtUtil.generate(
        {
          id: payload.id,
          username: payload.username,
        },
        "1h"
      )
      res.header("Authorization", newToken)
      next()
    } else {
      // const errResult = new Result(401,null,'token 过期了')
      // res.json(errResult)
      res.status(401).send({ errCode: "-1", errorInfo: "token过期了" })
    }
  }
})

app.use("/", indexRouter)
app.use(usersRouter)
app.use(testRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(err)
  res.status(500).json({ error: "Internal Server Error" })
})

module.exports = app
