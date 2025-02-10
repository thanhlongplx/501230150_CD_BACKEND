import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
import { removeVietNameseAccents } from "../common/index.js";
export async function listCategory(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query?.pageSize ? parseInt(req.query.pageSize) : 2;
  const page = !!req.query?.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  let sort = !!req.query?.sort ? req.query.sort : null;
  const sortObjects = [
    { code: "name_DESC", name: "Ten giam dan" },
    { code: "name_ASC", name: "Ten tang dan" },
    { code: "code_DESC", name: "Ma giam dan" },
    { code: "code_ASC", name: "Ma tang dan" },
  ];
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
    const countCategories = await CategoryModel.countDocuments(filters);
    const categories = await CategoryModel.find(filters)
      .skip(skip)
      .limit(pageSize)
      .sort(sort);

    res.render("pages/categories/list", {
      title: "categories",
      categories: categories,
      countPagination: Math.ceil(countCategories / pageSize),
      pageSize,
      page,
      sort,
      sortObjects,
    });
  } catch (e) {
    res.send("Loi lay danh sach");
  }
}
export async function renderpageCreateCategory(req, res) {
  let err = {}; // Khai báo biến err
  res.render("pages/categories/form", {
    title: "Create categories",
    mode: "Create",
    category: {},
    err,
  });
}
export async function createCategory(req, res) {
  const { code, name, searchString, image } = req.body;
  try {
    const category = await CategoryModel.findOne({
      code: code,
      deletedAt: null,
    });
    if (category) {
      throw "code";
    }
    await CategoryModel.create({
      code,
      name,
      searchString,
      image,
      createAt: new Date(),
    });
    res.redirect("/categories");
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
    res.render("pages/categories/form", {
      title: "Create categories",
      mode: "Create",
      category: { code, name, searchString, image, createAt: new Date() },
      err,
    });
  }
}

export async function renderpageUpdateCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findOne({
      _id: new ObjectId(id),
      deleteAt: null,
    });
    if (category) {
      res.render("pages/categories/form", {
        title: "update categories",
        mode: "Update",
        category: category,
        err: {},
      });
    } else {
      res.send("Ko tim thay");
    }
  } catch (e) {
    res.send("404 Error");
  }
}
export async function updateCategory(req, res) {
  const { ...data } = req.body;
  const { id } = req.params;
  try {
    const category = await CategoryModel.findOne({
      code: data.code,
      _id: { $ne: new ObjectId(id) }, // Loại trừ ID hiện tại
      deleteAt: null,
    });

    if (category) {
      throw "code";
    }

    await CategoryModel.updateOne(
      { _id: new ObjectId(id) },
      {
        ...data,
        updateAt: new Date(),
      }
    );

    res.redirect("/categories");
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

    res.render("pages/categories/form", {
      title: "Cập nhật danh mục",
      mode: "Update",
      category: { ...data, id },
      err,
    });
  }
}

export async function renderpageDeleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findOne({
      _id: new ObjectId(id),
      deleteAt: null,
    });
    if (category) {
      res.render("pages/categories/form", {
        title: "Delete categories",
        mode: "Delete",
        category: category,
        err: {},
      });
    } else {
      res.send("Ko tim thay");
    }
  } catch (e) {
    res.send("404 Error");
  }
}
export async function deleteCategory(req, res) {
  const { id } = req.body;
  try {
    await CategoryModel.deleteOne(
      { _id: new ObjectId(id) },
      {
        updateAt: new Date(),
      }
    );
    res.redirect("/categories");
  } catch (e) {
    res.send("False");
  }
}
