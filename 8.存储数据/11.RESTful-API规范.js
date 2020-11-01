/*
  # 理解RESTful架构: http://www.ruanyifeng.com/blog/2011/09/restful.html
    + 例: 
        - 列表页: 访问 -/模块名                  (get)
        - 详情页:  --   -/模块名/编号           (get)
        - 添加页:  --   -/模块名/create        (get)
        - 处理:     --   -/模块名                  (post)
        - 修改页:  --   -/模块名/编号/edit     (get)
        - 处理:     --   -/模块名/编号           (put)
        - 删除:     --   -/模块名/编号           (delete)
    + 新建一条用post, 更新用put
    + 统一开放规范便于团队协作开发
*/