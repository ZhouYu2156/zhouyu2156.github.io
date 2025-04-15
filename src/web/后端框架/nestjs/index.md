# Nestjs 快速入门

<Image src="https://nestjs.com/logo-small-gradient.d792062c.svg"/>

::: tip 学习文档

- 推荐 1：[官方文档](https://nestjs.com/)
- 推荐 2：[中文文档](https://nest.nodejs.cn/)

:::

## 创建项目

- 全局安装脚手架

```bash
$ npm i -g @nestjs/cli
```

- 创建项目

```bash
$ nest new project-name
```

- 启动项目

```bash
$ npm run start:dev
```

## 项目结构

## 常用命令

- 生成模块

```bash
$ nest g module users
```

- 生成控制器

```bash
$ nest g controller users --no-spec   # --no-spec 不生成测试文件
```

- 生成服务

```bash
$ nest g service users --no-spec
```

## 核心架构

- 业务模块

> 通过`nest g module user`生成

::: code-group

```ts [user.module.ts]
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

:::

- 路由控制器

> 通过`nest g controller user`生成

::: code-group

```ts [user.controller.ts]
import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 相当于 userService = new UserService()   // [!code ++]
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
}
```

:::

- 业务逻辑服务

> 通过`nest g service user`生成

::: code-group

```ts [user.service.ts]
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  getUsers() {
    return {
      users: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          age: 25,
        },
      ],
      message: 'successfully',
    }
  }
}
```

:::

- 添加`API`全局前缀

::: code-group

```ts [main.ts]
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 添加全局前缀
  app.setGlobalPrefix('api') // [!code ++]
  await app.listen(3000)
}
bootstrap()
```

:::

## _增删改查_ 快速上手例子

::: details
::: code-group

```ts [user.controller.ts]
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { User, UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 相当于 userService = new UserService()
  // params 是路径参数，body 是请求体, query 是查询参数

  /** 增 */
  @Post()
  add(@Body() body: User) {
    return this.userService.add(body)
  }

  /** 删 */
  @Delete(':id')
  del(@Param() params: { id: string }) {
    const id = parseInt(params.id)
    return this.userService.del(id)
  }

  /** 改 */
  @Put()
  update(@Body() body: User) {
    return this.userService.update(body)
  }

  /** 查 */
  @Get()
  getUsers() {
    return this.userService.getUsers()
  }
}
```

```ts [user.service.ts]
import { Injectable } from '@nestjs/common'

export interface User {
  id: number
  name: string
  age: number
  tel: string
}

/** 模拟数据库 */
let users: User[] = [
  {
    id: 1,
    name: 'zs',
    age: 18,
    tel: '13033474321',
  },
]

@Injectable()
export class UserService {
  /** 增 */
  add(user: User) {
    users.push({ ...user, id: users.length + 1 })
    return {
      code: 200,
      message: 'success',
      user,
    }
  }

  /** 删 */
  del(id: number) {
    users = users.filter(user => user.id !== id)
    return {
      code: 204,
      message: '记录删除成功！',
    }
  }

  /** 改 */
  update(user: User) {
    users = users.map(item => (item.id === user.id ? user : item))
    return {
      code: 200,
      message: '记录修改成功！',
      user,
    }
  }

  /** 查 */
  getUsers() {
    return {
      code: 200,
      message: '获取数据列表成功！',
      users,
    }
  }
}
```

```http [user.http]
### 新增
POST http://localhost:3000/api/users/
Content-Type: application/json

{
  "name": "ls",
  "age": 20,
  "tel": "00154896"
}



### 删除
DELETE http://localhost:3000/api/users/1



### 修改
PUT http://localhost:3000/api/users/
Content-Type: application/json

{
  "name": "ls",
  "age": 25,
  "tel": "13047894321",
  "id": 1
}



### 查询
GET http://localhost:3000/api/users/

```

:::

## 数据库交互

> 可以安装一个`VSCode`数据库可视化插件`Database Client`.

- 安装依赖

```bash
$ npm i --save @nestjs/typeorm typeorm mysql2
```

- 配置数据库连接

::: code-group

```ts [app.module.ts]
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // [!code ++]
      type: 'mysql', // [!code ++]
      host: 'localhost', // [!code ++]
      port: 3306, // [!code ++]
      username: 'root', // [!code ++]
      password: '123456', // [!code ++]
      database: 'blog', // [!code ++]
      retryDelay: 1000, // [!code ++]
      retryAttempts: 3, // [!code ++]
      synchronize: true, // [!code ++]
      autoLoadEntities: true, // [!code ++]
    }), // [!code ++]
    UserModule, // 用户模块
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

:::

- 创建`ORM`实体

