const express = require("express")

const controller = require("../controllers/user.controller")
const validate = require("../validate/user.validate")

const router = express.Router()

router.get("/", controller.index)

router.get("/cookie", (req, res) => {
  res.cookie("user-id", 12345)
  res.send("Hello")
})

router.get("/search", controller.search)

router.get("/create", controller.create)

router.get("/:id", controller.get)

router.post("/create", validate.postCreate, controller.postCreate)

module.exports = router
