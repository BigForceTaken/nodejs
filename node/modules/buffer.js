var mybuffer = Buffer.from('==ii1j2i3h1i23h','base64');
console.log(mybuffer);
require('fs').writeFile('logo.png',mybuffer,function (params) {
    
})