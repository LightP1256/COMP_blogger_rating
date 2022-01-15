// Imports
let express = require("express");
let path = require("path");
let http = require("http");
let bodyParser = require("body-parser");
let socketIo = require("socket.io");
let mongoose = require("mongoose");
// Routes
let blog = require("./js/routes/blog.js");
let user = require("./js/routes/user.js");
let topic = require("./js/routes/topic.js");
// Set up app/server
let app = express();
let server = http.createServer(app);
// Set up MongoDB Database Connection
let url = "mongodb+srv://george3718:trtivep37eb1y5@cluster0.liycr.mongodb.net/BasicBlogsDatabase?retryWrites=true&w=majority";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
// Connection handling check
mongoose.connection.on('error', function () { console.log("Error Connecting to DB") });
mongoose.connection.on('disconnected', function () { console.log("Disconnected From DB") });
mongoose.connection.on('connected', function () {
    console.log("Connected to DB: " + mongoose.connection.db.databaseName);
});
// Post form processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set up the websocket.
let io = socketIo(server);
io.on("connection", function (socket) {
    socket.on("send message", function (msg) {
        socket.broadcast.emit("received message", msg);
    });
});
// View configuration ejs
app.set("views", path.join(__dirname, "js/views"));
app.set("view engine", "ejs");
// Static paths
app.use(express.static(path.join(__dirname, "blogs")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "img")));
// User Routes
app.post("/api/getUsers", user.getAllUsers);
app.post("/api/getUserDetails", user.getUserDetails);
// User change Email/password and delete user account
app.post("/api/changeEmail", user.changeEmail);
app.post("/api/changePassword", user.changePassword);
app.post("/api/deleteAccount", user.deleteAccount);
// Admin user routes
app.post("/api/getAdmins", user.getAdmins);
app.post("/api/adminActive", user.adminActive);
// Topic routes
app.post("/api/getTopics", topic.getAllTopics);
app.post("/api/addTopic", topic.addTopic);
// Blog routes
app.post("/api/getBlogs", blog.getBlogs);
app.post("/api/moveFile", blog.moveFile);
app.post("/api/uploadBlog", blog.uploadBlogs);
// Register/login and logout routes
app.post("/api/register", user.registerUser);
app.post("/api/login", user.loginUser);
app.post("/api/logout", user.logoutUser);
// Webpage url /registration
app.get("/registration", function (request, response) {
    response.render("registration");
})
// Webpage url /login
app.get("/login", function (request, response) {
    response.render("login");
})
// Webpage url /main
app.get("/main", topic.listAllTopics);
// Webpage url /account
app.get("/account", user.account);
// Export
module.exports.app = app;
// Server listening on port 9000
server.listen(9000, function () {
    console.log("Listening on 9000");
})