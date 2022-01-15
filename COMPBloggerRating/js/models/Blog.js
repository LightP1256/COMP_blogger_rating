class Blog {
    constructor(BlogID, TopicID, Title, Date, URL) {
        this.blogID = BlogID;
        this.topicID = TopicID;
        this.title = Title;
        this.date = Date;
        this.url = URL;
    }
    // BlogID
    get getBlogID() {
        return this.blogID;
    }
    set setBlogID(BlogID) {
        this.blogID = BlogID;
    }
    // Date
    get getDate() {
        return this.date;
    }
    set setDate(Date) {
        this.date = Date;
    }
    // TopicID
    get getTopicID() {
        return this.topicID;
    }
    set setTopicID(TopicID) {
        this.topicID = TopicID;
    }
    // Title
    get getTitle() {
        return this.title;
    }
    set setTitle(Title) {
        this.title = Title;
    }
    // URL
    get getURL() {
        return this.url;
    }
    set setURL(URL) {
        this.url = URL;
    }
}
