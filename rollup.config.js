// import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		format: 'umd',
		name: 'SvelteStore',
		file: 'dist/svelte-store.js'
	},
	plugins: [
		typescript(),
		terser()
	],
};
