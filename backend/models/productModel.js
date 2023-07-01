const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the Product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the Product Price"],
    maxLength: [8, "Price cannot ecxeed 8 characters"],
  },

  rating: {
    type: Number,
    default: 0,
  },

  image: [
    {
      public_id: {
        type: String,
        requires: true,
      },
      public_url: {
        type: String,
        requires: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter product Category"],
  },

  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [4, "stock cannot exceed 4 characters"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
