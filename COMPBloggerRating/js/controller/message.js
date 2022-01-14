$(function () {
    let socket = io("http://localhost:9000");
    // Add a message sent by other users to web chat
    socket.on("received message", function (msg) {
        $('#msgOutput').append("<p class=\"message text-break\">" + msg + "</p>");
    });
    // Send user message to server for sending out to other clients that are online
    $("#send").click(function () {
        $.post("/api/getUserDetails", function (data) {
            let user = data[0];
            let username = user.username;
            let msg = username + ": " + $('#inpMessage').val();

            socket.emit("send message", msg);
            $('#msgOutput').append("<p class=\"message sent text-break\">" + msg + "</p>");
            $('#inpMessage').val("");
        });
    });
});
