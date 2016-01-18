/// <reference path="../typings/tsd.d.ts" />
var mysql = require("mysql");
function getPool() {
    return mysql.createPool({
        host: 'localhost',
        user: 'localuser',
        password: 'localuser',
        database: 'test'
    });
}
exports.getPool = getPool;
//# sourceMappingURL=mysql.js.map