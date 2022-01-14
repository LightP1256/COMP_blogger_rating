// Variables
let Topics = [];
let Admins = [];
let Blogs = [];

$(async function () {
    // Getting all topics from DB on page load
    await $.post("/api/getTopics", async function (data) {
        let topics = data.topics;
        for (let i = 0; i < topics.length; i++) {
            await addTopic(new Topic(topics[i].topicID, topics[i].topicName, topics[i].topicDescription));
        }// Adding topic
        let id = localStorage.getItem("topic");
        // User refreshed page, topicID shouldn't be empty
        if (id != null) {
            for (let i = 0; i < Topics.length; i++) {
                if (Topics[i].topicID == id) {
                    $('#topicName').html(Topics[i].topicName);
                    $('#topicDescription').html(Topics[i].topicDescription);
                    $('#blogsTopic').html(Topics[i].topicName);
                    $('[id="topic' + id + '"]').attr('hidden', false);
                    break;
                }
            }
        } else {
            $('#topicName').html(Topics[0].topicName);
            $('#topicDescription').html(Topics[0].topicDescription);
            $('#blogsTopic').html(Topics[0].topicName);
            $('[id="topic' + Topics[0].topicID + '"]').attr('hidden', false);
        }
    });
    // Getting Admins from DB
    await $.post("/api/getAdmins", async function (data) {
        let admins = data;

        for (let i = 0; i < admins.length; i++) {
            await addAdmin(new Admin(admins[i].adminID, admins[i].userID));
        }
    })
    // When admin has signed in, show admin settings
    $.post("/api/adminActive", async function (data) {
        let user = data;
        for (let i = 0; i < Admins.length; i++) {
            if (Admins[i].userID == user) {
                $('#btnNewTopic').attr('hidden', false);
                $('#btnNewBlog').attr('hidden', false);
                break;
            } else {
                $('#btnNewTopic').attr('hidden', true);
                $('#btnNewBlog').attr('hidden', true);
            }
        }
    })
    // Getting all Blogs from DB on the page load
    $.post("/api/getBlogs", async function (data) {
        let blogs = data.blogs;
        for (let i = 0; i < blogs.length; i++) {
            await addBlog(new Blog(blogs[i].blogID, blogs[i].topicID, blogs[i].title, blogs[i].date, blogs[i].URL));
        }
    });
})
// Add topic
function addTopic(topic) {
    Topics.push(topic);
}
// Add admin
function addAdmin(admin) {
    Admins.push(admin);
}
// Add blog
function addBlog(blog) {
    Blogs.push(blog);
}

