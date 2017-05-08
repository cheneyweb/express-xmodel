# express-xmodel
极简风格的RESTful无后端Node框架，基于express-xmodel中间件，只需要写实体类，然后直接RESTful请求，全自动CRUD

整体框架使用说明
>
	1, config/default.js 中设置数据库连接，然后执行npm install

	2, node app.js

注意事项
>
	1, 启动 app.js 后，系统会自动加载 {project}/src/model/ 下所有的JS文件，并且与数据库同步，创建数据库表或更新字段

	2, 切换到生产环境需要执行命令 export NODE_ENV=production

单独使用express-xmodel中间件(任意express应用均可集成)
>
	1, npm install express-xmodel --save

	2, let xmodel = require('express-xmodel')

	3, app.use('/xmodel/', xmodel)

	可选设置model文件夹路径，默认路径是 {project}/src/model/
	
	xmodel.modelDir = __dirname + '/src/model/'
	
命名规则
>
	Model文件名需要以【首字母大写】的【驼峰法】命名，例如应该是UserInfo.js，而不是userInfo.hs或user_info.js
	RESTful请求url，model名称【下划线分割】

框架目录结构（后台）
>
	├── README.md
	├── app.js (应用服务入口)
	├── config (应用系统配置)
	│   ├── default.json
	│   └── production.json
	├── node_modules
	├── package.json
	├── src
	│   └── model (开发时只需要编写这个目录下的文件，一个Model就是一个文件)
	└── xmodel_modules
	    └── express-xmodel (无后端Router中间件express-xmodel的源代码)

RESTful规则
>
	[POST]http://host:port/xmodel/MODEL/create
	[POST]http://host:port/xmodel/MODEL/update
	[POST]http://host:port/xmodel/MODEL/query
	[GET]http://host:port/xmodel/MODEL/get/:id
	[GET]http://host:port/xmodel/MODEL/destroy/:id

例子
>
	以一个用户模块为例，需要对用户进行增删改查:
	需要注意的是默认自动创建id,createdAt,updatedAt三个字段，无须人工处理
	[POST]http://host:port/xmodel/user_model/create
		post body:{"username":"cheney","password":"123"}
	[POST]http://host:port/xmodel/user_model/update
		post body:{id:1,"username":"cheney","password":"456"}
	[POST]http://host:port/xmodel/user_model/query
		post body:{"username":"cheney","password":"123"}
	[GET]http://host:port/xmodel/user_model/get/1
	[GET]http://host:port/xmodel/user_model/destroy/1

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
	2017.03.25:整理代码与文档
	2017.04.01:准备支持ES2015，代码优化
	2017.04.02:以express中间件的形式提供服务，更加高内聚低耦合
	2017.04.08:以中间件的形式重命名
	2017.05.08:将passport认证中间件转移到x-express项目中
