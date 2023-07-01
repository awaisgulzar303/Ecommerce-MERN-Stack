const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
} = require("../controller/productController");
const { authorizeRole, isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

//create product
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);

//update products
router
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
