import categoryRoute from "./categoryRoute.js";
export default function routers(app) {
  app.use("/categories", categoryRoute);
  app.get("/", (req, res) => {
    res.render("pages/index");
  });
  app.get("/components", (req, res) => {
    res.render("pages/components");
  });
  app.get("/forms", (req, res) => {
    res.render("pages/forms");
  });
  app.get("/icons", (req, res) => {
    res.render("pages/icons");
  });
  app.get("/notifications", (req, res) => {
    res.render("pages/notifications");
  });
  app.get("/tables", (req, res) => {
    res.render("pages/tables");
  });
  app.get("/typography", (req, res) => {
    res.render("pages/typography");
  });
}
