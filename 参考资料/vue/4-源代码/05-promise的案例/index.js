// 读文件
const fs = require('fs')

// 需求: 读完第一个文件, 再读取第二个文件

// 因为 readFile 是异步操作, 所以, 两个readFile无法保证执行顺序
function readTxt(path) {
  const p = new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      data = data.toString()
      // 成功
      resolve(data)
    })
  })

  return p
}

readTxt('./data/1.txt')
  .then(function (data) {
    console.log('通过Promise获取到第一个文件内容:', data);

    // 返回一个Promise对象
    // 那么后面的 then 就是当前返回 Promise 对象的then, 所以, 可以在后面的then中获取到当前返回的数据
    return readTxt('./data/2.txt')
  })
  .then(function (data) {
    console.log('通过Promise获取到第二个文件内容:', data);

    return readTxt('./data/3.txt')
  })
  .then(function (data) {
    console.log('通过Promise获取到第三个文件内容:', data);
  })

