module.exports.postCreate = (req, res, next) => {
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

  // pass value from previous middleware to the next middleware
  // console.log(res.locals)
  res.locals.success = true

  next()
}
