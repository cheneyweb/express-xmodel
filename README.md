# XModel
极简风格的RESTful无后端框架，只需要写实体类，然后直接RESTful请求，全自动CRUD

使用说明
>
	1,安装node,在sequelize/sequelize.js中设置数据库连接
	2,启动app.js
	3,启动app.js后，系统会自动加载model/下所有的JS文件，并且与数据库同步，创建数据库表或更新字段

命名规则
>
	Model文件名需要以首字母大写的驼峰法命名，例如应该是UserInfo.js，而不是userInfo.hs或user_info.js

框架目录结构（后台）
>
    xmodel
        controller——请求控制器，全自动，无须人工处理
        model——数据模型实体，这是使用框架时唯一需要编写的文件，每增加数据实体，就是增加一个文件
        router——路由器控制器，全自动，无须人工干预
        sequelize——ORM数据库映射器，全自动，无须人工干预
        app.js——系统入口

RESTful规则
>
	[POST]http://host:port/model/create
	[POST]http://host:port/model/update
	[POST]http://host:port/model/query
	[GET]http://host:port/model/get/:id
	[GET]http://host:port/model/destroy/:id

例子
>
	以一个用户模块为例，需要对用户进行增删改查:
	需要注意的是默认自动创建id,createdAt,updatedAt三个字段，无须人工处理
	[POST]http://host:port/user_model/create
		post body:{"code":"testcode","name":"testname"}
	[POST]http://host:port/user_model/update
		post body:{id:1,"code":"testcode2","name":"testname2"}
	[POST]http://host:port/user_model/query
		post body:{"code":"testcode","name":"testname"}
	[GET]http://host:port/user_model/get/1
	[GET]http://host:port/user_model/destroy/1

