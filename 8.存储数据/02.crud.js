/* 
  # 增(Creat)
    + db.集合.insert(JSON)
    + 集合存在 - 直接插入数据, 集合不存在 - 隐式创建
    + mongo会给每条数据增加一个唯一的id
       - 0 1 2 3 | 4 5 6 | 7 8 | 9 10 11
          时间戳    机器码    pid   (自增)计数器
                          ↓        → (进程的标识符)  
                (主机的唯一标识符)

       - 可以指定 _id 来覆盖自动生成的 id 但不推荐 
    + 插入多条数据
       - db.集合.insert(ArrayJSON)
       - mongodb底层使用js引擎实现, 支持部分js语法
          + 使用for循环 

  # 查(Read)
    + db.集合名.find(条件[,查询的列])
        - 条件 
            + 查询所有数据:                 {} / null
            + 查询age=6的:                {age: 6}
            + age=6&&sex=男:          {age: 6, sex: 男}
        - 列 
            + null:                             查询全部列
            + {age: 1}                       只显示age列
            + {age: 0}                       除了age列
            + _id 一直会在
        - 条件判断
            + db.集合.find({key: {运算符: 值}})

  # 改(Update)
   + db.集合.update(条件, 新数据[,是否新增, 是否修改多条])
      - 是否新增: 指条件匹配不到的数据则插入 [true / false(default)]
      - 是否修改多条: 匹配成功的数据都修改 [true / false(default)]
      - !! 默认不是 <修改> 而是 <替换>
   + 使用修改器
      - db.集合.update(条件, {
                                          修改器: {键: 值, 键: 值....}
                                       })
      - 修改器: 
        + $inc: 递增
        + $rename: 重命名列
        + $set: 修改列值
        + $unset: 删除列
        
  # 删(Delete)
    + db.集合.remove(条件, [,是否删除一条])
      - 参数二: 默认false

*/