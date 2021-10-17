import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

const config = {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  treeshake: true,
  plugins: [
    del({ targets: ['dist/*'] }),
    external(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.jsx']
    }),
    commonjs(),
    visualizer()
  ],
  external: Object.keys(pkg.peerDependencies || {})
};

export default config;
