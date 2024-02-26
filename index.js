const express = require("express");
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const systemConfig = require("./config/system");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected!!!"));




const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('nguyenhoangminhnhat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/public`));
// app.use(express.static("public"));

app.set("views", `${__dirname}/views`);
// app.set("views", "./views");
app.set("view engine", "pug");

// App Local 
app.locals.prefixAdmin = systemConfig.prefixAdmin;



// routesClient
routesClient.routesClient(app);
// End routesClient

// routesAdmin
routesAdmin.routesAdmin(app);
// End routesAdmin



app.listen(port, () => {
    console.log(` Chạy vào cổng ${port} `)
})