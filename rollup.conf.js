import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/cn-workday.js',
        format: 'umd',
        name: 'CnWorkday',
    },
    plugins: [
        babel({
            babelrc: true,
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
    ]
}
