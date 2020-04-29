const express = require("express")
const shortid = require("shortid")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) =>
  res.render("users/index", { users: db.get("users").value() })
)

router.get("/search", (req, res) => {
  let q = req.query.q
  var matchedUsers = db
    .get("users")
    .value()
    .filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

  res.render("users/index", { users: matchedUsers })
})

router.get("/create", function (req, res) {
  res.render("users/create")
})

router.get("/:id", function (req, res) {
  let id = req.params.id

  let user = db.get("users").find({ id: id }).value()

  res.render("users/view", { user })
})

router.post("/create", function (req, res) {
  req.body.id = shortid.generate()
  db.get("users").push(req.body).write()
  res.redirect("/")
})

module.exports = router
