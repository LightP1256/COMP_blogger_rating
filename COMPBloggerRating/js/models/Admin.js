class Admin {
    constructor(AdminID, UserID) {
        this.adminID = AdminID;
        this.userID = UserID;
    }
    // UserID
    get getUserID() {
        return this.userID;
    }
    set setUserID(UserID) {
        this.userID = UserID;
    }
    // AdminID
    get getAdminID() {
        return this.adminID;
    }
    set setAdminID(AdminID) {
        this.adminID = AdminID;
    }
}