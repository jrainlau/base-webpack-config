# 使用方法
全局安装`scion`脚手架工具：
```
sudo npm install scion-cli -g
```

安装完成后，添加到`scion`模板目录：
```
sudo scion a

? Set the custom name of the template: weex-starter
? Owner/name of the template: jrainlau/scion-templates
? Branch of the template: weex-starter
┌───────────────┬──────────────────────────┬──────────────┐
│ Template Name │ Owner/Name               │ Branch       │
├───────────────┼──────────────────────────┼──────────────┤
│ weex-starter  │ jrainlau/scion-templates │ weex-starter │
└───────────────┴──────────────────────────┴──────────────┘
✔ New template has been added successfully!
```

初始化项目：
```
scion i

? Template name: weex-starter
? Project name: weex-project
? Where to init the project: ./
New project has been initialized successfully!
```

安装依赖：
> 注意，由于weex某些依赖包的问题，无法使用`yarn`安装，只能使用`npm`
```
cd weex-project && npm install
```

运行项目：
```
npm start
```

浏览器会自动打开，并进入到`http://0.0.0.0:1337`。若需要手机浏览，首先安装`WeexPlayGround`，然后改`host`为**你的IP地址**，最后用`WeexPlayGround`扫描二维码即可进行预览。

# 优化更新
- 基于官方`weex-toolkit`模板
- 修复官方模板`weex-vue-render`路径引用错误的问题
- 使用`webpack2`
- 添加`less`预处理器
- 添加`eslint`校验以及使用`standar`标准规则
- 整合`webpack --watch`与`webpack-dev-server`命令，使用时运行一条`npm start`命令即可启动应用
- 添加`alias`，以后引用路径可以参照下表简化成`~`形式：
  ```
  '~src': resolve('src'),
  '~components': resolve('src/components'),
  '~pages': resolve('src/pages'),
  '~assets': resolve('src/assets'),
  '~store': resolve('src/store'),
  '~static': resolve('src/static')
  ```
