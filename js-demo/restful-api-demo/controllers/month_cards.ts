import poolService = require("../services/mysql");
var pool = poolService.getPool();

import moment = require("moment");

var errorService = require("../services/error");

export function select(req, res):void {
    var customerId = req.params.customer_id;

    pool.query('select * from `CustomerMonthCard` where `CustomerID` = ?', [customerId], function (err, rows) {
        if (err) {
            errorService.throw(res, 500, err);
            return;
        }

        var result = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            result.push({
                id: row.ID,
                customer_id: row.CustomerID,
                start_date: moment(row.StartDate).format("YYYY-MM-DD"),
                end_date: moment(row.EndDate).format("YYYY-MM-DD")
            });
        }

        res.status(200).json(result);
    });
}

export function create(req, res):void {
    var customerId = req.params.customer_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throw(res, 405, "Content-Type is not application/json");
        return;
    }

    var startDate = req.body.start_date;
    var endDate = req.body.end_date;
    var parameters = [customerId, startDate, endDate];
    pool.query('insert into `CustomerMonthCard` (`CustomerID`,`StartDate`,`EndDate`) values (?,?,?)', parameters, function (err, rows) {
        if (err) {
            errorService.throw(res, 500, err);
            return;
        }

        res.status(201).json({
            id: rows.insertId,
            customer_id: customerId,
            start_date: startDate,
            end_date: endDate
        });
    });
}