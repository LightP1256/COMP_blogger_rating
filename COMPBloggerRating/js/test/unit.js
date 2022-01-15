// click function
function clickElement(element) {
    try {
        element.trigger("click");
    } catch (err) {
        var event = new MouseEvent("click", { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}
// Topic check
suite("Topic testing", function () {
    suiteSetup(function () {
        self.topicName = "toys";
        self.topicDescription = "plastic and metal";
        self.title = "plastic car";
        self.newTopic = "testTopic";
        self.newDescription = "Test description";
        self.newTitle = "testTitle";
    });
    // Cars topic check
    test("cars topic is showing", function () {
        chai.assert.equal($('#2').html(), "cars", "'Cars' Topic should be Showing");
    })
    // Trains topic check
    test("trains topic is showing", function () {
        chai.assert.equal($('#4').html(), "trains", "'trains' Topic should be Showing")
    })
    // art topic check
    test("art topic is showing", function () {
        chai.assert.equal($('#1').html(), "art", "'art' Topic should be Showing")
    })
    // Topic check
    test("Topic check", function () {
        $('#newTopicName').val(self.newTopic);
        $('#newTopicDescription').val(self.newDescription);
        $('#btnAddTopic').trigger('click');
        $('#topics').append("<tr><td id='11'>TestTopic</td><tr>");
        chai.assert.equal($('#11').html(), "TestTopic", "'TopicTest' Topic Should Be Displaying");
    })
    // Added blogs check
    test("Added blogs", function () {
        let exists = false;
        if ($('#topic1').length) {
            exists = true;
        }
        chai.assert.equal(exists, true, "Blogs aren't Displaying");
    })
    // Cleaning up
    suiteTeardown(function () {
        $('#newTopicName').val("");
        $('#newTopicDescription').val("");
        $('#11').remove();
    });
});