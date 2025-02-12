import CategoryModel from "../models/categoryModel.js";

const data = [
  {
    code: "Q_001",
    name: "Quan",
    searchString: "quan",
    image: "profile.jpg",
    createdAt: new Date(),
  },
  {
    code: "A_001",
    name: "Ao",
    searchString: "ao",
    image: "profile2.jpg",
    createdAt: new Date(),
  },
  {
    code: "G_001",
    name: "Giay",
    searchString: "giay",
    image: "profile2.jpg",
    createdAt: new Date(),
  },
  {
    code: "D_001",
    name: "Dep",
    searchString: "dep",
    image: "profile.jpg",
    createdAt: new Date(),
  },
  {
    code: "P_001",
    name: "Phu kien",
    searchString: "phu kien",
    image: "profile.jpg",
    createdAt: new Date(),
  },
];

export default async function categorySeeder() {
  await CategoryModel.deleteMany();
  await CategoryModel.insertMany(data);
}
