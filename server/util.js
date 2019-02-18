var fs = require('fs')

exports.readFile = function(fileName){
    return JSON.parse(fs.readFileSync(fileName))
}