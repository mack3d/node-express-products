const Products = require("../../models/product-shema")

exports.getProducts = async (data) => {
  const { code, name, sort, stock, limit, skip } = data
  const searchCodeValues = {
    code: { $regex: "^" + code + ".*", $options: "i" }
  }
  const searchStockValues = { stock: stock }
  const searchNameValues =
    name.length > 0
      ? {
          $and: name.map((value) => ({
            $or: [
              { code: { $regex: ".*" + value + ".*", $options: "i" } },
              { name: { $regex: ".*" + value + ".*", $options: "i" } }
            ]
          }))
        }
      : {}
  const search = {
    $and: [searchCodeValues, searchNameValues, searchStockValues]
  }
  const result = await Products.find(search).sort(sort).limit(limit).skip(skip)
  return { products: result, count: result.length }
}

exports.getProduct = async (code) => {
  const query = { code: { $regex: "^" + code + ".*", $options: "i" } }
  const result = await Products.find(query).sort({ code: 1 })
  return { products: result, count: result.length }
}
