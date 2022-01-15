// Imports
let db = require("../collections/db.js");
let fs = require("fs");
let multer = require("multer");
let path = require("path");
// Get all blogs from DB
async function getBlogs(request, response) {
    let blogs = await db.getBlogs();
    let data = { blogs: blogs };
    response.send(data);
}
// Setting up file for upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Upload&Save blog to temporary folder
async function uploadBlogs(request, response) {
    let upload = multer({ storage: storage }).single('blog');
    upload(request, response, function (err) {
        if (err) {
            return response.end("Error with uploading file");
        } else {
            response.end(request.file.filename);
        }
    });
}
// Moving blog from temporary folder to correct topic folder
async function moveFile(request, response) {
    let fileName = request.body.fileName;
    let topicName = request.body.topicName.toString().toLowerCase();
    let date = request.body.date;
    let title = path.basename(request.body.title);
    // path
    let oldPath = path.dirname(require.main.filename) + "/uploads/" + fileName;
    let newPath = path.dirname(require.main.filename) + "/blogs/"+ topicName + "/" + date;
    // If the topic folder doesn't exist. Makes a new one
    if (!fs.existsSync(path.dirname(require.main.filename) + newPath)) {
        fs.mkdir(newPath, async function (err) {
            if (err) {
                response.send("error");
            } else {
                fs.rename(oldPath, newPath + "/" + title, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
                let blogID = request.body.blogID;
                let topicID = request.body.topicID;
                let URL = topicName + "/" + date + "/" + title;
                await db.addBlog(blogID, topicID, title, date, URL);
                response.send("success");
            }
        });
    }
}
// BLog exports
module.exports.getBlogs = getBlogs;
module.exports.uploadBlogs = uploadBlogs;
module.exports.moveFile = moveFile;