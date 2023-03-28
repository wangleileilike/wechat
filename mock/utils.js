const fs = require('fs')
const p=require("path");
function readAllFile(root, reg) {

    var resultArr = [];
    var thisFn = arguments.callee;
    if (fs.existsSync(root)) {//文件或文件夹存在

        var stat = fs.lstatSync(root); // 对于不存在的文件或文件夹，此函数会报错

        if (stat.isDirectory()) {// 文件夹
            var files = fs.readdirSync(root);
            files.forEach(function (file) {

                var t = thisFn(root + '/' + file, reg);
                resultArr = resultArr.concat(t);
            });

        } else {
            if (reg !== undefined) {

                if (typeof reg.test == 'function'
                    && reg.test(root)) {
                    resultArr.push(root);
                }
            }
            else {
                resultArr.push(root);
            }
        }
    }
    return resultArr;
}



function deleteFolder(path = p.normalize(`${process.cwd()}/dist`)) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = p.resolve(path,file)
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

module.exports = {
    readAllFile,deleteFolder
}