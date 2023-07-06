require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const verifyToken = require("./middleware/jwtVerify.js")
const authRouter = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoutes.js")

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((err) => err)

app.use("/", authRouter)
app.use("/product", verifyToken, productRoutes)

app.listen(5001, () => console.log("Server started! - PORT 5001"))
