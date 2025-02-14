import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "bat buoc nhap ma"],
      minLength: [5, "Phai nhap tren 5 ky tu"],
      maxLength: [10, "Phai nhap duoi 10 ky tu"],
    },
    name: {
      type: String,
      required: [true, "bat buoc nhap ten"],
    },
    image: {
      type: String,
      required: [true, "bat buoc nhap link hinh anh"],
    },
    searchString: {
      type: String,
      required: [true, "bat buoc nhap tu khoa"],
    },
    created_at: Date,
    updateAt: Date,
    deleteAt: Date,
  },
  {
    versionKey: false,
    collection: "categories",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("id").get(function () {
  return this._id.toString();
});


const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel;
