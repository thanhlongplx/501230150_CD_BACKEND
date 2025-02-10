import categorySeeder from "./category.js";
import mongoConnect from "../mongo/mongoConnecter.js";
async function seeder() {
  await mongoConnect();
  console.log("1");

  await categorySeeder();
  console.log("2");
  process.exit(0);
}
seeder();
