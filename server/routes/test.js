const express = require("express")
const testRouter = express.Router()
const { query } = require("../config/db")
const logger = require("../config/logger")
testRouter.get("/db", async (req, res) => {
  const sql = "select * from users where username = ?;"
  const username = "admin"
  const result = await query(sql, [username])
  logger.info(result)
  logger.info("hello")
  res.send(result)
})

module.exports = testRouter