> 在模块下创建`entities`文件夹，然后创建实体文件，如：`user.entity.ts`

::: code-group

```ts [user.entity.ts]
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'tinyint' })
  age: number

  @Column({ type: 'varchar', length: 11 })
  tel: string

  @CreateDateColumn({ type: 'timestamp' })
  entryTime: Date
}
```

```ts [user.module.ts]
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm' // [!code ++]
import { User } from './entities/user.entity' // [!code ++]

@Module({
  imports: [
    // [!code ++]
    TypeOrmModule.forFeature([User]), // [!code ++]
  ], // [!code ++]
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

:::

::: warning 提示
重新启动项目, `npm run start:dev`会自动根据创建的实体文件生成数据库表
:::

- 编写控制器和服务

::: details
::: code-group

```ts [user.controller.ts(编写控制器)]
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 增 */
  @Post()
  add(@Body() body: User) {
    return this.userService.add(body)
  }

  /** 删 */
  @Delete(':id')
  delete(@Param() params: Pick<User, 'id'>) {
    const { id } = params
    return this.userService.delete(Number(id))
  }

  /** 改 */
  @Put(':id')
  update(@Param() params: Pick<User, 'id'>, @Body() body: User) {
    const { id } = params
    return this.userService.update(Number(id), body)
  }

  /** 查 - 所有 */
  @Get()
  getList() {
    return this.userService.all()
  }

  /** 查 - 单个 */
  @Get(':id')
  find(@Param() params: Pick<User, 'id'>) {
    const { id } = params
    return this.userService.find(Number(id))
  }
}
```

```ts [user.service.ts(编写业务逻辑服务)]
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  /** 增 */
  add(user: User) {
    return this.user.save(user)
  }

  /** 删 */
  delete(id: number) {
    return this.user.delete(id)
  }

  /** 改 */
  update(id: number, user: User) {
    return this.user.update(user.id, user)
  }

  /** 查 - 单个 */
  find(id: number) {
    return this.user.findOneBy({ id })
  }

  /** 查 - 所有 */
  all() {
    return this.user.find()
  }
}
```

:::

## 依赖注入

::: info 基本概念
在 NestJS 中，依赖注入（Dependency Injection，简称 DI）是一种设计模式，它用于管理组件（如类）之间的依赖关系。其核心思想是将组件所依赖的其他组件（或服务）的创建和管理交给外部容器（在 NestJS 中是一个依赖注入容器），而不是由组件自身来创建和管理这些依赖。
:::

::: code-group

```ts [user.module.ts]
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    // 提供业务逻辑服务
    {
      provide: 'user',
      useClass: UserService,
    },
    // 提供自定义值
    {
      provide: 'database-config',
      useValue: {
        host: 'localhost',
        port: 3000,
        username: 'root',
        password: '123456',
        database: 'test',
      },
    },
    // 提供工厂函数
    {
      provide: 'myFactory',
      useFactory: () => {
        console.log('this is myFactory.')
        return ['a', 'b', 'c', 'e', 'f', 'g']
      },
    },
  ],
})
export class UserModule {}
```

```ts [user.controller.ts]
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(
    @Inject('user') private readonly userService: UserService, // [!code ++]
    @Inject('database-config') private readonly config: Record<string, string | number>, // [!code ++]
    @Inject('myFactory') private readonly myFactory: string[], // [!code ++]
  ) {}

  /** 使用自定义值 */
  @Get('config')
  getConfig() {
    return this.config
  }

  /** 使用工厂函数返回值 */
  @Get('factory')
  getFactory() {
    return this.myFactory
  }

  // ...
}
```

:::

## 中间件

### 局部中间件

- 快速生成中间件模块

```bash
$ nest g mi counter --no-spec
```

- 在`*.module.ts`中引入使用`局部中间件`

```ts
// other something...
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间件
    consumer.apply(CounterMiddleware).forRoutes('users') // 针对哪个路由起作用
    // consumer.apply(CounterMiddleware).forRoutes({ path: 'users', method: RequestMethod.GET })	// 也可以让中间件针对某一种请求方法生效
  }
}
```

### 全局中间件

- 在`main.ts`的`app`对象身上注册`全局中间件`

```ts
// 全局中间件的业务逻辑
function globalMiddleware(req: any, res: any, next: () => void) {
  console.log('Already in globalMiddleware...')
  next()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(globalMiddleware) // 使用全局中间件	// ![code++]
  // 可以添加API全局前缀
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
```

## 解决跨域问题

- 按照第三方包

```bash
$ npm install cors
$ npm i @types/cors
```

- `main.ts`注册全局中间件

```ts
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  // ...
}
```

## 模块化

```bash
$ nest g res posts
```
