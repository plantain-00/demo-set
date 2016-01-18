/// <reference path="../typings/tsd.d.ts" />
import mysql = require("mysql");

export function getPool() {
    return mysql.createPool({
        host: 'localhost',
        user: 'localuser',
        password: 'localuser',
        database: 'test'
    });
}