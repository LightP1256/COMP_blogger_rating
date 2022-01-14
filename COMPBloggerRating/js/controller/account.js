$(function () {
    // Getting all User details when account page loads
    $.post("/api/getUserDetails", function (data) {
        let user = data[0];
        // display details
        let firstName = user.firstName;
        let lastName = user.lastName;
        let username = user.username;
        let email = user.email;
        let dob = user.dob;

        $('#userFirstName').html(firstName);
        $('#userLastName').html(lastName);
        $('#userUsername').html(username);

        $('#userEmail').html(email);
        $('#currentEmail').val(email);
        $('#pswrdEmail').val(email);
        $('#deleteEmail').val(email);

        $('#userDOB').html(dob);
    });
    // Clearing cookie and topicID
    $('#btnLogout').click(async function () {
        Cookies.remove("user");
        localStorage.removeItem("topic");
        location.reload();
    })
    // To show popup for change email
    $('#btnChangeEmail').click(function () {
        $('#changeEmail').modal('show');
    });
    // To show popup for change password
    $('#btnChangePassword').click(function () {
        $('#changePassword').modal('show');
    });
    // To show popup for delete account
    $('#btnDeleteAccount').click(function () {
        $('#deleteAccount').modal('show');
    });
    // For update email on submit form
    $('#updateEmail').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "Err") {
                    $('#passwordErr').attr('hidden', false);
                    $('#emailPasswordConfirm').addClass("is-invalid");
                } else if (response == "success") {
                    alert("Email Successfully Updated");
                    location.reload();
                }
            }
        });
        return false;
    });
    // For update password on submit form
    $('#updatePassword').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "passwordErr") {
                    // The new passwords doesn't match correctly
                    $('#passwordMismatch').attr('hidden', false);
                    $('#newPassword').addClass("is-invalid");
                    $('#confirmNewPassword').addClass("is-invalid");
                } else if (response == "incorrectPswrd") {
                    // Wrong password
                    $('#passwordMismatch').attr('hidden', true);
                    $('#newPassword').removeClass("is-invalid");
                    $('#confirmNewPassword').removeClass("is-invalid");
                    $('#passwordIncorrect').attr('hidden', false);
                    $('#currentPassword').addClass("is-invalid");
                } else if (response == "success") {
                    // Password has been changed
                    $('#passwordMismatch').attr('hidden', true);
                    $('#passwordIncorrect').attr('hidden', true);
                    $('#currentPassword').removeClass("is-invalid");
                    $('#newPassword').removeClass("is-invalid");
                    $('#confirmNewPassword').removeClass("is-invalid");
                    // User alert
                    alert("Password successfully changed");
                    location.reload();
                }
            }
        });
        return false;
    });
    // For delete account on submit form
    $('#frmDeleteAccount').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: async function (response) {
                if (response == "incorrectPswrd") {
                    $('#confirmErr').attr('hidden', false);
                    $('#confirmPswrdDelete').addClass("is-invalid");
                } else if (response == "success") {
                    // User has been removed
                    $('#confirmErr').attr('hidden', true);
                    $('#confirmPswrdDelete').removeClass("is-invalid");
                    alert("Your Account has successfully been removed");
                    // Login out process clearing cookie and removing topicID
                    Cookies.remove("user");
                    localStorage.removeItem("topic");
                    location.reload();
                }
            }
        });
        return false;
    });
})