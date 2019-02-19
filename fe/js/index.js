var Layer
// content container element id 
var content = "content"
var $
layui.define(['layer', 'form'], function (exports) {
    var layer = layui.layer
    Layer = layer
    $ = layui.$

    // ============================= init operations ============================ //

    var connectParams = {
        "host": "localhost"
        , "user": "root"
        , "password": "123"
        , "port": "3306"
        , "database": "user"
    }
    $.ajax({
        type: "GET"
        , url: '/connect'
        , data: connectParams
        , success: (data, statu) => {
            layui.use('tree', function () {
                let tablesSrc = []
                data.forEach((table, index) => {
                    tablesSrc.push({
                        name: table,
                        id: Number('11' + (index + 1))
                    })
                });
                var tree = layui.tree({
                    elem: '#db_tree' //指定元素
                    , skin: 'as' //设定皮肤
                    , drag: true
                    , click: selectAll
                    , nodes: [ //节点
                        {
                            name: 'connection_name'
                            , id: 1
                            , alias: 'connection'
                            , children: [
                                {
                                    name: connectParams.database
                                    , id: 11
                                    , alias: 'database'
                                    , children: tablesSrc
                                }
                            ]
                        }
                    ]
                });
            });
        }
    })

    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

// read from file
var connPanel = htmlTemplate.add_conn_panel
function newConnectionHandler() {
    Layer.tab({
        area: ['810px', '450px']
        , tab: [{
            title: "General",
            content: connPanel.general
        }
            , {
            title: "Advance",
            content: connPanel.advence
        }
            , {
            title: "DB",
            content: connPanel.db
        }
            , {
            title: "SSL",
            content: connPanel.ssl
        }
            , {
            title: "SSH",
            content: connPanel.ssh
        }
            , {
            title: "HTTP",
            content: connPanel.http
        }]
    })
}

function selectAll(item) {
    let idStr = String(item.id)
    console.log(item, idStr)
    // the length of item.id represent the level of tree
    // level 3 represent table ,click to select all data from the table
    if (idStr.startsWith('11') && idStr.length >= 3) {
        let table = item.name
        $.ajax({
            type: 'GET',
            url: '/select_all?table=' + table,
            success: data => {
                // use my module
                layui.use(['jx_table'], () => {
                    let tab = layui.jx_table
                    let tableElem = tab({
                        data:data
                    })
                    layui.$('#' + content).empty()
                    layui.$('#' + content).append(layui.$(tableElem))
                })
                console.log(data)
            }
        })
    }
    // level 2 represent database,click to connect
    else if (idStr.startsWith('1') && idStr.length >= 2) {
        // read connect params from cache file
    }

    else if (idStr === 1) {

    }

}