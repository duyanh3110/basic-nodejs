const db = require("../db")

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1 // n
  let perPage = 8 // x

  let start = (page - 1) * perPage
  let end = page * perPage

  let countProduct = db.get("products").value().length
  let lastPage = Math.round(countProduct / perPage)

  res.render("products/index", {
    products: db.get("products").value().slice(start, end),
    firstPage: "1",
    page,
    lastPage,
  })
}
