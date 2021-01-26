// import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: [{
		format: 'iife',
		name: pkg.main,
		file: 'dist/bundle.js'
	}, {
		format: 'es',
		file: pkg.module,
	}, {
		format: 'cjs',
		file: pkg.main
	}],
	external: [
		...Object.keys(pkg.dependencies || {})
	],
	plugins: [
		typescript(),
		terser()
	],
};
