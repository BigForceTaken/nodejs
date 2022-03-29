const fs = require('fs');

const readFile1 = require('util').promisify(fs.readFile);

// promisify
readFile1('./index.js').then(res => {
    console.log(res.toString());
})

// fs.promises
// (async function() {
//     const readFile = require('fs').promises.readFile;
//     const data = await readFile('./package.json');
//     console.log(Buffer.from(data).toString());
// })()