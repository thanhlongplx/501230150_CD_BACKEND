import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    code: String,
    name: String,
    image: String,
    searchString: String,
    created_at: Date,
    updateAt: Date,
    deleteAt: Date,
  },
  {
    versionKey: false,
    collection: "categories",
  }
);

const CategoryModel = mongoose.model("category", categorySchema);
export default CategoryModel;
