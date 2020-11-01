/* 
菜鸟教程: https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html
# 查看数据库 
   show databases

# 选择数据库
   use 库名   => 在mongoDB中 选择不存在的数据库不会报错, 后期当该数据库有数据时,系统自动创建

# 查看集合
   show collections

# 创建集合
   db.createCollection('集合名')

# 删除集合
    db.集合名.drop()

# 删除数据库 (需要先选择数据库)
    db.dropDatabase()

*/