import resolve from 'rollup-plugin-node-resolve'

import { module } from './package.json'

export default [
  {
    input: 'dist/index.js',
    output: {
      file: module,
      format: 'es',
    },
    plugins: [resolve()],
  },
]
