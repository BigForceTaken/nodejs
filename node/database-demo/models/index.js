const express = require('express');
const mongo = require('./mongo');
const path = require('path')
const fs = require('fs');

const app = express();
app.get('/', function(req,res){
  fs.createReadStream(path.resolve(__dirname, '../index.html')).pipe(res)
})
app.get('/api/list',async function(req, res){
  console.log(req.query)
  let {page, category, name,pagesize } = req.query;
  let condition ={}
  if(category){
    condition.category = category
  }
  if(name){
    condition.name = new RegExp(name);
  }
  page = parseInt(page),pagesize = parseInt(pagesize);
  const col = mongo.col('fruits','test');
  const total = await col.find(condition).count()
  const data = await col.find(condition)
                .skip((page-1)*pagesize)
                .limit(pagesize)
                .toArray()
  console.log(data)
  res.json({
    ok:1,
    data:{
      fruits:data,
      page:{
        total,
        page,
        pagesize
      }
    }
  })
})
app.get('/api/category',async function(req,res){
  const col = mongo.col('fruits','test');
  const category = await col.distinct('category');
  res.json({
    ok:1,
    data: category
  })
})
app.listen(3000,()=>{
  console.log('server listen in 3000.')
})