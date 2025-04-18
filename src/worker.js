import { createExecutionContext } from '@cloudflare/workers-types';
import app from './app.js';

export default {
  async fetch(request, env, ctx) {
    // 设置环境变量
    process.env = {
      ...process.env,
      ...env.vars,
      PORT: env.PORT || 8787,
      CORS_ORIGIN: env.CORS_ORIGIN || '*',
    };

    // 创建请求上下文
    const executionContext = createExecutionContext(request, env, ctx);

    // 将D1数据库实例设置为全局变量
    if (env.DB) {
      globalThis.D1Client = env.DB;
    }

    // 处理请求
    return app.handle(request, executionContext);
  },
};