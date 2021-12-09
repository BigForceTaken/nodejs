const http = require('http');

http.get('http://localhost:3000', (res) => {
    res.on('data', (data) => {
        console.log(JSON.stringify(data.toString()))
        
    })
})