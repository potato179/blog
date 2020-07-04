const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();
const showdown = require("showdown");

const hostname = "127.0.0.1";
const port = "3000";

app.listen(port, hostname, () => {
    console.log(port, hostname);
});

app.use("/public", express.static("public"));

app.get("/", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

app.get("/md", function(req, res, next){
    var pageName  = req.query.pageName;

    fs.readFile('public/articles/' + pageName, 'utf8', function(err, data){
        if(err) return err;

        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);
        res.send(html);
    });

});