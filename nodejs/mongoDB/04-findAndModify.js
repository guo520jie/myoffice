// db.runCommand()返回应答式操作
// db.runCommand({ping:1}) 如果返回{ok:1}代表数据库连接成功

// var db = connect('company')
// 第一个false是{upsert:false}的简写，代表没有满足条件的数据时不会自动添加（如果是true，会自动添加）
// 第二个true是{multi:true}的简写，代表所有满足条件的数据都会被修改，（如果是false只会修改第一条）
// db.workmate.update({sex:1},{$set:{meony:1000}},false,true)

// 返回的是json
// var resultMessage = db.runCommand({getLastError:1})

// printjson(resultMessage)


// findAndModify
var myModify={
    findAndModify:'workmate',//要修改的集合名
    query:{name:'lavl'}, //查找条件
    update: {$set:{age:11}}, //修改的内容
    new:true  //返回修改成功后的值。false返回修改前的值
}

// 执行操作并返回结果
var resultMessage = db.runCommand(myModify);

// 打印返回结果(json格式)
printjson(resultMessage)