import express from 'express';
import path from 'path';
import fs from 'fs';
const router = express.Router();
import { fileURLToPath } from 'url';
import apiRouter from "./api.js";


// 使用/api路径的请求交给apiRouter处理
router.use('/api', apiRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取view目录下的所有ejs文件
const viewDir = path.join(__dirname, '../views');
const files = [];

function readEjsFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readEjsFiles(filePath);
    } else if (path.extname(file) === '.ejs') {
      files.push(filePath);
    }
  });
}

readEjsFiles(viewDir);

// 定义路由配置数组
const pageRoutes = files.map((file) => ({
  path: `/${path.relative(viewDir, file).replace(/\\/g, '/').replace('.ejs', '')}`,
  template: path.relative(viewDir, file).replace(/\\/g, '/').replace('.ejs', ''),
}));

pageRoutes.push({
  path: '/',
  template: 'index',
});
console.log(pageRoutes);

// 使用forEach循环注册路由
pageRoutes.forEach((route) => {
  router.get(route.path, (req, res) => {
    res.render(route.template);
  });
});



// 提供静态文件服务，路径为public/apiDoc
router.use('/apiDoc', express.static(path.join(__dirname, 'public/apiDoc')));

export default router;
