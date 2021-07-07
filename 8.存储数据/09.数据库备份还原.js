/* 
  + 导出数据语法: mongodump -h -port -u -p -d -o
      -h: host 服务器IP地址 (一般不写, 默认本机)
      -port: 端口(一般不写 默认27017)
      -u: user 账号
      -p: pwd 密码
      -d: database 数据库 (!!不写默认导出全局)
      -o: open 备份到指定目录下
    - 有时需要指定存储账号的库: 
        + --authenticationDatabase admin

  + 还原数据库: mongorestore -h -port -u -p -d --drop 备份数据目录
      -d 不写则还原全部数据
      --drop  先删除再导入, 不写则覆盖        
*/ 