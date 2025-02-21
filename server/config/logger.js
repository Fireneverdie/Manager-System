const pino = require("pino")
const pretty = require("pino-pretty")

// 创建一个自定义的 prettifier 函数来处理时间
function prettifyTime(time) {
  const formattedTime = new Date(time)
    .toISOString()
    .replace("Z", "") // 移除 'Z' 表示 UTC
    .replace("T", " ") // 替换 'T' 为一个空格
  return `\x1b[35m${formattedTime}\x1b[0m` // 应用紫色颜色
}

// 创建 pretty 流
const stream = pretty({
  colorize: true, // 开启颜色
  levelFirst: true, // 在行首显示日志级别
  translateTime: false, // 禁用内置的时间转换
  customPrettifiers: {
    time: prettifyTime, // 使用自定义的 prettifyTime 函数
  },
})

// 创建主日志实例，并将其输出到 pretty 流中
const logger = pino({}, stream)

module.exports = logger
