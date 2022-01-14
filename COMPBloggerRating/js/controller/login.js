$(function () {
    // Login form completion
    $('#login').submit(function () {
        $(this).ajaxSubmit({
            error: function (xhr) {
                status('Error: ' + xhr.status);
            },
            success: function (response) {
                if (response == "Err") {
                    // Login details Wrong
                    $('#loginErr').attr('hidden', false);
                    $('#inpLoginEmail').addClass("is-invalid");
                    $('#inpLoginPassword').addClass("is-invalid");
                } else if (response.replace(/[0-9]/g, '') == "user") {
                    // Setting user cookie that expires in 1 Day
                    Cookies.set("user", response.replace(/^\D+/g, ''), { expires: 1 });
                    $('#loginErr').attr('hidden', true);
                    $('#inpLoginEmail').removeClass("is-invalid");
                    $('#inpLoginPassword').removeClass("is-invalid");
                    localStorage.setItem('topic', "1");
                    location.replace("/main");
                }
            }
        });
        return false;
    });
});