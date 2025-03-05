import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";

const data = [
  {
    code: "QNAM",
    name: "Quan nam",
    price: 100000,
    images: ["profile.jpg"],
    searchString: "quan, quan nam",
    size: ["S", "M", "L"],
    color: ["blue", "red", "green"],
    active: true,
    description: "mo ta cho quan nam",
    information: "thong tin cho quan nam",
    categoryCode: "Q_001",
    createdAt: new Date(),
  },
  {
    code: "ANAM",
    name: "Ao nam",
    price: 205000,
    images: ["profile2.jpg"],
    searchString: "ao, ao nam",
    sizes: ["S", "M", "L"],
    colors: ["red", "green"],
    active: true,
    description: "mo ta cho ao thun nam",
    information: "thong tin cho ao thun nam",
    categoryCode: "A_001",
    createdAt: new Date(),
  },
  {
    code: "GNAM",
    name: "Giay nam",
    price: 300000,
    images: ["profile.jpg"],
    searchString: "giay, giay nam",
    sizes: ["M", "L", "XL"],
    colors: ["green", "blue", "red"],
    active: true,
    description: "mo ta cho giay nam",
    information: "thong tin cho giay nam",
    categoryCode: "G_001",
    createdAt: new Date(),
  },
  {
    code: "DNAM",
    name: "Dep nam",
    price: 120000,
    images: ["profile.jpg"],
    searchString: "dep, dep nam",
    sizes: ["M", "L", "XL"],
    colors: ["green", "blue", "red"],
    active: true,
    description: "mo ta cho dep nam",
    information: "thong tin cho dep nam",
    categoryCode: "D_001",
    createdAt: new Date(),
  },
  {
    code: "PNAM",
    name: "Phu kien nam",
    price: 50000,
    images: ["profile2.jpg"],
    searchString: "dep, dep nam",
    sizes: ["M", "L", "XL"],
    colors: ["green", "blue", "red"],
    active: true,
    description: "mo ta cho dep nam",
    information: "thong tin cho dep nam",
    categoryCode: "P_001",
    createdAt: new Date(),
  },
];

export default async function productSeeder() {
  await ProductModel.deleteMany();
  const categories = await CategoryModel.find({});
  let writeProduct = [];
  for (let product in data) {
    const { categoryCode, ...dataOther } = data[product];
    const category = categories.find((categoryItem) => {
      return categoryItem.code === categoryCode;
    });
    writeProduct.push({
      categoryId: !!category ? category._id : null,
      ...dataOther,
    });
  }
  await ProductModel.insertMany(writeProduct);
}
