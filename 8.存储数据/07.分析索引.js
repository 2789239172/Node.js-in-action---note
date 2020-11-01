/* 
  分析索引(explain)
    + 语法: db.集合.find().explain('executionStats')
    + 扫描方式
        - COLLSCAN 全表扫描
        - IXSCAN 索引扫描
        - FETCH 根据索引区检索指定document

  选择规则 (如何选择合适的列创建索引)
    + 为常用于: 条件, 排序, 分组, 联合操作的字段建立索引
    + 选择唯一性索引    
    + 选择较小的数据列, 为较长的字符串使用前缀索引 (索引文件更小)
*/