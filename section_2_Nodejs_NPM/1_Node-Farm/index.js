const fs = require('fs');
const http = require('http');

fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    const productData = JSON.parse(data);
})

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === "/" || pathName === "/overview")
        res.end('This is the OVERVIEW');
    else if(pathName === '/product')
        res.end("This is the PRODUCT")
    else if(pathName === '/api'){
        fs.readFile('./dev-data/data.json', 'utf-8', (err, data) =>{
           
           res.writeHead(200, {'Content-type':'application/json'})
           res.end(data)
            if(err){
                console.log(err);
                return;
            }
        })
    }
    else{
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end('Page not found');
    }
})

server.listen(8000, () => {
    console.log("Server is up on 8000 port")
})