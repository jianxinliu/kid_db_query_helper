var fs = require('fs')
var layuiPath = "/../fe/lib/layui/"

// dump way!
var layuiHandler = {
    layer:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'lay/modules/layer.js',resp)
    }
    ,tree:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'lay/modules/tree.js',resp)
    }
    ,css:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'css/layui.css',resp)
    }
    ,js:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'layui.js',resp)
    }
    ,layerCss:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'css/modules/layer/default/layer.css',resp)
    }
    ,jquery:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'lay/modules/jquery.js',resp)
    }
    ,form:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'lay/modules/form.js',resp)
    }
    ,fontwoff:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'font/iconfont.woff',resp)
    }
    ,fontttf:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'font/iconfont.ttf',resp)
    }
    ,loadGif:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'css/modules/layer/default/loading-1.gif',resp)
    }
    ,icon:function(req,resp){
        getStaticFile(__dirname + layuiPath + 'css/modules/layer/default/icon.png',resp)
    }
}

function index(req,resp){
    fs.readFile(__dirname + '/../fe/index.html', (err, res) => {
        resp.writeHead(200, {'Content-Type': 'text/html'});    
        resp.write(res)
        resp.end()
    })
}

function indexJx(req,resp){
    getStaticFile(__dirname + '/../fe/js/index.js',resp)
}

var myStatic = {
    add_conn_panel:function(req,resp){
        getStaticFile(__dirname + '/../fe/add_conn_panel.html',resp)
    }
    ,code_template:function(req,resp){
        getStaticFile(__dirname + '/../json/code_template.js',resp)
    }
    ,jx_table:function(req,resp){
        getStaticFile(__dirname + '/../fe/js/jx_table.js',resp)
    }
}

function getStaticFile(filePath,resp){
    let ext = ""
    if(filePath.endsWith(".js")){
        ext = "js"
    }else if(filePath.endsWith(".css")){
        ext = "css"
    }
    console.log(filePath)
    var readStream = fs.createReadStream(filePath)
    readStream.pipe(resp)
}


Router = {
    "/":index
    ,"/layui.css":layuiHandler.css
    ,"/layui.js":layuiHandler.js
    ,"/js/layui.js":layuiHandler.js
    ,"/js/index.js":indexJx
    ,"/lay/modules/layer.js":layuiHandler.layer
    ,"/lay/modules/tree.js":layuiHandler.tree
    ,"/css/modules/layer/default/layer.css":layuiHandler.layerCss
    ,"/lay/modules/jquery.js":layuiHandler.jquery
    ,"/lay/modules/form.js":layuiHandler.form
    ,"/font/iconfont.woff":layuiHandler.fontwoff
    ,"/font/iconfont.ttf":layuiHandler.fontttf
    ,"/add_conn_panel.html":myStatic.add_conn_panel
    ,"/css/modules/layer/default/loading-1.gif":layuiHandler.loadGif
    ,"/css/modules/layer/default/icon.png":layuiHandler.icon
    ,"/json/code_template.js":myStatic.code_template
    ,"/js/jx_table.js":myStatic.jx_table
}

exports.Router = Router

exports.post = function(url,cb){
    Router[url] = cb
}