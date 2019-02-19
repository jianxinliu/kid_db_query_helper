var Connect = require('./connect')
    , util = require('./util')

    , ConnectUtil = new Connect()

    , SQL = util.readFile(__dirname+'/../json/SQL_CONSTANTS.json')
    , config = util.readFile(__dirname+'/../json/config.json')

    , conn
    , currentDb
    , currentDBConf = config.currentDBConf
    
// ======================================= test ================================= //
// ("mysql://root:123@localhost:3306/mysql")

// conn = connect(
//     currentDBConf.host
//     , currentDBConf.user
//     , currentDBConf.password
//     , currentDBConf.port
//     , currentDBConf.database)

// showTables(c => {
//     console.log(c)
//     // desc(c[0], res => {
//     //     console.log(res)
//     // })
//     select_all_from(c[0],ret => {
//         console.log(ret)
//     })
// })

// ======================================= exports ================================== //
module.exports = function () {
    this.connect = connect
    this.connectByUrl = connectByUrl
    this.end = end
    this.showTables = showTables
    this.selectAllFrom = select_all_from
    this.exeSql = execute
    this.desc = desc
}

// ======================================== functions definetion ===================== //

/**
 * connect db
 * @param {*} host 
 * @param {*} user 
 * @param {*} password 
 * @param {*} port 
 * @param {*} database 
 * @param {*} other others params
 * @returns connection
 */
function connect(host, user, password, port, database, other) {
    let connection
    if(conn && currentDb === database){
        connection = conn
    }else{
        console.log('-------------------------a new connection ')
        connection = ConnectUtil.getConnect({
            host
            , user
            , password
            , port
            , database
            , multipleStatements: true
        })
        // init conn,cache currentDb
        conn = connection
        currentDb = database
        connection.connect()
    }
    // cache the connect properties
    let curr = config.currentDBConf
    curr.host = host
    curr.user = user
    curr.password = password
    curr.port = port
    curr.database = database

    return connection;
}

function connectByUrl(url) {
    let con = ConnectUtil.getConnect(url)
    con.connect();
    return con
}
/**
 * end connection
 */
function end() {
    conn.end();
}

/**
 * show all tables.
 * @param {*} cb callback cb(table list)
 */
function showTables(cb) {
    conn.query(SQL.SHOW_TABLE, (err, rows) => {
        if (err) {
            return parseError(err)
        }
        var ret = []
        for (var i = 0; i < rows.length; i++) {
            let data = rows[i]
            ret.push(data["Tables_in_" + currentDBConf.database])
        }
        cb(ret)
    })
}

/**
 * select * from {table}
 * @param {*} table table name
 * @param {*} cb callback cb(propertie list)
 */
function select_all_from(table, cb) {
    conn.query(SQL.SELECT_ALL_FROM + table, (err, rows) => {
        if (err) {
            return parseError(err)
        }
        cb(praseToJSON(rows))
    })
}
/**
 * run `desc {table}` command
 * @param {*} table 
 * @param {*} cb 
 */
function desc(table, cb) {
    execute(SQL.DESC + table, res => {
        cb(res)
    })
}

/**
 * execute specified sql
 * @param {*} SQL 
 * @param {*} cb 
 */
function execute(SQL, cb) {
    conn.query(SQL, (err, rows) => {
        if (err) {
            return parseError(err)
        }
        cb(praseToJSON(rows))
    })
}

/**
 * prase result set to json
 * @param {*} rows ResultSet
 */
function praseToJSON(rows) {
    let ret = []
    rows.forEach(row => {
        let obj = {}
        for (let field in row) {
            obj[field] = row[field]
        }
        ret.push(obj)
    });
    return ret;
}

function parseError(err) {
    console.error(err.code, " & ", err.sqlMessage)
    return {
        code: err.code,
        errno: err.errno,
        sqlMsg: err.sqlMessage,
        sql: err.sql,
        others: {
            Error: err.Err,
            index: err.index,
            sqlState: err.sqlState,
        }
    }
}

// function wrapper(err,rows,fields){
    // if(err){
    //     return parseError(err)
    // }

// }