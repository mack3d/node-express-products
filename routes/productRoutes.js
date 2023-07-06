const express = require("express")
const router = express.Router()
const fppServices = require("../services/products/products")

router.get("/", async (req, res) => {
  let {
    query = [],
    sort = "",
    stock = "all",
    limit = 0,
    offset = 0
  } = req.query
  let code = "",
    name = ""

  if (Array.isArray(query)) {
    code = !isNaN(query[0]) ? query.shift() : ""
    name = query
  } else {
    if (!isNaN(query)) {
      code = query
    } else {
      name = [query]
    }
  }

  switch (stock) {
    case "empty":
      stock = 0
      break
    case "not_empty":
      stock = { $gt: 0 }
      break
    default:
      stock = { $gte: 0 }
  }

  switch (sort) {
    case "code_desc":
      sort = { code: -1 }
      break
    case "price_desc":
      sort = { price_gross: -1 }
      break
    case "price_asc":
      sort = { price_gross: 1 }
      break
    case "stock_desc":
      sort = { stock: -1 }
      break
    case "stock_asc":
      sort = { stock: 1 }
      break
    default:
      sort = { code: 1 }
  }
  const products = await fppServices.getProducts({
    code,
    name,
    sort,
    stock,
    limit,
    skip: limit * offset
  })
  res.status(200).json(products)
})

router.get("/:code", async (req, res) => {
  const product = await fppServices.getProduct(req.params.code)
  res.status(200).json(product)
})

module.exports = router
