var poolService = require("../services/mysql");
var pool = poolService.getPool();
var moment = require("moment");
var errorService = require("../services/error");
var routeStatusService = require("../services/routeStatus");
function select(req, res) {
    pool.query('select * from `Routes`', [], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }
        var result = [];
        var sql = "select s.*,rs.* from `Sites` s " + "left join `RouteSite` rs " + "on rs.`SiteID`=s.`ID` " + "where rs.`RouteID` in (";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            result.push({
                id: row.ID,
                name: row.Name,
                go_to_work_start_time: moment(row.GoToWorkStartTime, "HH:mm:ss").format("HH:mm"),
                go_to_work_end_time: moment(row.GoToWorkEndTime, "HH:mm:ss").format("HH:mm"),
                from_work_start_time: moment(row.FromWorkStartTime, "HH:mm:ss").format("HH:mm"),
                from_work_end_time: moment(row.FromWorkEndTime, "HH:mm:ss").format("HH:mm"),
                description: row.Description,
                go_to_work_price: row.GoToWorkPrice,
                from_work_price: row.FromWorkPrice,
                status: routeStatusService.getName(row.Status),
                go_to_work_sites: [],
                from_work_sites: []
            });
            if (i == 0) {
                sql += row.ID;
            }
            else {
                sql += "," + row.ID;
            }
        }
        sql += ") order by rs.`Index`";
        pool.query(sql, [], function (err, rows) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }
            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    var row = rows[i];
                    if (row.RouteID == result[j].id) {
                        if (row.Direction == 0) {
                            result[j].go_to_work_sites.push({
                                name: row.Name,
                                time: moment(row.Time, "HH:mm:ss").format("HH:mm"),
                                description: row.Description,
                                image_url: row.ImageUrl
                            });
                        }
                        else if (row.Direction == 1) {
                            result[j].from_work_sites.push({
                                name: row.Name,
                                time: moment(row.Time, "HH:mm:ss").format("HH:mm"),
                                description: row.Description,
                                image_url: row.ImageUrl
                            });
                        }
                    }
                }
            }
            res.status(200).json(result);
        });
    });
}
exports.select = select;
function get(req, res) {
    var routeId = req.params.route_id;
    pool.query('select * from `Routes` where `ID` = ?', [routeId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }
        if (rows.length == 0) {
            errorService.throwError(res, 404, "route not found");
            return;
        }
        var row = rows[0];
        var result = {
            id: routeId,
            name: row.Name,
            go_to_work_start_time: moment(row.GoToWorkStartTime, "HH:mm:ss").format("HH:mm"),
            go_to_work_end_time: moment(row.GoToWorkEndTime, "HH:mm:ss").format("HH:mm"),
            from_work_start_time: moment(row.FromWorkStartTime, "HH:mm:ss").format("HH:mm"),
            from_work_end_time: moment(row.FromWorkEndTime, "HH:mm:ss").format("HH:mm"),
            description: row.Description,
            go_to_work_price: row.GoToWorkPrice,
            from_work_price: row.FromWorkPrice,
            status: routeStatusService.getName(row.Status),
            go_to_work_sites: [],
            from_work_sites: []
        };
        var sql = "select s.*,rs.* from `Sites` s " + "left join `RouteSite` rs " + "on rs.`SiteID`=s.`ID` " + "where rs.`RouteID` = ? " + "order by rs.`Index`";
        pool.query(sql, [routeId], function (err, rows) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row.Direction == 0) {
                    result.go_to_work_sites.push({
                        name: row.Name,
                        time: moment(row.Time, "HH:mm:ss").format("HH:mm"),
                        description: row.Description,
                        image_url: row.ImageUrl
                    });
                }
                else if (row.Direction == 1) {
                    result.from_work_sites.push({
                        name: row.Name,
                        time: moment(row.Time, "HH:mm:ss").format("HH:mm"),
                        description: row.Description,
                        image_url: row.ImageUrl
                    });
                }
            }
            res.status(200).json(result);
        });
    });
}
exports.get = get;
//# sourceMappingURL=routes.js.map