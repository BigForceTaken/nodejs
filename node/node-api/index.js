// const fs = require("fs");

// fs.readFile('./config.js', (err, data) =>{
//   console.log(data.toString())
// })
const { readFile} = require("fs").promises

readFile('./config.js').then(data => {
  console.log(data.toString())
})

