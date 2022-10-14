import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/cn-workday.js',
        format: 'umd',
        name: 'CnWorkday',
        globals: {
            dayjs: 'dayjs'
        }
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelrc: true,
            babelHelpers: 'bundled',
            // exclude: ['node_modules/**'],
            // presets: ['@babel/preset-env']
        }),
    ]
}
