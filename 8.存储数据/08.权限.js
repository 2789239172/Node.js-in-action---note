/*
  ## 创建账号
    + db.createUser({
      'user': '账号',
      'pwd': '密码',
      'roles': [
        {
          role: '角色',
          db: '所属数据库
        }
      ]
    })
    + 角色种类
      - 超级用户角色: root
      - 数据库用户角色: read, readWrite
      - 数据库管理角色: dbAdmin, userAdmin
      - 集群管理角色: clusterAdmin, clusterManager, clusterMonitor, hostManage
      - 备份恢复角色: backup, restore
      - 所有数据库角色: readAnyDatabase, readWriteAnyDatabase, userAdminAnyDatabase, dbAdminAnyDatabase

  ## 开启验证模式
    + 指用户需要输入账号密码才能登录使用
      1. 添加超级管理员
      2. 退出卸载服务
      3. 重新安装需要输入账号密码的服务 (在原来的安装命令上加入 --auth)
      4. 启动服务 -> 登录测试

  ### 1. 添加超级管理员
      ```
            use admin

            db.createUser({
              'user': '账号',
              'pwd': '密码',
              'roles': [
                {
                  role: '角色',
                  db: '所属数据库
                }
              ]
            })
      ```

  ### 2. 退出卸载服务
      ```
          管理员运行
          bin\mongod --remove
      ```

  ### 3. 重新安装需要输入账号密码的服务
      ```
          管理员运行
          bin\mongod --install --dbpath E:\mongodb\data --logpath E:\mongodb\logs\mongodb2.log --auth
      ```

  ### 4. 启动服务
      ```
            net start mongodb
            mongo

            1. mongo 服务器IP:端口(默认27017)/数据库 -u 用户名 -p 密码
             /
            2.  先登录, 选择数据库admin, 输入db.auth(用户名, 密码)
      ```

  ## 练习
      + 添加用户shop1 可以读shop数据库
      + 添加用户shop2 可以读写shop数据库
      + !!: 必须在对应数据库创建用户
      ```
            use shop 

            db.createUser({
              'user': '账号',
              'pwd': '密码',
              'roles': [
                {
                  role: 'read',
                  db: 'shop'
                }
              ]
            })

            db.createUser({
              'user': '账号',
              'pwd': '密码',
              'roles': [
                {
                  role: 'readWrite',
                  db: 'shop'
                }
              ]
            })

      ```
*/