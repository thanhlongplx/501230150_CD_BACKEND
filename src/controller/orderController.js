import OrderModel from "../models/orderModel.js";
import { ObjectId } from "mongodb";

const sortObjects = [
  { code: "name_DESC", name: "Ten giam dan" },
  { code: "name_ASC", name: "Ten tang dan" },
  { code: "code_DESC", name: "Ma giam dan" },
  { code: "code_ASC", name: "Ma tang dan" },
];

export async function listOrder(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query?.pageSize ? parseInt(req.query.pageSize) : 5;
  const page = !!req.query?.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  let sort = !!req.query?.sort ? req.query.sort : null;
  const sortObjects = [
    { code: "name_DESC", name: "Ten giam dan" },
    { code: "name_ASC", name: "Ten tang dan" },
    { code: "code_DESC", name: "Ma giam dan" },
    { code: "code_ASC", name: "Ma tang dan" },
  ];
  let filters = {
    deleteAt: null,
  };
  if (search && search.length > 0) {
    filters.orderNo = search;
  }

  if (!sort) {
    sort = { createdAt: -1 };
  } else {
    const sortArray = sort.split("_");
    sort = { [sortArray[0]]: sortArray[1] === "ASC" ? 1 : -1 };
  }
  try {
    const countOrders = await OrderModel.countDocuments(filters);
    const orders = await OrderModel.find(filters)
      .skip(skip)
      .limit(pageSize)
      .sort(sort);

    res.render("pages/orders/list", {
      title: "Orders",
      orders: orders,
      countPagination: Math.ceil(countOrders / pageSize),
      pageSize,
      page,
      sort,
      sortObjects,
    });
    // res.send({ countOrders });
  } catch (e) {
    res.send("Loi lay danh sach");
  }
}
// export async function renderpageCreateCategory(req, res) {
//   let err = {}; // Khai báo biến err
//   res.render("pages/categories/form", {
//     title: "Create categories",
//     mode: "Create",
//     category: {},
//     err,
//   });
// }
export async function createOrder(req, res) {
  const { discount, status, orderItems } = req.body;
  let subTotal = 0,
    total = 0,
    numericalOrder = 1;
  const lastOrder = await OrderModel.findOne().sort({ createdAt: -1 });
  if (lastOrder) {
    numericalOrder = lastOrder.numericalOrder + 1;
  }

  const orderNo = "order-" + numericalOrder;
  if (orderItems.length > 0) {
    for (let orderItem of orderItems) {
      subTotal += orderItem.price * orderItem.quantity;
    }
  }
  total = (subTotal * (100 - discount)) / 100;
  try {
    const rs = await OrderModel.create({
      orderNo: orderNo,
      discount: discount,
      total: total,
      status: status,
      orderItems: orderItems,
      numericalOrder: numericalOrder,
      createAt: new Date(),
    });
    res.send(rs);
  } catch (error) {
    console.log("error; ", error);
  }
}

// export async function renderpageUpdateCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const category = await CategoryModel.findOne({
//       _id: new ObjectId(id),
//       deleteAt: null,
//     });
//     if (category) {
//       res.render("pages/categories/form", {
//         title: "update categories",
//         mode: "Update",
//         category: category,
//         err: {},
//       });
//     } else {
//       res.send("Ko tim thay");
//     }
//   } catch (e) {
//     res.send("404 Error");
//   }
// }
// export async function updateCategory(req, res) {
//   const { ...data } = req.body;
//   const { id } = req.params;
//   try {
//     const category = await CategoryModel.findOne({
//       code: data.code,
//       _id: { $ne: new ObjectId(id) }, // Loại trừ ID hiện tại
//       deleteAt: null,
//     });

//     if (category) {
//       throw "code";
//     }

//     await CategoryModel.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         ...data,
//         updateAt: new Date(),
//       }
//     );

//     res.redirect("/categories");
//   } catch (error) {
//     let err = {};
//     if (error === "code") {
//       err.code = "Mã sản phẩm đã tồn tại";
//       // Lấy thông tin danh mục cũ để hiển thị lại ID cũ
//       const existingCategory = await CategoryModel.findById(id);
//       if (existingCategory) {
//         data.oldId = existingCategory._id; // Thêm ID cũ vào data để hiển thị
//       }
//     }

//     if (error.name === "ValidationError") {
//       Object.keys(error.errors).forEach((key) => {
//         err[key] = error.errors[key].message;
//       });
//       console.log("err", err);
//     }

//     res.render("pages/categories/form", {
//       title: "Cập nhật danh mục",
//       mode: "Update",
//       category: { ...data, id, oldId: data.oldId }, // Truyền ID cũ vào đây
//       err,
//     });
//   }
// }

// export async function renderpageDeleteCategory(req, res) {
//   try {
//     const { id } = req.params;
//     const category = await CategoryModel.findOne({
//       _id: new ObjectId(id),
//       deleteAt: null,
//     });
//     if (category) {
//       res.render("pages/categories/form", {
//         title: "Delete categories",
//         mode: "Delete",
//         category: category,
//         err: {},
//       });
//     } else {
//       res.send("Ko tim thay");
//     }
//   } catch (e) {
//     res.send("404 Error");
//   }
// }
// export async function deleteCategory(req, res) {
//   const { id } = req.body;
//   try {
//     await CategoryModel.deleteOne(
//       { _id: new ObjectId(id) },
//       {
//         updateAt: new Date(),
//       }
//     );
//     res.redirect("/categories");
//   } catch (e) {
//     res.send("False");
//   }
// }
