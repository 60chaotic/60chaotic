const express = require("express");
const route = express.Router();
const multer  = require('multer');
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
// const storageMulter = require("../../helpers/storage-multer");
const validate = require("../../validates/admin/product.validate");

// const upload = multer({ storage: storageMulter() });
const upload = multer();

// cloudinary
cloudinary.config({ 
    cloud_name: 'dtaljhhan', 
    api_key: '392743957323793', 
    api_secret: 'iXpukswMhwQfsn0BaUfVVxmHG8Q' 
  });

const controller = require("../../controllers/admin/product.controller");

route.get("/", controller.index);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.deleteItem);

route.get("/create", controller.create);

route.post("/create", 
    upload.single('thumbnail'), 
    function (req, res, next) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                        resolve(result);
                        } else {
                        reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
        }

        upload(req);
    },
    validate.createPost,
    controller.createPost);

route.get("/edit/:id", controller.edit);

route.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editPatch);

route.get("/detail/:id", controller.detail);


module.exports = route;