// Imports
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
chai.use(chaiHttp);
let userID = null;
// Testing a new user
suite("Test user functions", async function () {
    setup(function () {
        this.app = server.app;
        this.userID = 10;
        this.firstName = "testFirstName";
        this.lastName = "testLastName"
        this.username = "testUsername";
        this.email = "test@test.com";
        this.password = "password"
        this.dob = "2000-03-11";
        this.newEmail = "TEST@test.com";
        this.newPassword = "1234";
    });
    // Making new user
    test("Register a user", async function () {
        await chai.request(this.app).post("/api/register").send({
            inpAgree: "on",
            userID: this.userID,
            inpFirstName: this.firstName,
            inpLastName: this.lastName,
            inpUsername: this.username,
            inpEmail: this.email,
            inpPassword: this.password,
            inpConfirmPassword: this.password,
            inpDOB: this.dob,
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "success", "User isn't registered");
        });
    });
    // User login
    test("Login user", async function () {
        await chai.request(this.app).post("/api/login").send({
            inpLoginEmail: this.email,
            inpLoginPassword: this.password
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            userID = response.text.replace(/^\D+/g, '');
            chai.assert.equal(response.text.replace(/[0-9]/g, ''), "user", "User Not Logged In");
        });
    });
    // User change email
    test("Change email", async function () {
        await chai.request(this.app).post("/api/changeEmail").send({
            testUserID: userID,
            currentEmail: this.email,
            newEmail: this.newEmail,
            emailPasswordConfirm: this.password
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "Email hasn't changed");
        });
    });
    // User change password
    test("Change Password", async function () {
        await chai.request(this.app).post("/api/changePassword").send({
            testUserID: userID,
            currentPassword: this.password,
            newPassword: this.newPassword,
            confirmNewPassword: this.newPassword,
            email: this.newEmail
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "Password hasn't changed");
        });
    });
    // Getting user details but password
    test("Get user details", async function () {
        let user = {
            userID: userID,
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.newEmail,
            dob: this.dob,
        };
        await chai.request(this.app).post("/api/getUserDetails").send({
            testUserID: userID
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.body[0].userID, user.userID, "Correct user details not gathered");
        });
    });
    // Removing that account
    test("Delete User", async function () {
        await chai.request(this.app).post("/api/deleteAccount").send({
            testUserID: userID,
            deleteEmail: this.newEmail,
            confirmPswrdDelete: this.newPassword
        }).then(function (response) {
            chai.assert.equal(response.status, 200);
            chai.assert.equal(response.text, "SUCCESS", "User not removed");
        });
    });
});
// Checking functions
suite("Test Topic", function () {
    setup(function () {
        this.app = server.app;
    });
    // Getting topics
    test("Get Topics", async function () {
        await chai.request(this.app).post("/api/getTopics").then(function (response) {
            if (!(response.error != true && typeof response.body == "object")) {
                chai.assert.fail("Topics were not gathered");
            }
        });
    });
    // Getting blogs
    test("Get Blogs", async function () {
        await chai.request(this.app).post("/api/getBlogs").then(function (response) {
            if (!(response.error != true && typeof response.body == "object")) {
                chai.assert.fail("Blogs aren't found");
            }
        });
    });
    // Cleaning up
    suiteTeardown(async function () {
        setTimeout((function () {
            return process.exit(0);
        }), 2000);
    })
});