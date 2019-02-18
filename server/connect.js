var mysql = require('mysql');

var conn

module.exports = function(){
    this.getConnect = function(connObj){
        return conn = mysql.createConnection(connObj)
    }
    this.end = function(){
        conn.end()
    }
}