layui.define(function (exports) {

    function getPropName(arr) {
        let a0 = arr[0]
        let arrName = []
        for (let p in a0) {
            arrName.push(p)
        }
        return arrName
    }

    // function tab(arr, names) {
    //     let array = []
    //     arr.forEach(a => {
    //         let a2 = []
    //         names.forEach(name => {
    //             a2.push(a[name])
    //         })
    //         array.push(a2)
    //     })
    //     return array
    // }

    let template = `
        <table class='layui-table' lay-skin="row">
            <thead>
                <tr>`

    let template2 = `</tr>
            </thead>
            <tbody>`

    let template3 = `</tbody>
        </table>`
    // data
    let table = function (tb) {
        let tableElem = template
        let names = getPropName(tb.data)
        let ths = ''
        names.forEach(name => {
            ths += "<th>"+name+"</th>"
        })
        tableElem += ths + template2

        // let rows = tab(tb.data,names)
        tb.data.forEach(row => {
            console.log(row)
            tableElem += "<tr>"
            let tds = ''
            names.forEach(name => {
                tds += "<td>"+ row[name] + "</td>"
            })
            tableElem += tds + "</tr>"
        })
        tableElem += template3
        return tableElem
    }

    exports('jx_table', table)
})