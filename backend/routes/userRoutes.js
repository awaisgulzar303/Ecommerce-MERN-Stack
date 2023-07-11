const express = require("express");
const {
  registerUser,
  logInUser,
  LogOutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  getALLUsers,
  getSingleUserDetail,
  updateProfile,
  updateRole,
} = require("../controller/userController");

const { authorizeRole, isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/user").post(registerUser);

router.route("/login").post(logInUser);

router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(LogOutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/change/password").put(isAuthenticatedUser, updatePassword);

router.route("/update/profile").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getALLUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUserDetail)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateRole);

module.exports = router;
