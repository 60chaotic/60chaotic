const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

module.exports.routesClient = (app) => {
    app.use("/", homeRoutes);
    
    app.get("/products", productRoutes);
}