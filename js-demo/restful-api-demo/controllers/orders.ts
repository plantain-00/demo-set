import poolService = require("../services/mysql");
var pool = poolService.getPool();

import moments = require("moment");
import routeTypeService = require("../services/routeType");
import errorService = require("../services/error");
import orderStatusService = require("../services/orderStatus");
var orderVendorStatusService = require("../services/orderVendorStatus");

export function select(req, res) {
    var customerId = req.params.customer_id;

    pool.query('select * from `Orders` where `CustomerID` = ?', [customerId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        var result = [];
        var sql = "select * from `OrderDate` where `OrderID` in (";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            result.push({
                id: row.ID,
                customer_id: customerId,
                date_description: row.DateDescription,
                price: row.Price,
                discount: row.Discount,
                actual_price: row.ActualPrice,
                status: orderStatusService.getName(row.Status),
                vendor_status: orderVendorStatusService.getName(row.VendorStatus),
                route_type: routeTypeService.getName(row.RouteType),
                dates: [],
                route_id: row.RouteID
            });
            if (i == 0) {
                sql += row.ID;
            }
            else {
                sql += "," + row.ID;
            }
        }
        sql += ")";

        pool.query(sql, [], function (err, rows) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }

            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    var row = rows[i];
                    if (row.OrderID == result[j].id) {
                        result[j].dates.push(moments(row.Date).format("YYYY-MM-DD"));
                        break;
                    }
                }
            }

            res.status(200).json(result);
        });
    });
}

export function get(req, res) {
    var customerId = req.params.customer_id;
    var orderId = req.params.order_id;

    pool.query('select * from `Orders` where `CustomerID` = ? and `ID` = ?', [customerId, orderId], function (err, rows) {
        if (err) {
            errorService.throwError(res, 500, err);
            return;
        }

        if (rows.length == 0) {
            errorService.throwError(res, 404, "order not found");
            return;
        }

        var row = rows[0];
        var result = {
            id: orderId,
            customer_id: customerId,
            date_description: row.DateDescription,
            price: row.Price,
            discount: row.Discount,
            actual_price: row.ActualPrice,
            status: orderStatusService.getName(row.Status),
            vendor_status: orderVendorStatusService.getName(row.VendorStatus),
            route_type: routeTypeService.getName(row.RouteType),
            dates: [],
            route_id: row.RouteID
        };

        pool.query("select * from `OrderDate` where `OrderID` = ?", [orderId], function (err, rows) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }

            for (var i = 0; i < rows.length; i++) {
                result.dates.push(moments(rows[i].Date).format("YYYY-MM-DD"));
            }

            res.status(200).json(result);
        });
    });
}

export function create(req, res) {
    var customerId = req.params.customer_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var dates = req.body.dates;

    var dateDescription = req.body.date_description;
    var routeId = req.body.route_id;
    var price = req.body.price;
    var discount = req.body.discount;
    var actualPrice = price - discount;
    var routeType = req.body.route_type;
    var routeTypeValue = routeTypeService.getValue(routeType);
    var parameters = [customerId, dateDescription, routeId, price, discount, actualPrice, 0, 0, routeTypeValue];
    pool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }
            connection.query('insert into `Orders` (`CustomerID`,`CreateTime`,`DateDescription`,`RouteID`,`Price`,`Discount`,`ActualPrice`,`Status`,`VendorStatus`,`RouteType`) values (?,now(),?,?,?,?,?,?,?,?)', parameters, function (err, rows) {
                if (err) {
                    connection.rollback(function () {
                        errorService.throwError(res, 500, err);
                    });
                    return;
                }

                var sql = "insert into `OrderDate` (`OrderID`,`Date`) values ";
                parameters = [];
                var id = rows.insertId;
                for (var i = 0; i < dates.length; i++) {
                    if (i == 0) {
                        sql += '(?,?)';
                    }
                    else {
                        sql += ',(?,?)';
                    }
                    parameters.push(id);
                    parameters.push(moments(dates[i]).format("YYYY-MM-DD"));
                }

                connection.query(sql, parameters, function (err) {
                    if (err) {
                        connection.rollback(function () {
                            errorService.throwError(res, 500, err);
                        });
                        return;
                    }

                    connection.commit(function (err) {
                        if (err) {
                            connection.rollback(function () {
                                errorService.throwError(res, 500, err);
                            });
                        }
                        connection.release();
                        res.status(201).json({
                            id: id,
                            customer_id: customerId,
                            date_description: dateDescription,
                            price: price,
                            discount: discount,
                            actual_price: actualPrice,
                            status: orderStatusService.getName(0),
                            vendor_status: orderVendorStatusService.getName(0),
                            route_type: routeType,
                            dates: dates,
                            route_id: routeId
                        });
                    });
                });
            });
        });
    });
}

export function update(req, res) {
    var customerId = req.params.customer_id;
    var orderId = req.params.order_id;

    if (req.get('Content-Type') != "application/json") {
        errorService.throwError(res, 405, "Content-Type is not application/json");
        return;
    }

    var dates = req.body.dates;

    var dateDescription = req.body.date_description;
    var routeId = req.body.route_id;
    var price = req.body.price;
    var discount = req.body.discount;
    var actualPrice = price - discount;
    var routeType = req.body.route_type;
    var routeTypeValue = routeTypeService.getValue(routeType);
    var status = req.body.status;
    var statusValue = orderStatusService.getValue(status);
    var vendorStatus = req.body.vendor_status;
    var vendorStatusValue = orderVendorStatusService.getValue(vendorStatus);
    var parameters = [dateDescription, routeId, price, discount, actualPrice, statusValue, vendorStatusValue, routeTypeValue, customerId, orderId];
    pool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                errorService.throwError(res, 500, err);
                return;
            }
            connection.query('update `Orders` set `DateDescription` = ?,`RouteID` = ?,`Price` = ?,`Discount` = ?,`ActualPrice` = ?,`Status` = ?,`VendorStatus` = ?,`RouteType` = ? where `CustomerID` = ?  and `ID` = ?', parameters, function (err) {
                if (err) {
                    connection.rollback(function () {
                        errorService.throwError(res, 500, err);
                    });
                    return;
                }

                connection.query("delete from `OrderDate` where `OrderID` = ?", [orderId], function (err) {
                    if (err) {
                        connection.rollback(function () {
                            errorService.throwError(res, 500, err);
                        });
                        return;
                    }

                    var sql = "insert into `OrderDate` (`OrderID`,`Date`) values ";
                    parameters = [];
                    for (var i = 0; i < dates.length; i++) {
                        if (i == 0) {
                            sql += '(?,?)';
                        }
                        else {
                            sql += ',(?,?)';
                        }
                        parameters.push(orderId);
                        parameters.push(moments(dates[i]).format("YYYY-MM-DD"));
                    }

                    connection.query(sql, parameters, function (err) {
                        if (err) {
                            connection.rollback(function () {
                                errorService.throwError(res, 500, err);
                            });
                            return;
                        }

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    errorService.throwError(res, 500, err);
                                });
                            }
                            connection.release();
                            res.status(201).json({
                                id: orderId,
                                customer_id: customerId,
                                date_description: dateDescription,
                                price: price,
                                discount: discount,
                                actual_price: actualPrice,
                                status: status,
                                vendor_status: vendorStatus,
                                route_type: routeType,
                                dates: dates,
                                route_id: routeId
                            });
                        });
                    });
                });
            });
        });
    });
}