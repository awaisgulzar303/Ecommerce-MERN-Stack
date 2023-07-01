const ErrorHandler = require("../utls/errorhandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel.js");
const sendToken = require("../utls/jwtToken.js");
const sendEmail = require("../utls/sendEmail.js");
const crypto = require("crypto");
//register a User

exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      public_url: "url.com",
    },
  });
  sendToken(user, 201, res);
});

//login user

exports.logInUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatching = await user.comparePassword(password);

  if (!isPasswordMatching) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout User

exports.LogOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logOut succesfully",
  });
});

//forget password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  //get password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/v1/password/reset/" +
    resetToken;

  const message =
    "your password reset token is:-\n\n" +
    resetPasswordUrl +
    "\n\n if you have not requested this email then please ignore it";

  try {
    await sendEmail({
      email: req.body.email,
      subject: "THE JOT STORE PASSWORD RECOVERY",
      message,
    });

    res.status(200).json({
      succes: true,
      message: "email sent to " + user.email + " successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password != req.body.confirmpassword) {
    return next(new ErrorHandler("password dose not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatching = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatching) {
    return next(new ErrorHandler("Old password is invalid", 400));
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
