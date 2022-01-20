### docs

> 一个vue3的生成组件模板和打包，自动注册指定目录的组件，基于vite的脚手架

#### 安装
```ts
yarn add kfs-cli
```
#### 生成组件
> package.json里`scripts`配置里添加命令:

```ts
"kfs-cli:g": "kfs-cli start -g components"
```

> `node`运行命令:

```ts
yarn kfs-cli:g
// 将在`src`目录下的`components`文件夹里创建组件模板
```

> 后续根据命令行提示输入组件名字和是否`setup`模板填写完成生成
> 需要创建多个组件，则在name输入框以空格分隔

#### 自动注册
> package.json里`scripts`配置里添加命令:

```ts
"kfs-cli:r": "kfs-cli start -r components"
```

> `node`运行命令:

```ts
yarn kfs-cli:r
// components目录下的组件将自动注册成全局组件
```

#### 打包
> package.json里`scripts`配置里添加命令:

```ts
"kfs-cli:b": "kfs-cli start -b components"
```

> `node`运行命令:

```ts
yarn kfs-cli:b
// components里组件打包到lib文件夹
```
