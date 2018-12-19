import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import resolve from 'rollup-plugin-node-resolve';
import {
    uglify
} from "rollup-plugin-uglify";

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'VueBootstrap4Table',
        exports: 'named',
    },
    external: ['lodash'],
    plugins: [
        // uglify(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
        resolve()
    ],
};
