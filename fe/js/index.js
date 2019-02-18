// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
   
    
} else {
    alert('The File APIs are not fully supported in this browser.');
}

/**
  项目JS主入口
  以依赖layui的layer和form模块为例
**/
var Layer
layui.define(['layer', 'form'], function (exports) {
    var layer = layui.layer
    // , form = layui.form;
    Layer = layer
    // layer.msg('Hello World');

    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});

layui.use('tree', function () {
    var tree = layui.tree({
        elem: '#db_tree' //指定元素
        , skin: 'as' //设定皮肤
        , drag: true
        , click: function (item) { //点击节点回调
            console.log(item)
        }
        , nodes: [ //节点
            {
                name: 'connection_name'
                , id: 1
                , alias: 'changyong'
                , children: [
                    {
                        name: 'db_name1'
                        , id: 11
                        , alias: 'weidu'
                        ,children:[{
                            name:'table_name1'
                            ,id:111
                        },{
                            name:'table_name2'
                            ,id:112
                        },{
                            name:'table_name3'
                            ,id:113
                        }]
                    },{
                        name: 'db_name2'
                        , id: 12
                        , alias: 'weidu'
                        ,children:[{
                            name:'table_name1'
                            ,id:121
                        },{
                            name:'table_name2'
                            ,id:122
                        },{
                            name:'table_name3'
                            ,id:123
                        }]
                    },{
                        name: 'db_name3'
                        , id: 13
                        , alias: 'weidu'
                        ,children:[{
                            name:'table_name1'
                            ,id:131
                        },{
                            name:'table_name2'
                            ,id:132
                        },{
                            name:'table_name3'
                            ,id:133
                        }]
                    }
                ]
            }
        ]
    });
});

function newConnectionHandler() {
    // Layer.open({
    //     type:2 // iframe type
    //     ,title:'Add Connection'
    //     ,area: ['700px', '450px']
    //     ,fixed: true //固定
    //     ,maxmin: true
    //     ,content:"../add_conn_panel.html"
    // })

    // TODO: read the tab content from code_template.json
    Layer.tab({
        area: ['810px', '450px']
        , tab: [{
            title: "General",
            content: '<a>jkd</a>'
        }
            , {
            title: "Advance",
            content: 'Advance'
        }
            , {
            title: "DB",
            content: 'DB'
        }
            , {
            title: "SSL",
            content: 'SSL'
        }
            , {
            title: "SSH",
            content: 'SSH'
        }
            , {
            title: "HTTP",
            content: 'HTTP'
        }]
    })
}