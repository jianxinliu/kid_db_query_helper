var http = require('http')
    , util = require('./util')
    // , fs = require('fs')
    // , url = require('url')
    , route = require('./router')
    , DBHelper = require('./DBHelper')

    , config = util.readFile(__dirname + '/../json/config.json')

    , db_helper = new DBHelper()

// router should add before createServer
route.post('/hello', (queryObj, resp) => {
    resp.writeHead(200, { 'Content-Type': 'text/json' });
    resp.write("res")
    console.log(queryObj)
    resp.end()
})

/**
 * establish a connect to database
 */
route.post('/connect', (req, resp) => {
    // get connect params from request
    let params = req.queryData
    // store the params to config.js and connect
    db_helper.connect(params.host
        ,params.user
        ,params.password
        ,params.port
        ,params.database)

    //find all tables which belong to the database automatily.
    db_helper.showTables(data => {
        response(resp,data)
    })
})

/**
 * show all tables which belongs to the database
 */
route.post('/select_all',(req,resp) => {

    let table = req.queryData['table']
    
    db_helper.selectAllFrom(table,ret => {
        response(resp,ret)
    })
})


http.createServer((request, resp) => {
    let queryObj = parseUrl(request.url)
    var handler = route.Router[queryObj.url]
    if (handler) {
        // simplify the request object to {url,queryString}
        handler(queryObj, resp)
    } else {
        resp.writeHead(404, { 'Content-Type': 'text/plain' });
        resp.end("ERROR File does not exist");
    }
}).listen(config.server.port)

// common response
function response(resp,data){
    resp.writeHead(200,{'Content-Type':"text/json"});
    resp.write(JSON.stringify(data))
    resp.end();
}

/**
 * parse url to queryString
 * @param {} url url string
 * @returns {object} object:{ pure url, queryData }
 */
function parseUrl(url){
    let params = url.split('?')
    let ret = {
        url:params[0]
        ,queryData:{}
    }
    let queryData = {}
    // console.log(params)

    // truely have queryString
    if(params[1]){
        let queryArray = params[1].split('&')
        queryArray.forEach(q => {
            let kv = q.split('=')
            queryData[kv[0]]=kv[1]
        });
    }
    ret.queryData = queryData
    return ret;
}