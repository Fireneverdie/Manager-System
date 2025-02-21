class Result {
  constructor(code, data, msg) {
    ;(this.code = code), (this.data = data), (this.msg = msg)
  }

  static success(msg = "操作成功", data = null) {
    return new Result(200, data, msg)
  }

  static error(msg, data = null) {
    return new Result(500, data, msg)
  }
}

module.exports = Result
