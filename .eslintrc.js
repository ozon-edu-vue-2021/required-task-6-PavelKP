module.exports = {
	"root": true,
	"env": {
		"node": true
	},
	"extends": [
		"plugin:vue/essential",
		"eslint:recommended"
	],
	"rules": {
		'no-debugger': 0,
		'no-unused-vars': 0,
		'indent': ["error", "tab"],
	},
	"parserOptions": {
		"parser": "babel-eslint"
	}
}

