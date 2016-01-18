import poolService = require("../services/mysql");
var pool = poolService.getPool();

import errorService = require("../services/error");

export function select(req, res) {
    var customerId = req.params.customer_id;

    pool.query('select * from `CustomerTimesCard` where `CustomerID` = ?', [customerId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        var result = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            result.push({
                id: row.ID,
                customer_id: row.CustomerID,
                total: row.Total,
                remains: row.Remains
            });
        }

        res.status(200).json(result);
    });
}

export function get(req, res) {
    var customerId = req.params.customer_id;
    var timesCardId = req.params.times_card_id;

    pool.query('select * from `CustomerTimesCard` where `CustomerID` = ? and `ID` = ?', [customerId, timesCardId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        if (rows.length == 0) {
            errorService.throwError(res, 404, "times card not found");
            return;
        }

        var row = rows[0];
        var result = {
            id: row.ID,
            customer_id: row.CustomerID,
            total: row.Total,
            remains: row.Remains
        };

        res.status(200).json(result);
    });
}

export function create(req, res) {
    var customerId = req.params.customer_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var total = req.body.total;
    var parameters = [customerId, total, total];
    pool.query('insert into `CustomerTimesCard` (`CustomerID`,`Total`,`Remains`) values (?,?,?)', parameters, function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        res.status(201).json({
            id: rows.insertId,
            customer_id: customerId,
            total: total,
            remains: total
        });
    });
}

export function update(req, res) {
    var customerId = req.params.customer_id;
    var timesCardId = req.params.times_card_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var total = req.body.total;
    var remains = req.body.remains;
    var parameters = [total, remains, customerId, timesCardId];
    pool.query('update `CustomerTimesCard` set `Total` = ?,`Remains` = ? where `CustomerID` = ?  and `ID` = ?', parameters, function (err) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        res.status(201).json({
            id: timesCardId,
            customer_id: customerId,
            total: total,
            remains: remains
        });
    });
}