import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "bat buoc nhap ma"],
    },
    name: {
      type: String,
      required: [true, "bat buoc nhap ten"],
    },
    price: {
      type: Number,
      required: [true, "bat buoc nhap gia"],
    },

    searchString: {
      type: String,
      required: [true, "bat buoc nhap tu khoa"],
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      enum: ["red", "blue", "green", "yellow"],
    },
    active: String,
    description: String,
    information: String,
    images: [String],
    categoryId: Schema.Types.ObjectId,

    created_at: Date,
    updateAt: Date,
    deleteAt: Date,
  },
  {
    versionKey: false,
    collection: "products",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual("category", {
  ref: "category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("categoryIdString").get(function () {
  return !!this.categoryId ? this.categoryId.toString() : "";
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
