const db = require("../db")

module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.userId) {
    console.log("no cookies")
    res.redirect("/auth/login")
    return
  }

  const user = db.get("users").find({ id: req.cookies.userId }).value()

  if (!user) {
    res.redirect("/auth/login")
    return
  }

  next()
}
