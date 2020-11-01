/*
  # 凝聚 + 统计
    + db.集合.aggregate([
        {管道: {表达式}}
       ])
    + 常用管道
       - $group 将集合中的文档分组, 用于统计结果
       - $match 过滤数据, 只要输出符合条件的文档
       - $sort 聚合数据进一步排序
       - $skip 跳过指定文档数
       - $limit 限制集合数据返回文档数
       .....
    + 常用表达式
       - $sum 总和  $sum: 1同count表示统计
       - $avg 平均
       - $min 最小值
       - $max 最大值

   + 统计男女总年龄
       ```javascript
         db.xx.aggregate([
            {
               $group: {
                  _id: '$sex',
                  rs: {$sum: '$age'}
               }
            }
         ])
       ```

    +  统计男生, 女生总人数
         ```javascript
            db.xx.aggregate([
               {
                  $group: {
                     _id:  '$sex',
                     rs: {$sum: 1}
                  }
               }
            ])
         ```

   + 求学生总数和平均年龄
      ```javascript
            db.xx.aggregate([
               {
                  $group: {
                     _id:  null,
                     total_num: {$sum: 1},
                     total_avg: {$avg: '$age'}
                  }
               }
            ])
      ```

   + 查询男生, 女生人数, 按人数升序
      ```javascript
            db.xx.aggregate([
               {
                  $group: {
                     _id:  '$sex',
                     total_num: {$sum: 1},
                  }
               },
               {
                  $sort: {rs: 1}
               }
            ])
      ```
*/
