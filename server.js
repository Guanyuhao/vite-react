import Koa from 'koa'
import { resolve } from 'path'
import sendfile from 'koa-sendfile'
import koaStatic from 'koa-static'
import path from 'path';
import { fileURLToPath } from 'url';

import apiRouter from './server/api-router.js'
import koaAssets from './server/assets-router.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa()

// static
app.use(koaStatic(resolve(__dirname, 'public')))

// api
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

// assets
app.use(koaAssets.routes()).use(koaAssets.allowedMethods())

// 404
app.use(async (ctx, next) => {
  await next()

  if (ctx.status === 404) {
    await sendfile(ctx, resolve(__dirname, 'index.html'))
  }
})

// if (import.meta.env.PROD) {
  app.listen(3001);
  console.log('running on http://localhost:3000');
// }

// export const viteNodeApp = app;