/* eslint-disable filenames/match-regex */
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import sass from 'rollup-plugin-sass';

export default {
	input: "src/index.js",
	output: {
		name: "zenForms",
		file: "dist/index.js",
		format: "es",
		globals: {
			react: "React",
			reactstrap: "reactstrap",
			formik: "formik"
		}
	},
	plugins: [
		external({
			includeDependencies: true
		}),
		resolve(),
		sass({
			output: true,
			insert: true
		}),
		babel({
			babelHelpers: "runtime",
			exclude: "node_modules/**",
			presets: ["@babel/env", "@babel/preset-react"]
		}),
		commonjs()
	]
};
