/**
 * Created by yaoyao on 15/2/6.
 */
$(document).ajaxSend(function () {
    $("#cover").css("display", "block");
    $("html").addClass("wait");
});

$(document).ajaxStop(function () {
    $("#cover").css("display", "none");
    $("html").removeClass("wait");
});
