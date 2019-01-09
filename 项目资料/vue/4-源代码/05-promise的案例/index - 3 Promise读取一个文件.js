// 读文件
const fs = require('fs')

// 需求: 读完第一个文件, 再读取第二个文件

// 因为 readFile 是异步操作, 所以, 两个readFile无法保证执行顺序
const p = new Promise(function (resolve, reject) {
  fs.readFile('./data/1.txt', function (err, data) {
    data = data.toString()
    // 成功
    resolve(data)
  })
})

p
  .then(function (data) {
    console.log('第一个文件内容:', data);
    return 1
  })
  .then(function (data) {
    console.log('第二个then', data);
  })



/* new Promise(function (resolve, reject) {
  fs.readFile('./data/1.txt', function (err, data) {
    if (err) {
      return reject(err)
    }

    data = data.toString()
    // 成功
    resolve(data)
  })
}) */
