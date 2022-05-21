class User {
    constructor(UserID, FirstName, LastName, Username, Email, DOB) {
        this.userID = UserID;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.username = Username;
        this.email = Email;
        this.dob = DOB;
    }
    // UserID
    get getUserID() {
        return this.userID;
    }
    set setUserID(UserID) {
        this.userID = UserID;
    }
    // FirstName
    get getFirstName() {
        return this.firstName;
    }
    set setFirstName(FirstName) {
        this.firstName = FirstName;
    }
    // LastName
    get getLastName() {
        return this.lastName;
    }
    set setLastName(LastName) {
        this.lastName = LastName;
    }
    // Username
    get getUsername() {
        return this.username;
    }
    set setUsername(Username) {
        this.username = Username;
    }
    // Email
    get getEmail() {
        return this.email;
    }
    set setEmail(Email) {
        this.email = Email;
    }
    // DOB
    get getDOB() {
        return this.dob;
    }
    set setDOB(DOB) {
        this.dob = DOB;
    }
}
