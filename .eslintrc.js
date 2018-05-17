// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		jquery: true,
		mocha: true
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// for kite
		'indent': ['warn', 'tab'], // http://eslint.org/docs/rules/indent
		'no-tabs': 'off', // http://eslint.org/docs/rules/no-tabs
		'no-var': 'error', // http://eslint.org/docs/rules/no-var
		'no-warning-comments': 'warn', // http://eslint.org/docs/rules/no-warning-comments
		'semi': ['error', 'always'], // http://eslint.org/docs/rules/semi
		'space-before-function-paren': 'off', // http://eslint.org/docs/rules/space-before-function-paren
		'yoda': 'off' // http://eslint.org/docs/rules/yoda
	}
}
