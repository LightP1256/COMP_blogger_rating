$(function () {
    // Registration form completion
    $('#registration').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "usernameErr") {
                    // Username not available
                    $('#usernameErr').attr('hidden', false);
                    $('#inpUsername').addClass("is-invalid");
                } else if (response == "passwordErr") {
                    // Password doesn't match. Please try again.
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");
                    $('#passwordErr').attr('hidden', false);
                    $('#inpPassword').addClass("is-invalid");
                    $('#inpConfirmPassword').addClass("is-invalid");
                } else if (response == "success") {
                    // User added to DB
                    $('#usernameErr').attr('hidden', true);
                    $('#inpUsername').removeClass("is-invalid");
                    $('#passwordErr').attr('hidden', true);
                    $('#inpPassword').removeClass("is-invalid");
                    $('#inpConfirmPassword').removeClass("is-invalid");
                    alert("Signed Up");
                    location.replace("/login");
                } else if (response == "agreeErr") {
                    $('#agreeErr').attr('hidden', false);
                }
            }
        });
        return false;
    });
    // cookie agree
    $('#inpAgree').click(function () {
        if ($('#inpAgree').prop('checked') == true) {
            $('#agreeErr').attr('hidden', true);
        }
    })
});