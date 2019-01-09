// 读文件
const fs = require('fs')

// 需求: 读完第一个文件, 再读取第二个文件

// 因为 readFile 是异步操作, 所以, 两个readFile无法保证执行顺序

fs.readFile('./data/1.txt', function (err, data) {
  data = data.toString()
  console.log(data);

  fs.readFile('./data/2.txt', function (err, data) {
    data = data.toString()
    console.log(data);
  })
})