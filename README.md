# XModel
极简风格的RESTful无后端Node框架，只需要写实体类，然后直接RESTful请求，全自动CRUD

使用说明
>
	1,config/default.js中设置数据库连接
	2,node app.js(启动)
	3,启动app.js后，系统会自动加载model/下所有的JS文件，并且与数据库同步，创建数据库表或更新字段

命名规则
>
	Model文件名需要以首字母大写的驼峰法命名，例如应该是UserInfo.js，而不是userInfo.hs或user_info.js
	RESTful请求url，model名称【下划线分割】

框架目录结构（后台）
>
    xmodel
        xmodel_modules/controller——请求控制器，全自动，无须人工处理
        xmodel_modules/router——路由器控制器，全自动，无须人工干预
        xmodel_modules/sequelize——ORM数据库映射器，全自动，无须人工干预
        xmodel_modules/auth——passport认证模块
        src/config——系统环境配置模块
        src/model——【数据模型实体，这是使用框架唯一需要编写的文件，每增加数据实体，增加一个文件】
        src/app.js——系统入口

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
		post body:{"username":"cheney","password":"123"}
	[POST]http://host:port/user_model/update
		post body:{id:1,"username":"cheney","password":"456"}
	[POST]http://host:port/user_model/query
		post body:{"username":"cheney","password":"123"}
	[GET]http://host:port/user_model/get/1
	[GET]http://host:port/user_model/destroy/1

框架整合（开源力量）
>
    "body-parser": "^1.17.1",
    "config": "^1.25.1",
    "connect-flash": "^0.1.1",
    "express": "^4.15.2",
    "express-session": "^1.15.1",
    "moment": "^2.17.1",
    "mysql": "^2.13.0",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "sequelize": "^3.30.2",
    "tracer": "^0.8.7"

帮助联系
>
	作者:cheneyxu，chenxingling
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.03.11:无后端理念确认，1.0版本推出
	2017.03.12:增加系统环境配置，增加日志模块，增加权限认证模块
	2017.03.18:chenxingling优化项目结构
