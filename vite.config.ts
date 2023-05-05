import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
/*
  *在开发时会将 Babel 替换为 SWC。
  * 在构建时，若使用了插件则会使用 SWC+esbuild，若没有使用插件则仅会用到 esbuild。
  * 对不需要标准 React 扩展的大型项目，冷启动和模块热替换（HMR）将会有显著提升。
*/ 
import react from '@vitejs/plugin-react-swc'
// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy'

// allow you to use vite as node dev server
import { VitePluginNode } from 'vite-plugin-node'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },
  plugins: [
    // ...VitePluginNode({
    //   adapter: 'koa',
    //   appPath: './server.js',
    //   exportName: 'viteNodeApp',
    //   tsCompiler: 'swc',
    //   swcOptions: {},
    // }),
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
