// Import
let mongoose = require("mongoose");
// Topic schema setup
let topicSchema = new mongoose.Schema({
    topicID: Number,
    topicName: String,
    topicDescription: String
});
let Topic = mongoose.model('topics', topicSchema);
// Getting all the topics from DB arranged in ascending order from topicID
async function getTopics() {
    let topics = await Topic.find().sort([["topicID", "asc"]]);
    return topics;
}
// Adding a new topic to DB
async function addTopic(topicID, topicName, topicDescription) {
    await Topic.create({ topicID: topicID, topicName: topicName, topicDescription: topicDescription });
}
// User schema setup
let userSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: Object,
    dob: String,
});
let User = mongoose.model("users", userSchema);
async function getUsers() {
    let users = await User.find({});
    return users;
}
// Getting all user details but password
async function getUser(userID) {
    let user = await User.find({ "userID": userID.toString() }, { password: 0, _id: 0, __v: 0 });
    return user;
}
// Getting all usernames from DB for username check
async function getUsernames() {
    let usernames = await User.find({}, {username: 1});
    return usernames;
}
// Add a new user to DB
async function addUser(userID, firstName, lastName, username, email, password, dob) {
    let user = {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        dob: dob,
    }
    await User.create({ userID: userID, firstName: firstName, lastName: lastName, username: username, email: email, password: password, dob: dob});
}
// User login
async function loginUser(email) {
    let password = await User.find({ "email": email}, { password: 1 });
    return password;
}
// getting user password
async function getUserDetails(email) {
    let user = await User.find({ "email": email }, { password: 0 });
    return user;
}
// Update user email
async function updateEmail(userID, email) {
    await User.updateOne({ "userID": userID }, { $set: { email: email } });
}
// Update user password
async function updatePassword(userID, password) {
    await User.updateOne({ "userID": userID }, { $set: { password: password } })
}
// Delete user
async function deleteUser(userID){
    await User.deleteOne({ "userID": userID });
}
// Admin
let adminSchema = new mongoose.Schema({
    adminID: String,
    userID: String
})
let Admin = mongoose.model("admins", adminSchema);
// Get the list of admins
async function getAdmins() {
    let admins = await Admin.find();
    return admins;
}
// Blogs
let blogSchema = new mongoose.Schema({
    blogID: Number,
    topicID: Number,
    title: String,
    date: String,
    URL: String
});
let Blog = mongoose.model("blogs", blogSchema);
async function getBlogs() {
    let blogs = await Blog.find();
    return blogs;
}
// Adding a new blog to DB
async function addBlog(blogID, topicID, title, date, URL) {
    await Blog.create({ blogID: blogID, topicID: topicID, title: title, date: date, URL: URL });
}
// User exports
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.getUsernames = getUsernames;
module.exports.getUserDetails = getUserDetails;
module.exports.getAdmins = getAdmins;
// User options exports
module.exports.updateEmail = updateEmail;
module.exports.updatePassword = updatePassword;
module.exports.deleteUser = deleteUser;
// Topic exports
module.exports.getTopics = getTopics;
module.exports.addTopic = addTopic;
// Blog exports
module.exports.getBlogs = getBlogs;
module.exports.addBlog = addBlog;
// Login/register exports
module.exports.loginUser = loginUser;
module.exports.addUser = addUser;