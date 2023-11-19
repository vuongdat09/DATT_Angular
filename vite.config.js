
import { VitePluginNode } from 'vite-plugin-node';

const config = () => {
    return {
        server: {
            port: 8080,
        },
        plugins: [
            ...VitePluginNode({
                adapter: 'express',
                appPath: './src/app.js',
                exportName: 'viteNodeApp',
                tsCompiler: 'esbuild',
                swcOptions: {},
            }),
        ],
        optimizeDeps: {},
    };
  }

export default config;