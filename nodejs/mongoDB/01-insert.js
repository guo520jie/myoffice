var startTime = (new Date()).getTime()


// 连接数据库，connect方法链接，传入数据库名（这里不能用let，会报错）,如果没有这个数据库，会新建这个数据库
var db = connect('log')


var tempArray = [];

for(let i = 0; i<1000; i++){
    tempArray.push({num:1});
}

// 用时27毫秒
db.test.insert(tempArray)


// 用时876ms
// for(let i = 0; i<1000; i++ ){
//     db.test.insert({num:1})
// }

// 上面的插入操作，
// 循环直接插入的执行时间是876ms，（循环操作，性能低，不建议使用）
// 将要循环的内容push到一个数组中然后插入这个数组的操作是27ms（批量操作，性能较好，建议使用）
// 由此可见循环插入的性能远远低于批量操作,所以多条数据时大都使用批量操作

var endTime = (new Date()).getTime()-startTime;

print('this run is '+endTime+'ms')