const db = require("../db")
const shortid = require("shortid")

module.exports.index = (req, res) =>
  res.render("users/index", { users: db.get("users").value() })

module.exports.search = (req, res) => {
  let q = req.query.q
  var matchedUsers = db
    .get("users")
    .value()
    .filter((user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

  res.render("users/index", { users: matchedUsers })
}

module.exports.create = (req, res) => res.render("users/create")

module.exports.get = (req, res) => {
  let id = req.params.id
  let user = db.get("users").find({ id: id }).value()
  res.render("users/view", { user })
}

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate()
  let errors = []

  if (!req.body.name) {
    errors.push("Name is required")
  }

  if (!req.body.phone) {
    errors.push("Phone is required")
  }

  if (errors.length > 0) {
    res.render("users/create", {
      errors: errors,
      values: req.body,
    })
    return
  }

  db.get("users").push(req.body).write()
  res.redirect("/users")
}