/**
 * Created by yaoyao on 15/2/6.
 */
var isDesc = false;
var theColumn = "";
var usersTemplate;
var paginationTemplate;

$(document).ready(function () {
    $.ajax({
        url: "/templates/users-pagination.html",
        data: {},
        success: function (data) {
            paginationTemplate = Handlebars.compile(data);
        }
    });

    $.ajax({
        url: "/templates/users.html",
        data: {},
        success: function (data) {
            usersTemplate = Handlebars.compile(data);
        }
    });
});

function getDirection() {
    return isDesc ? "glyphicon-arrow-down" : "glyphicon-arrow-up";
}

function getCondition(page) {
    return {
        page: page,
        name: $.trim($("#name").val()),
        age: $.trim($("#age").val()),
        isDesc: isDesc,
        column: theColumn
    };
}

function navigateTo(page, column) {
    if (column != undefined) {
        theColumn = column;
        isDesc = !isDesc;
    }
    $.ajax({
        url: "/getUsers",
        data: getCondition(page),
        success: function (data) {
            $("#users").html(usersTemplate(data.users));
            $("#pagination").html(paginationTemplate(data.pagination));
            if (theColumn != "" && $("#" + theColumn) != undefined) {
                var direction = getDirection();
                $("#" + theColumn).removeClass("glyphicon-sort").addClass(direction);
            }
        }
    });
}