import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
import { removeVietNameseAccents } from "../common/index.js";
export async function listCategory(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query?.pageSize ? parseInt(req.query.pageSize) : 2;
  const page = !!req.query?.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  const sort = !!req.query?.sort ? req.query.sort : null;
  const sortObjects = [
    {code:"name_DESC",name:"Ten giam dan"},
    {code:"name_ASC", name:"Ten tang dan"},
    {code:"code_DESC",name:"Ma giam dan"},
    {code:"code_ASC", name:"Ma tang dan"},
  ]
  const filters = {
    deleteAt: null,
  };
  if (search && search.length > 0) {
    filters.searchString = {
      $regex: removeVietNameseAccents(search),
      $options: "i",
    };
  }
  try {
    const countCategories = await CategoryModel.countDocuments(filters);
    const categories = await CategoryModel.find(filters)
      .skip(skip)
      .limit(pageSize);

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
  res.render("pages/categories/form", {
    title: "Create categories",
    mode: "Create",
    category: {},
  });
}
export async function createCategory(req, res) {
  const { code, name, searchString, image } = req.body;
  try {
    await CategoryModel.create({
      code,
      name,
      searchString,
      image,
      createAt: new Date(),
    });
    res.redirect("/categories");
  } catch (e) {
    res.send("Tao khong thanh cong");
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
      });
    } else {
      res.send("Ko tim thay");
    }
  } catch (e) {
    res.send("404 Error");
  }
}
export async function updateCategory(req, res) {
  const { code, name, searchString, image, id } = req.body;
  try {
    await CategoryModel.updateOne(
      { _id: new ObjectId(id) },
      {
        code,
        name,
        searchString,
        image,
        updateAt: new Date(),
      }
    );
    res.redirect("/categories");
  } catch (e) {
    res.send("Success");
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
