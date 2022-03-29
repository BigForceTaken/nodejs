// 爬虫的思路可以总结为：请求 url - > html（信息） -> 解析html

const myRequest = require('request');// 服务端的发送http工具
const cheerio = require('cheerio'); // 后端的jquery

function requestApi(url,callback) {
    const options = {
        encoding: null
    };
    myRequest(url, options, callback)
}

requestApi('https://movie.douban.com/top250',function(error, response, body){
    const $ = cheerio.load(body.toString());
    let titles = []
// console.log($('.item', "#content"));
    $('.item .info .title', "#content").each((i,ele) =>{
        const title = $(ele).text();
        titles.push(title)
    });
    console.log(titles);
})