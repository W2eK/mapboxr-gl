import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

const config = [
  {
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
      // del({ targets: ['dist/*'] }),
      external(),
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
  },
  {
    input: './src/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()]
  }
];

export default config;
