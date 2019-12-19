
// 连接数据库，connect方法链接，传入数据库名（这里不能用let，会报错）,如果没有这个数据库，会新建这个数据库
var db = connect('company')

// update修改器(原子操作)
// 1.$set 修改集合内符合条件的数据的字段，如果没有这个字段会自动加上
// 语法：db.集合名.update({条件},{$set:{字段}})
// 修改workmate集合中name为lval3的数据内的sex和age字段
// db.workmate.update({name:'lavl3'},{'$set':{sex:0,age:20}})
// 修改数据中的 内嵌的对象内的值
// db.workmate.update({name:'lavl3'},{'$set':{'skill.skillOne':'ppt'}})


// 2.$unset 删掉数据中的某一个字段
// 语法：db.集合名.update({条件},{$unset:{字段}})
// 删掉name为lavl3数据内的age字段
// db.workmate.update({name:'lavl3'},{$unset:{age:''}})
// 添加age字段
// db.workmate.update({name:'lavl3'},{$set:{age:25}})



// 3.$inc 操作符合条件的字段的值
// 将name为lavl3的age减去2
// db.workmate.update({name:'lavl3'},{$inc:{age:-2}})


//4.multi选项 控制查到一个满足条件的值后是否向下继续查找
// 给workmate集合内所有的数据都加上一个interest数组，如果multi为false，那么就只会给第一个加
// db.workmate.update({},{$set:{interest:[]}},{multi:true})


// 5.upsert选项，控制如果没有满足条件的数据，是否加入一个满足条件的数据
//查找name为小王的数据，并修改其age为26，如果没有找到这个数据，加入一条这样的数据（upsert为false时没有找到便不会加入）
// db.workmate.update({name:'xiaowang'},{$set:{age:26}},{upsert:true})


// 数组修改器
// 1.$push 向数据内的数组或内嵌对象内添加数据
// 向workmate集合内name为xiaowang的数据内的interest数组内添加一条draw选项
// db.workmate.update({name:'xiaowang'},{$push:{interest:'draw'}})


// 2.$addToSet 查找数组内是否有这个数据，如果没有则添加
// 查找name为小明的数据内的interest数组是否有readbook选项，如果没有则添加，有则不改动
// db.workmate.update({name:'xiaowang'},{$addToSet:{interest:'readbook'}})

// 3.$each 批量追加
// 将下面数组中的内容添加到workmate集合内name为xiaowang的数据中interest数组内
// var newInterests = ['game','dance','code']
// db.workmate.update({name:'xiaowang'},{$addToSet:{interest:{$each:newInterests}}})


// 4.$pop 1从数组末端进行删除 -1 从数组开始位置进行删除
// 从interest数组末端进行删除 一条选项
// db.workmate.update({name:'xiaowang'},{$pop:{interest:1}})



// 数组定位修改
// 将workmate集合内的xiaowang的数据中interest数组的第三项修改为rop
db.workmate.update({name:'xiaowang'},{$set:{'interest.2':'rop'}})



// 非应答式，返回值是我们写死的，不是数据库返回的
// db.runCommand()可以返回应答式操作,如： db.runCommand({getLastError:1})
print('[updata] success')