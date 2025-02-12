import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
import { removeVietNameseAccents } from "../common/index.js";
const sortObjects = [
  { code: "name_DESC", name: "Ten giam dan" },
  { code: "name_ASC", name: "Ten tang dan" },
  { code: "code_DESC", name: "Ma giam dan" },
  { code: "code_ASC", name: "Ma tang dan" },
];
const sizes = ["S", "M", "L", "XL"];
const colors = ["red", "blue", "green", "yellow"];
export async function listProduct(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query?.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = !!req.query?.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  let sort = !!req.query?.sort ? req.query.sort : null;

  const filters = {
    deleteAt: null,
  };
  if (search && search.length > 0) {
    filters.searchString = {
      $regex: removeVietNameseAccents(search),
      $options: "i",
    };
  }
  if (!sort) {
    sort = { createdAt: -1 };
  } else {
    const sortArray = sort.split("_");
    sort = { [sortArray[0]]: sortArray[1] === "ASC" ? 1 : -1 };
  }
  try {
    const countProducts = await ProductModel.countDocuments(filters);
    const products = await ProductModel.find(filters).populate("category")
      .skip(skip)
      .limit(pageSize)
      .sort(sort);

    res.render("pages/products/list", {
      title: "Products",
      products: products,
      countPagination: Math.ceil(countProducts / pageSize),
      pageSize,
      page,
      sort,
      sortObjects,
    });
  } catch (e) {
    res.send("Loi lay danh sach");
  }
}
export async function renderpageCreateProduct(req, res) {
  const categories = await CategoryModel.find({ deletedAt: null });
  let err = {}; // Khai báo biến err
  res.render("pages/products/form", {
    title: "Create products",
    mode: "Create",
    product: {},
    sizes: sizes,
    colors: colors,
    categories: categories,
    err,
  });
}
export async function createProduct(req, res) {
  const categories = await CategoryModel.find({ deletedAt: null });

  const {
    sizes: productSize,
    colors: productColor,
    image,
    ...dataOther
  } = req.body;

  let sizeArray = [],
    colorArray = [],
    imageArray = [image];
  if (typeof productSize === "string") {
    sizeArray = [productSize];
  }
  if (typeof productSize === "object") {
    sizeArray = productSize;
  }
  if (typeof productColor === "string") {
    colorArray = [productColor];
  }
  if (typeof productColor === "object") {
    colorArray = productColor;
  }
  try {
    const product = await ProductModel.findOne({
      code: dataOther.code,
      deletedAt: null,
    });
    if (product) {
      throw "code";
    }
    await ProductModel.create({
      sizes: sizeArray,
      colors: colorArray,
      images: imageArray,
      ...dataOther,
      createAt: new Date(),
    });
    res.redirect("/products");
  } catch (error) {
    let err = {};
    if (error === "code") {
      err.code = "Ma san pham da ton tai";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log("err", err);
    }
    res.render("pages/products/form", {
      title: "Create products",
      mode: "Create",
      product: {
        sizes: sizeArray,
        colors: colorArray,
        sizes,
        colors,
        ...dataOther,
      },
      sizes: sizes,
      colors: colors,
      categories: categories,
      err,
    });
  }
}

export async function renderpageUpdateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({
      _id: new ObjectId(id),
      deleteAt: null,
    });
    if (product) {
      res.render("pages/products/form", {
        title: "update products",
        mode: "Update",
        product: product,
        err: {},
      });
    } else {
      res.send("Ko tim thay");
    }
  } catch (e) {
    res.send("404 Error");
  }
}
export async function updateProduct(req, res) {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({
      code: data.code,
      _id: { $ne: new ObjectId(id) }, // Loại trừ ID hiện tại
      deleteAt: null,
    });

    if (product) {
      throw "code";
    }

    await ProductModel.updateOne(
      { _id: new ObjectId(id) },
      {
        ...data,
        updateAt: new Date(),
      }
    );

    res.redirect("/products");
  } catch (error) {
    let err = {};
    if (error === "code") {
      err.code = "Mã sản phẩm đã tồn tại";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log("err", err);
    }

    res.render("pages/products/form", {
      title: "Cập nhật danh mục",
      mode: "Update",
      product: { ...data, id },
      err,
    });
  }
}

export async function renderpageDeleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({
      _id: new ObjectId(id),
      deleteAt: null,
    });
    if (product) {
      res.render("pages/products/form", {
        title: "Delete products",
        mode: "Delete",
        product: product,
        err: {},
      });
    } else {
      res.send("Ko tim thay");
    }
  } catch (e) {
    res.send("404 Error");
  }
}
export async function deleteProduct(req, res) {
  const { id } = req.body;
  try {
    await ProductModel.deleteOne(
      { _id: new ObjectId(id) },
      {
        updateAt: new Date(),
      }
    );
    res.redirect("/products");
  } catch (e) {
    res.send("False");
  }
}
