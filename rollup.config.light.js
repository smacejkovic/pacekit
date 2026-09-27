import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const bannerLines = [
  'This file contains the Pacekit library (MIT), compiled to ES2017, and without Clustering support.',
  'https://github.com/smacejkovic/pacekit',
].map(x => `  * ${x}`).join('\n');
const banner = `/**\n${bannerLines}\n  */`;

const missing = `export default () => console.log('You must import the full version of Pacekit in order to use this feature.');`;
const exclude = [
  'RedisDatastore.js',
  'RedisConnection.js',
  'IORedisConnection.js',
  'Scripts.js'
];

export default {
  input: 'lib/index.js',
  output: {
    name: 'Pacekit',
    file: 'light.js',
    sourcemap: false,
    globals: {},
    format: 'umd',
    banner
  },
  external: [],
  plugins: [
    json(),
    {
      load: id => {
        const chunks = id.split('/');
        const file = chunks[chunks.length - 1];
        if (exclude.indexOf(file) >= 0) {
          return missing
        }
      }
    },
    resolve(),
    commonjs()
  ]
};
