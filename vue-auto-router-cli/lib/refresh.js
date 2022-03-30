// 查找views 目录下的文件，自动生成App.vue下的菜单和自动注册路由
const fs = require('fs');
const path = require('path')
const handlebars = require('handlebars');

module.exports = async (dirs) => {
    const list = fs.readdirSync(dirs).filter(v => v !== 'Home.vue').map(v => ({
        name: v.replace('.vue','').toLocaleLowerCase(),
        file: v
    }))
    const _fileTemplatePath = path.resolve(__dirname,'../hello/template/App.vue.hbs')
    const _filePath = path.resolve(__dirname,'../hello/src/App.vue')
    compile({list},_filePath,_fileTemplatePath);

    compile({list},path.resolve(__dirname,'../hello/src/router.js'),path.resolve(__dirname,'../hello/template/router.js.hbs'));
}

// refresh(path.resolve(__dirname,'../hello/src/views'))

/**
 * 按照传入的对象和模板生成最新的文件并写入
 * @param {obj} meta 
 * @param {*} filePath 
 * @param {*} templatePath 
 */
function compile(meta,filePath, templatePath) {
    if(fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath).toString();
        const result = handlebars.compile(template)(meta);
        fs.writeFileSync(filePath, result)
    }
}