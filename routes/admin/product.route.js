const express = require("express");
const route = express.Router();
const multer  = require('multer');
const storageMulter = require("../../helpers/storage-multer");
const validate = require("../../validates/admin/product.validate");


const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");

route.use("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post("/create", upload.single('thumbnail'), controller.createPost);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", upload.single('thumbnail'), controller.editPatch);

route.get("/detail/:id", controller.detail);


module.exports = route;