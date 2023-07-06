require("dotenv").config()
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const userServices = require("../services/users/users")

function generateAccessToken(userdata) {
  return jwt.sign(userdata, process.env.TOKEN_SECRET, { expiresIn: "8h" })
}

function generateRefreshToken(userdata) {
  return jwt.sign(userdata, process.env.TOKEN_SECRET_REFRESH, {
    expiresIn: "30d"
  })
}

router.post("/signin", async (req, res) => {
  const reqIP = req.socket.localAddress
  const username = req.body.username
  const password = req.body.password

  if (reqIP !== process.env.ACCESS_IP)
    res.status(403).json({ message: "Forbidden" })

  if (username.trim().length < 7 || password.trim() === "")
    res.status(403).json({ message: "check your data" })
  try {
    const findUser = await userServices.getUserData({ username: username })

    if (findUser.userdata === null) {
      res.status(403).json({ message: "username" })
    } else if (password !== findUser.userdata.password) {
      res.status(403).json({ message: "password" })
    } else {
      const userId = findUser.userdata._id.toString()
      const accessToken = generateAccessToken({ user: userId })
      const refreshToken = generateRefreshToken({ user: userId })
      const tokens = { accessToken, refreshToken }
      res.status(200).json(tokens)
    }
  } catch (err) {
    res.status(500)
  }
})

router.post("/signout", (req, res) => {
  console.log(req)
  res.status(200).json({ message: "ok" })
})

module.exports = router
