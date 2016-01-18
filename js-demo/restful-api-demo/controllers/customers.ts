import poolService = require("../services/mysql");
var pool = poolService.getPool();

import errorService = require("../services/error");

export function get(req, res) {
    var weixinId:number = req.params.weixin_id;

    pool.query('select * from `Customers` where `WeixinID` = ?', [weixinId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        if (rows.length == 0) {
            errorService.throwError(res, 404, "customer not found");
            return;
        }

        var row = rows[0];
        res.status(200).json({
            id: row.ID,
            weixin_id: row.WeixinID,
            phone: row.Phone,
            name: row.Name,
            remain_return_times: row.RemainReturnTimes
        });
    });
}

export function create(req, res) {
    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var weixinId:number = req.body.weixin_id;
    var phone:string = req.body.phone;
    var name:string = req.body.name;
    var parameters = [weixinId, phone, name, 2];
    pool.query('insert into `Customers` (`WeixinID`,`Phone`,`Name`,`RemainReturnTimes`) values (?,?,?,?)', parameters, function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        res.status(201).json({
            id: rows.insertId,
            weixin_id: weixinId,
            phone: phone,
            name: name,
            remain_return_times: 2
        });
    });
}

export function update(req, res) {
    var customerId:number = req.params.customer_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var weixinId = req.body.weixin_id;
    var phone = req.body.phone;
    var name = req.body.name;
    var remainReturnTimes = req.body.remain_return_times;
    var parameters = [weixinId, phone, name, remainReturnTimes, customerId];
    pool.query('update `Customers` set `WeixinID` = ?, `Phone` = ?,`Name` = ?, `RemainReturnTimes` = ? where id=?', parameters, function (err) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        res.status(201).json({
            id: customerId,
            weixin_id: weixinId,
            phone: phone,
            name: name,
            remain_return_times: remainReturnTimes
        });
    });
}