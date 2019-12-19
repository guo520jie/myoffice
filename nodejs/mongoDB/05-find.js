// 不等修饰符
// $lt;小于,全称less-than
// $lte;小于等于，全称less-than-equal
// $gt;大于，全称greater-than
// $gte;大于等于，全称greater-than-equal
// $ne;不等于，全称not-equal


// 查找workmate集合内skill对象内skillone为js的数据
// db.workmate.find({'skill.skillone':'js'})

// 查找workmate集合内skill对象内skillone为js的数据,只显示这条数据的name字段和skill对象内skillone字段(默认显示id)
// name:true控制是否显示这个字段。不显示为false
// db.workmate.find({'skill.skillOne':'js'},{name:true,"skill.skillOne":true})


// 查找集合内age小于等于30大于等于18的数据
// 只显示name和skill对象内的skillOne数据，不显示id
// db.workmate.find({age:{$lte:30,$gte:18}},{name:true,'skill.skillOne':true,_id:false})


// 查找插入时间大于2019-01-01的数据
// var startDate = new Date('01/01/2019')
// db.workmate.find(
//     {regrditTime:{$gt:startDate}}, //查找条件
//     {name:true,'skill.skillOne':true,_id:false} //显示的字段
// )

// $in修饰符可以轻松解决一键多值的查询情况（满足in数组内条件）
// $in 一个key多个value
// 查找age是22,28,16的数据,显示name，age，skill对象内的skillOne字段
// db.workmate.find(
//     {age:{$in:[22,18,16]}},
//     {name:true,age:true,'skill.skillOne':true,_id:false}
// )


// $nin不满足数组内的条件
// 查找age不是22,28,16的数据,显示name，age，skill对象内的skillOne字段
// db.workmate.find(
//     {age:{$nin:[22,18,16]}},
//     {name:true,age:true,'skill.skillOne':true,_id:false}
// )



// $or 查询满足or数组内条件或其中条件之一的数据 （类似于js的||符）
// $and 查询满足and数组内所有条件的数据（类似于js的&&符,用法和$or相同）
// 查询集合内age大于18或者skill对象内skillOne为js的数据
db.workmate.find(
    {$or:[
        {age:{$gt:18}},
        {'skill.skillOne':'js'}
    ]},
    {name:true,age:true,'skill.skillOne':true,_id:false}
)


// $not 查询除了查询条件之外的值（比较少用）
// 查询除了age大于20，且小于25的数据（也就是说大于20小于25的数据不会被查询）
db.workmate.find(
    {
        age:{$not:{
            $gt:20,
            $lt:25,
        }}
    },
    {name:true,age:true,'skill.skillOne':true,_id:false}
)


// 数组查询

// $all 满足$all数组内所有条件的数据
// 查找workman集合中interest数组包含画画，聚会的数据
db.workmate.find(
    {interest:{$all:['画画','聚会']}},
    {name:true,age:true,interest:true,_id:false}
)

// $size 数组的长度
// 查找interest数组长度为5的数据
db.workmate.find(
    {interest:{$size:5}},
    {name:true,age:true,interest:true,_id:false}
)

// $slice 显示选项
// $slice正值从第一项开始，负值从最后一项开始
// $slice:[1,3],数组的形式，显示从第一项到第三项
// 查询interest长度为3的数据，且只显示interest的前两项
db.workmate.find(
    {interest:{$size:3}},
    {name:true,age:true,interest:{$slice:2},_id:false}
)


// find(query,fields,limit,skip,batchSize,options)参数

// query：这个就是查询条件，MongoDB默认的第一个参数。
// fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
// limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
// skip:跳过多少个显示，和limit结合可以实现分页。
// sort：排序方式，从小到大排序使用1，从大到小排序使用-1。

