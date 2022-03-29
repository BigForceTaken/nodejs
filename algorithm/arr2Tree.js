/**
 * 后端返回的数据结构
 * let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
处理结果：
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": []
            }
        ]
    }
]

 */
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;
  
      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }
  
      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }
  
      const treeItem =  itemMap[id];
  
      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }
  
    }
    return result;
  }
  
console.log(arrayToTree(arr))
function arr2Tree(data) {
    let map = {},result=[];
    data.forEach(ele => {
        const pid = ele.id;
        if(!map[pid]) {
            map[pid] = {
                ...ele,
                children:[]
            }
        }
    });
    for(let key in map) {
        console.log('key',key);
        if(key !== 1) {
            map['1'].children.push(map[key]);
        }
    }
    console.log('map', map);
    result.push(map['1'])
    console.log('result',result);
}
