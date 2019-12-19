var userName = 'lval';
// 生成时间戳
var timeStamp = Date.parse(new Date());

var jsonDatabase = {"loginName":userName,"loginTime":timeStamp}

// 连接数据库，connect方法链接，传入数据库名（这里不能用let，会报错）如果没有这个数据库，会新建这个数据库
var db = connect('log')
// 向log数据库插入名为login的集合(如果数据库有这个集合，会在这个集合内插入数据，如果没有会新建这个集合并插入数据)
db.login.insert(jsonDatabase)

// 打印一个提示信息
print('log print success')

// 在终端执行 mongo goTask.js



//mongoDB基本命令
// show dbs:  查看当前服务下有哪些数据库

// use + 数据库名:选择要使用的数据库，如use log 使用log数据库

// show collections:查看当前数据库下有哪些集合

// db.集合名.find():查看当前集合下的数据

// db.集合名.drop():删除集合