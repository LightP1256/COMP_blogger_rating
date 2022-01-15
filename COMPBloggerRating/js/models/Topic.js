class Topic {
    constructor(TopicID, TopicName, TopicDescription) {
        this.topicID = TopicID;
        this.topicName = TopicName;
        this.topicDescription = TopicDescription;
    }
    // TopicID
    get getTopicID() {
        return this.topicID;
    }
    set setTopicID(TopicID) {
        this.topicID = TopicID;
    }
    // TopicName
    get getTopicName() {
        return this.topicName;
    }
    set setTopicName(TopicName) {
        this.topicName = TopicName;
    }
    // TopicDescription
    get getTopicDescription() {
        return this.topicDescription;
    }
    set setTopicDescription(TopicDescription) {
        this.topicDescription = TopicDescription;
    }
}
