// 读文件
const fs = require('fs')

// 需求: 读完第一个文件, 再读取第二个文件

// 因为 readFile 是异步操作, 所以, 两个readFile无法保证执行顺序

function readTxt(path, callback) {
  // path 表示要读取文件的路径
  // callback 表示回调函数, 参数是: 文件数据
  fs.readFile(path, function (err, data) {
    data = data.toString()
    callback(data)
  })
}

readTxt('./data/1.txt', function (data) {
  console.log('第一个文件的内容:', data);

  readTxt('./data/2.txt', function (data) {
    console.log('第二个文件的内容:', data);

    readTxt('./data/3.txt', function (data) {
      console.log('第三个文件的内容:', data);
    })

    // readTxt('./data/4.txt', function (data) {
    //   console.log('第四个文件的内容:', data);
    // })
  })
})