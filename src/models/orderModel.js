import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {

    productId: Schema.Types.ObjectId,
    quantity: Number,

    price: Number,
    color: {
      type: String,
      enum: ["red", "blue", "green", "yellow"],
    },
    sizes: {
      type: String,
      enum: ["S", "M", "L", "XL"],
    },
  },
  {
    versionKey: false,
  }
);
const billingAddressSchema = new Schema(
  {
    name: String,
    email: String,
    phoneNumber: Number,
    address: String,
    district: String,
    city: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);
const orderSchema = new Schema(
  {
    orderNo: String,
    status: {
      type: String,
      enum: ["cancelled", "created", "completed", "delivering"],
    },
    orderItems: {
      type: [orderItemSchema],
      required: [true, "Bắt buộc phải có sản phẩm trong đơn hàng"],
    },
    billingAddress: {
      type: billingAddressSchema,
    },
    total: Number,
    discount: {
      type: Number,
    },
    numericalOrder: Number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  },
  {
    versionKey: false,
    collection: "orders",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
