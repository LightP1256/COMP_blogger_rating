// Imports
let db = require("../collections/db.js");
let cookie = require("cookie");
// topics
async function listAllTopics(request, response) {
    try {
        // If the user cookie hasn't been set. The user isn't signed in
        cookie.parse(request.headers.cookie);
        let topics = await db.getTopics();
        let blogs = await db.getBlogs();
        let data = {
            topics: topics,
            blogs: blogs
        };
        response.render("main", data);
    } catch (err) {
        response.redirect('/login');
    }
}
// Topic awaits
async function getAllTopics(request, response) {
    let topics = await db.getTopics();
    let data = { topics: topics };
    response.send(data);
}
// Adding topic
async function addTopic(request, response) {
    // Checking if topic exists
    await db.addTopic(request.body.topicID, request.body.topicName, request.body.topicDescription);
} // AJAX makes a folder For that new
// topic exports
module.exports.getAllTopics = getAllTopics;
module.exports.listAllTopics = listAllTopics;
module.exports.addTopic = addTopic;