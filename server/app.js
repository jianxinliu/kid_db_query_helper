var http = require('http')
    , util = require('./util')
    , fs = require('fs')
    , url = require('url')
    , route = require('./router')
    , DBHelper = require('./DBHelper')

    , config = util.readFile(__dirname + '/../json/config.json')

    , db_helper = new DBHelper()

// router should add before createServer
route.post('/hello', (req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    resp.write("res")
    resp.end()
})

route.post('/connect', (req, resp) => {
    // get connect properties from request
    req
    // store the properties to config.js and connect
    db_helper.connect()

    //find all tables which belong to the database automatily.
    db_helper.showTables(data => {
        response(resp,data)
    })
})

route.post('/select_all',(req,resp) => {

    let table = req
    
    db_helper.selectAllFrom(table,ret => {
        response(resp,ret)
    })
})



http.createServer((request, resp) => {
    var handler = route.Router[request.url]
    if (handler) {
        handler(request, resp)
    } else {
        resp.writeHead(404, { 'Content-Type': 'text/plain' });
        resp.end("ERROR File does not exist");
    }
}).listen(config.server.port)


function response(resp,data){
    resp.writeHead(200,{'Content-Type':"text/json"});
    resp.write(data)
    resp.end();
}