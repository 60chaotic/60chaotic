const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

module.exports.routesClient = (app) => {
    app.get("/", homeRoutes);
    
    app.use("/products", productRoutes);
}