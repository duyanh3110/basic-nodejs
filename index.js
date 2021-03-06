require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const userRoute = require("./routes/user.route")
const authRoute = require("./routes/auth.route")
const productRoute = require("./routes/product.route")

const authMiddleware = require("./middlewares/auth.middleware")

const port = 5000

const app = express()
app.set("view engine", "pug")
app.set("views", "./views")

app.use(bodyParser.json()) //  for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static("public"))

app.get("/", (req, res) => res.render("index", { name: "Duy Anh" }))

app.use("/users", authMiddleware.requireAuth, userRoute)
app.use("/auth", authRoute)
app.use("/products", authMiddleware.requireAuth, productRoute)

app.listen(port, () => console.log("Running in port " + port))
