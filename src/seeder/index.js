import categorySeeder from "./category.js";
import productSeeder from "./product.js";
import mongoConnect from "../mongo/mongoConnecter.js";
async function seeder() {
  await mongoConnect();
  console.log("cat seed");
  await categorySeeder();
  console.log("cat end");
  
  console.log("product seed");
  await productSeeder();
  console.log("product end");
  process.exit(0);
}
seeder();
