/**
 * @file app.js
 * @description 骑迹驿站服务端主入口文件
 * 负责服务器配置、中间件设置、路由注册等核心功能
 */

// 第三方依赖导入
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// 自定义模块导入
import connectDB from './config/database.js';
import { requestLogger, errorHandler } from './middleware/auth.js';
import router from './routes/index.js';
import getEevIp from './utils/GetEevIp.js';

// 连接数据库并获取客户端实例
//const D1Client = await connectDB();

// 将数据库客户端设置为全局变量，方便其他模块使用
//globalThis.D1Client = D1Client;

// 创建Express应用实例
const app = express();
// 从环境变量获取服务器端口
const port = process.env.PORT;

// 配置EJS模板引擎
app.set('view engine', 'ejs');
app.set('views', './src/views');

// 配置全局中间件
app.use(express.json()); // 解析JSON格式的请求体
app.use(express.static('./src/public')); // 配置静态文件服务
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*', // 允许的跨域来源
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
  })
);

app.use(requestLogger); // 请求日志记录中间件

app.use(router);

// 处理404错误 - 放在所有路由之后，错误处理之前
app.use((req, res) => {
  res.status(404).render('404');
});

// 全局错误处理中间件
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://${getEevIp()}:${port}`);
  console.log(`管理系统 http://${getEevIp()}:${port}/admin `);
  console.log(`文档地址：http://${getEevIp()}:${port}/apiDoc`);
});
