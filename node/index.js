function askServer (){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            reject();
            console.log(11232);
        },2000)
    })
}
(async function() {
    await askServer();
    console.log('callback');
})()