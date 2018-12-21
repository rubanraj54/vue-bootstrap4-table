import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import {
    terser
} from "rollup-plugin-terser";


export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'VueBootstrap4Table',
        exports: 'named',
    },
    external: ['vue'],
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
        resolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        terser()
    ],
};
