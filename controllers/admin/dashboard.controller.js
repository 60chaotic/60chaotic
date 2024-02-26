// [GET] /admin/dashboard/
module.exports.index = (req, res) => {
    res.render("./admin/pages/home/index.pug", {
        pageTitle: "Trang Tổng Quan"
    });
}