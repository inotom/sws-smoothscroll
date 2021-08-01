/** @prettier */

import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import html2 from 'rollup-plugin-html2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

// Remove npm package scope.
const unscopedName = pkg.name.replace(/^@.*\//, '');
const moduleName = 'SwsSmoothScroll';

// ライブラリに埋め込むcopyright
const banner = `/*! ${unscopedName}.js v${pkg.version} ${pkg.author} | ${pkg.license} License */`;

const plugins = [resolve(), typescript(), commonjs({ extensions: ['.ts', '.js'] })];
let pluginsBrowser = [...plugins, buble(), html2({ template: 'src/html/index.html' })];

if (process.env.NODE_ENV === 'development') {
  pluginsBrowser = [
    ...pluginsBrowser,
    serve({
      contentBase: './dist',
      port: 3000,
    }),
    livereload({
      watch: './dist',
    }),
  ];
}

export default [
  // Options for browser.
  {
    input: 'src/index.ts',
    output: [
      {
        name: moduleName,
        file: pkg.unpkg,
        format: 'iife',
        sourcemap: true,
        banner,
      },
      // minify
      {
        name: moduleName,
        file: pkg.unpkg.replace('.js', '.min.js'),
        format: 'iife',
        banner,
        plugins: [terser()],
      },
    ],
    // Exclude development modules.
    external: [...Object.keys(pkg.devDependencies || {})],
    plugins: pluginsBrowser,
  },
];
