const productRoutes = require("./product.route");
const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");

module.exports.routesAdmin = (app) => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes);

    app.use(`/${PATH_ADMIN}/products`, productRoutes);

}