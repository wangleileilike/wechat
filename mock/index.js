const express = require('express');
const path =require('path')
const app = new express();

const bodyParser = require('body-parser');
let fs = require('fs')
const fsUtil = require('./utils')

const files = fsUtil.readAllFile('./mock/json', /.json$/);
app.use(express.static(path.join(process.cwd(),'./mock/static')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());
files.map(filepath => {
    let ret = fs.readFileSync(filepath, 'utf8');
    const url = (filepath.replace('.json', '').replace('./mock/json', ''));
    console.log("正在监听url",url);
    app.post(url, function (_, res) {  //这里参数加上刚刚的解析的而且这里不是get了
        res.send(ret);
    })

    app.get(url, function (_, res) {  //这里参数加上刚刚的解析的而且这里不是get了
        res.send(ret);
    })
})

    app.listen(5000);


