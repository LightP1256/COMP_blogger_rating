$(function () {
    // If topic is chosen
    $("td").click(async function () {
        let id = $(this).attr('id');
        let oldID = localStorage.getItem('topic');
        $('[id="topic' + oldID + '"]').attr('hidden', true);
        // Showing blogs relating to the chosen topic
        await getBlogs(id);
    });
    // For showing new topic on popup
    $("#btnNewTopic").click(function () {
        $('#newTopic').modal('show');
    });

    $("#btnAddTopic").click(function (event) {
        if (($('#newTopicName').val() != "") && ($('#newTopicDescription').val() != "")) {
            let newTopicName = $('#newTopicName').val();
            let newTopicDescription = $('#newTopicDescription').val();
            let id = Topics[Topics.length - 1].topicID + 1;
            // Adding new topic and add to DB
            let topic = new Topic(id, newTopicName, newTopicDescription);
            Topics.push(topic);
            addToList(topic);
            addToDatabase(topic);
            $('#newTopic').modal('hide');
            return "DODO";
        } else {
            $('#newTopicErr').attr('hidden', false);
        }
    });
    // When Blog is clicked
    $('p').click(function () {
        let id = $(this).attr('id');
        if (id.replace(/[0-9]/g, '') == 'blog') {
            let topicID = localStorage.getItem('topic');
            let topicName = $('#topicName').html();
            // Getting blog URL from the array of blogs
            for (let i = 0; i < Blogs.length; i++) {
                if (id.replace(/^\D+/g, '') == Blogs[i].blogID) {
                    let URL = Blogs[i].url;
                    // Show blog to user
                    $('#blogPDF').attr('src', URL);
                    break;
                }
            }
            $('#blogTopic').html(topicName + " - " + $(this).text());
            $('#blog').modal('show');
        }
    });
    // To show popup for upload blog
    $('#btnNewBlog').click(function () {
        $('#upload').modal('show');
    });
    // Upload Blog form submit
    $('#uploadBlog').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                let fileName = response;
                let topicID = localStorage.getItem('topic');
                let topicName = null;

                for (let i = 0; i < Topics.length; i++) {
                    if(Topics[i].topicID == topicID){
                        topicName = Topics[i].topicName;
                        break;
                    }
                }
                let ts = Date.now();
                let date_ob = new Date(ts);
                let currentDate = date_ob.getDate();
                let month = date_ob.getMonth() + 1;
                let year = date_ob.getFullYear();

                let uploadDate = currentDate + "-" + month + "-" + year.toString().substr(-2);
                // Getting date and title for blog
                let date = uploadDate;
                let title = $('#fileUpload').val();
                // Moving file from temporary folder to correct topic folder
                $.post('/api/moveFile', {
                    fileName: fileName,
                    topicName: topicName,
                    date: date,
                    title: title,
                    blogID: Blogs[Blogs.length - 1].blogID + 1,
                    topicID: topicID
                }, function (err) {
                    if (err == 'error') {
                        $('#blogErr').attr("hidden", false);
                    } else if (err == 'success') {
                        location.reload();
                    }
                })
            }
        });
        return false;
    });
    // Login out process clearing cookie and removing topicID
    $('#btnLogout').click(async function () {
        Cookies.remove("user");
        localStorage.removeItem("topic");
        location.reload();
    })
    $('#blog').on('hide.bs.modal', function () {
        $('#blogTopic').html("");
    })
});
// Showing blogs from chosen topic
function getBlogs(id) {
    for (let i = 0; i < Topics.length; i++) {
        if (Topics[i].topicID == id) {
            $('#topicName').html("");
            $('#topicDescription').html("");
            localStorage.removeItem("topic");
            let topicName = Topics[i].topicName;
            let topicDescription = Topics[i].topicDescription;
            $('#topicName').html(topicName);
            $('#topicDescription').html(topicDescription);
            localStorage.setItem("topic", id);
            $('#blogTopic').html(Topics[i].topicName);
            $('[id="topic'+ id +'"]').attr('hidden', false);
            break;
        }
    }
}
function addToList(topic) {
    $('#topics').append("<tr><td id='" + topic.topicID + "'>" + topic.topicName + "</td><tr>");
}
// Adding a new topic to MongoDB
async function addToDatabase(topic) {
    let topicID = topic.topicID;
    let topicName = topic.topicName;
    let topicDescription = topic.topicDescription;
    $.post("/api/addTopic", {
        topicID: topicID,
        topicName: topicName,
        topicDescription: topicDescription
    });
}
