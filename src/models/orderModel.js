import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    productCode: String,
    productId: Schema.Types.ObjectId,
    quantity: Number,
    total: Number,
    price: Number,
    color: {
      type: String,
      enum: ["red", "blue", "green", "yellow"],
    },
  },
  {
    versionKey: false,
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
    total: Number,
    discount: Number,
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
